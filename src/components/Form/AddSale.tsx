import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsCardList } from 'react-icons/bs'
import { z } from 'zod'
import flatpickr from 'flatpickr'
import apiUrl from '@/app/api/apiUrl'
import Loader from '../common/Loader'

interface Sale{
  id : string
  discountPercentage : number
  startDate : Date
  endDate : Date
}

interface DropdownSaleProps {
  sendSizeToParent: (data: Sale) => void;
  check : boolean
  link : string
}

const  AddSale : React.FC<DropdownSaleProps>=({sendSizeToParent,check,link})=> {
  const route = useRouter()
  const [checkPage , setcheckPage] = useState<boolean>(false)
  useEffect(() => {
      // Init flatpickr
      flatpickr(".form-datepicker", {
        mode: "single",
        static: true,
        monthSelectorType: "static",
        dateFormat: "M j, Y",
        prevArrow:
          '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
        nextArrow:
          '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
      });
    }, []);
      const schemaCategory = z.object({
        discountPercentage : z.coerce.number({
              required_error: "Price is required",
              invalid_type_error: "Price must be a number",
            }).int()
            .positive(),
          startDate :z.coerce.date().refine((data) => data > new Date(), {message: 'Start date must be in the future'}),
          endDate : z.coerce.date().refine((data) => data > new Date(), {message: 'End date must be in the future'}),
        })
        
        type IssinUp = z.infer<typeof schemaCategory>
        const {handleSubmit ,register,reset,formState:{errors}} = useForm<IssinUp>({
          mode : "onChange",
          resolver : zodResolver(schemaCategory)
        })
        const onSubmit :SubmitHandler<IssinUp> = async (sale) =>{
            setcheckPage(true)
            
            try {
              const requestBody = JSON.stringify(sale);
              const response = await fetch(`${apiUrl}/sales`, {
                method: 'POST',
                
                headers: { 'Content-Type': 'application/json' },
                body:requestBody
              })
              if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.')
              }
              // Handle response if necessary
              const data = await response.json()
              sendSizeToParent(data)
              reset();
              route.push(`${link}`)
              setcheckPage(false)
        
            } catch (error) {
              // Capture the error message to display to the user
              setcheckPage(false)
              route.push(`${link}/?showError=true`)
            } finally {
              setcheckPage(false)
              route.push(`${link}`)
            }
          }
  return (
    <div>
       <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
    <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
      <h3 className="font-medium text-dark dark:text-white">
      Aggiunge Sconto
      </h3>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5.5 p-6.5">
      <div>
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          sconto
          <span className=" text-red-500 h-3 w-3 p-1">*</span>
        </label>
        <input
          type="number"
          placeholder="Sconto"
          {...register('discountPercentage')}
          className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
        />
        {errors.discountPercentage && <p className=" text-xs text-red-500">{errors.discountPercentage.message}</p> }
        
      </div>
      <div>
      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
        Data Inizio
      </label>
      <div className="relative">
        <input
          className="form-datepicker z w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal  focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
          placeholder="mm/dd/yyyy"
          {...register('startDate')}
          data-class="flatpickr-right"
        />

   <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.166 11.6666C14.6263 11.6666 14.9993 11.2935 14.9993 10.8333C14.9993 10.373 14.6263 9.99992 14.166 9.99992C13.7058 9.99992 13.3327 10.373 13.3327 10.8333C13.3327 11.2935 13.7058 11.6666 14.166 11.6666Z"
              fill="#9CA3AF"
            />
            <path
              d="M14.166 14.9999C14.6263 14.9999 14.9993 14.6268 14.9993 14.1666C14.9993 13.7063 14.6263 13.3333 14.166 13.3333C13.7058 13.3333 13.3327 13.7063 13.3327 14.1666C13.3327 14.6268 13.7058 14.9999 14.166 14.9999Z"
              fill="#9CA3AF"
            />
            <path
              d="M10.8327 10.8333C10.8327 11.2935 10.4596 11.6666 9.99935 11.6666C9.53911 11.6666 9.16602 11.2935 9.16602 10.8333C9.16602 10.373 9.53911 9.99992 9.99935 9.99992C10.4596 9.99992 10.8327 10.373 10.8327 10.8333Z"
              fill="#9CA3AF"
            />
            <path
              d="M10.8327 14.1666C10.8327 14.6268 10.4596 14.9999 9.99935 14.9999C9.53911 14.9999 9.16602 14.6268 9.16602 14.1666C9.16602 13.7063 9.53911 13.3333 9.99935 13.3333C10.4596 13.3333 10.8327 13.7063 10.8327 14.1666Z"
              fill="#9CA3AF"
            />
            <path
              d="M5.83268 11.6666C6.29292 11.6666 6.66602 11.2935 6.66602 10.8333C6.66602 10.373 6.29292 9.99992 5.83268 9.99992C5.37245 9.99992 4.99935 10.373 4.99935 10.8333C4.99935 11.2935 5.37245 11.6666 5.83268 11.6666Z"
              fill="#9CA3AF"
            />
            <path
              d="M5.83268 14.9999C6.29292 14.9999 6.66602 14.6268 6.66602 14.1666C6.66602 13.7063 6.29292 13.3333 5.83268 13.3333C5.37245 13.3333 4.99935 13.7063 4.99935 14.1666C4.99935 14.6268 5.37245 14.9999 5.83268 14.9999Z"
              fill="#9CA3AF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.83268 1.45825C6.17786 1.45825 6.45768 1.73807 6.45768 2.08325V2.71885C7.00935 2.70824 7.61712 2.70825 8.28556 2.70825H11.713C12.3815 2.70825 12.9893 2.70824 13.541 2.71885V2.08325C13.541 1.73807 13.8208 1.45825 14.166 1.45825C14.5112 1.45825 14.791 1.73807 14.791 2.08325V2.77249C15.0076 2.78901 15.2128 2.80977 15.4069 2.83586C16.3839 2.96722 17.1747 3.24398 17.7983 3.86762C18.4219 4.49126 18.6987 5.28205 18.8301 6.25907C18.9577 7.2084 18.9577 8.42142 18.9577 9.95287V11.7136C18.9577 13.245 18.9577 14.4581 18.8301 15.4074C18.6987 16.3845 18.4219 17.1752 17.7983 17.7989C17.1747 18.4225 16.3839 18.6993 15.4069 18.8306C14.4575 18.9583 13.2445 18.9583 11.7131 18.9583H8.28567C6.75422 18.9583 5.54117 18.9583 4.59183 18.8306C3.61481 18.6993 2.82402 18.4225 2.20039 17.7989C1.57675 17.1752 1.29998 16.3845 1.16863 15.4074C1.04099 14.4581 1.041 13.2451 1.04102 11.7136V9.9529C1.041 8.42144 1.04099 7.20841 1.16863 6.25907C1.29998 5.28205 1.57675 4.49126 2.20039 3.86762C2.82402 3.24398 3.61481 2.96722 4.59183 2.83586C4.78594 2.80977 4.99106 2.78901 5.20768 2.77249V2.08325C5.20768 1.73807 5.48751 1.45825 5.83268 1.45825ZM4.75839 4.07472C3.91998 4.18744 3.43694 4.39883 3.08427 4.7515C2.73159 5.10418 2.5202 5.58722 2.40748 6.42563C2.38839 6.56761 2.37243 6.71709 2.35909 6.87492H17.6396C17.6263 6.71709 17.6103 6.56761 17.5912 6.42563C17.4785 5.58722 17.2671 5.10418 16.9144 4.7515C16.5618 4.39883 16.0787 4.18744 15.2403 4.07472C14.3839 3.95958 13.255 3.95825 11.666 3.95825H8.33268C6.74367 3.95825 5.61478 3.95958 4.75839 4.07472ZM2.29102 9.99992C2.29102 9.28824 2.29128 8.66886 2.30192 8.12492H17.6968C17.7074 8.66886 17.7077 9.28824 17.7077 9.99992V11.6666C17.7077 13.2556 17.7064 14.3845 17.5912 15.2409C17.4785 16.0793 17.2671 16.5623 16.9144 16.915C16.5618 17.2677 16.0787 17.4791 15.2403 17.5918C14.3839 17.7069 13.255 17.7083 11.666 17.7083H8.33268C6.74367 17.7083 5.61478 17.7069 4.75839 17.5918C3.91998 17.4791 3.43694 17.2677 3.08427 16.915C2.73159 16.5623 2.5202 16.0793 2.40748 15.2409C2.29234 14.3845 2.29102 13.2556 2.29102 11.6666V9.99992Z"
              fill="#9CA3AF"
            />
          </svg>
        </div>
      </div>
      </div>
      <div>
      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
        Data fini
      </label>
      <div className="relative">
        <input
          className="form-datepicker w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal  focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
          placeholder="mm/dd/yyyy"
          {...register('endDate')}
          data-class="flatpickr-right"
        />

   <div className="pointer-events-none absolute inset-0 left-auto  right-5 flex items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.166 11.6666C14.6263 11.6666 14.9993 11.2935 14.9993 10.8333C14.9993 10.373 14.6263 9.99992 14.166 9.99992C13.7058 9.99992 13.3327 10.373 13.3327 10.8333C13.3327 11.2935 13.7058 11.6666 14.166 11.6666Z"
              fill="#9CA3AF"
            />
            <path
              d="M14.166 14.9999C14.6263 14.9999 14.9993 14.6268 14.9993 14.1666C14.9993 13.7063 14.6263 13.3333 14.166 13.3333C13.7058 13.3333 13.3327 13.7063 13.3327 14.1666C13.3327 14.6268 13.7058 14.9999 14.166 14.9999Z"
              fill="#9CA3AF"
            />
            <path
              d="M10.8327 10.8333C10.8327 11.2935 10.4596 11.6666 9.99935 11.6666C9.53911 11.6666 9.16602 11.2935 9.16602 10.8333C9.16602 10.373 9.53911 9.99992 9.99935 9.99992C10.4596 9.99992 10.8327 10.373 10.8327 10.8333Z"
              fill="#9CA3AF"
            />
            <path
              d="M10.8327 14.1666C10.8327 14.6268 10.4596 14.9999 9.99935 14.9999C9.53911 14.9999 9.16602 14.6268 9.16602 14.1666C9.16602 13.7063 9.53911 13.3333 9.99935 13.3333C10.4596 13.3333 10.8327 13.7063 10.8327 14.1666Z"
              fill="#9CA3AF"
            />
            <path
              d="M5.83268 11.6666C6.29292 11.6666 6.66602 11.2935 6.66602 10.8333C6.66602 10.373 6.29292 9.99992 5.83268 9.99992C5.37245 9.99992 4.99935 10.373 4.99935 10.8333C4.99935 11.2935 5.37245 11.6666 5.83268 11.6666Z"
              fill="#9CA3AF"
            />
            <path
              d="M5.83268 14.9999C6.29292 14.9999 6.66602 14.6268 6.66602 14.1666C6.66602 13.7063 6.29292 13.3333 5.83268 13.3333C5.37245 13.3333 4.99935 13.7063 4.99935 14.1666C4.99935 14.6268 5.37245 14.9999 5.83268 14.9999Z"
              fill="#9CA3AF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.83268 1.45825C6.17786 1.45825 6.45768 1.73807 6.45768 2.08325V2.71885C7.00935 2.70824 7.61712 2.70825 8.28556 2.70825H11.713C12.3815 2.70825 12.9893 2.70824 13.541 2.71885V2.08325C13.541 1.73807 13.8208 1.45825 14.166 1.45825C14.5112 1.45825 14.791 1.73807 14.791 2.08325V2.77249C15.0076 2.78901 15.2128 2.80977 15.4069 2.83586C16.3839 2.96722 17.1747 3.24398 17.7983 3.86762C18.4219 4.49126 18.6987 5.28205 18.8301 6.25907C18.9577 7.2084 18.9577 8.42142 18.9577 9.95287V11.7136C18.9577 13.245 18.9577 14.4581 18.8301 15.4074C18.6987 16.3845 18.4219 17.1752 17.7983 17.7989C17.1747 18.4225 16.3839 18.6993 15.4069 18.8306C14.4575 18.9583 13.2445 18.9583 11.7131 18.9583H8.28567C6.75422 18.9583 5.54117 18.9583 4.59183 18.8306C3.61481 18.6993 2.82402 18.4225 2.20039 17.7989C1.57675 17.1752 1.29998 16.3845 1.16863 15.4074C1.04099 14.4581 1.041 13.2451 1.04102 11.7136V9.9529C1.041 8.42144 1.04099 7.20841 1.16863 6.25907C1.29998 5.28205 1.57675 4.49126 2.20039 3.86762C2.82402 3.24398 3.61481 2.96722 4.59183 2.83586C4.78594 2.80977 4.99106 2.78901 5.20768 2.77249V2.08325C5.20768 1.73807 5.48751 1.45825 5.83268 1.45825ZM4.75839 4.07472C3.91998 4.18744 3.43694 4.39883 3.08427 4.7515C2.73159 5.10418 2.5202 5.58722 2.40748 6.42563C2.38839 6.56761 2.37243 6.71709 2.35909 6.87492H17.6396C17.6263 6.71709 17.6103 6.56761 17.5912 6.42563C17.4785 5.58722 17.2671 5.10418 16.9144 4.7515C16.5618 4.39883 16.0787 4.18744 15.2403 4.07472C14.3839 3.95958 13.255 3.95825 11.666 3.95825H8.33268C6.74367 3.95825 5.61478 3.95958 4.75839 4.07472ZM2.29102 9.99992C2.29102 9.28824 2.29128 8.66886 2.30192 8.12492H17.6968C17.7074 8.66886 17.7077 9.28824 17.7077 9.99992V11.6666C17.7077 13.2556 17.7064 14.3845 17.5912 15.2409C17.4785 16.0793 17.2671 16.5623 16.9144 16.915C16.5618 17.2677 16.0787 17.4791 15.2403 17.5918C14.3839 17.7069 13.255 17.7083 11.666 17.7083H8.33268C6.74367 17.7083 5.61478 17.7069 4.75839 17.5918C3.91998 17.4791 3.43694 17.2677 3.08427 16.915C2.73159 16.5623 2.5202 16.0793 2.40748 15.2409C2.29234 14.3845 2.29102 13.2556 2.29102 11.6666V9.99992Z"
              fill="#9CA3AF"
            />
          </svg>
        </div>
      </div>
      </div>
      
      <div className=" flex justify-between">
      {checkPage ?<Loader/>:<button type="submit" className="flex w-1/3 justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
        Invia
      </button>}
     {  <Link  href={`/?showColor=true`}>
      <BsCardList className="  w-12 h-12"/>
      </Link>
      }
      
      </div>
      
    </form>
    </div>
    </div>
  )
}

export default AddSale
