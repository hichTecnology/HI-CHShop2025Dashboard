import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsCardList } from 'react-icons/bs'
import { z } from 'zod'
import apiUrl from '@/app/api/apiUrl'
import { Color } from '@/app/api/modal'
import { VscClose } from 'react-icons/vsc'

interface updateColorsProps {
  id : string;
  link : string
  sendColorToParent: (data: boolean) => void;
  
}

const UpdateColor  :React.FC<updateColorsProps> = ({ id,link,sendColorToParent}) => {
  const route = useRouter()
  const [color,setColor] = useState<Color>()
  type IssinUp = z.infer<typeof schemaCategory>
      
  
    const schemaCategory = z.object({
        name : z.string().min(1,{message : ' il nome e obblegatorio '}),
        cod : z.string().min(1,{message : ' il cod e obblegatorio '}),
        price : z.coerce.number({
              required_error: "Price is required",
              invalid_type_error: "Price must be a number",
            })
            
            .min(0, { message: "Price is required" }),
        stock : z.coerce.number({
          required_error: "Stock is required",
          invalid_type_error: "Stock must be a number",
        }).int()
      })
      const {handleSubmit ,register,reset,formState:{errors}} = useForm<IssinUp>({
        mode : "onChange",
        resolver : zodResolver(schemaCategory),
        
      })
      
      useEffect(() =>{
        const fetchProducts = async () => {
          
          
          try {
            const res = await fetch(`${apiUrl}/colors/${id}`); // Sostituisci con la tua API
            if (!res.ok) {
              throw new Error('Errore nella risposta dell\'API');
            }
            const data: Color = await res.json();
            console.log(data)
            setColor(data)
            reset(data)
          } catch (error) {
            console.log(error)
          } 
        };
        fetchProducts()
      },[id,reset])
      
      
      
      const onSubmit :SubmitHandler<IssinUp> = async (category) =>{
          
          
          try {
            const requestBody = JSON.stringify(category);
            const response = await fetch(`${apiUrl}/colors/${id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body:requestBody
            })
       
            if (!response.ok) {
              throw new Error('Failed to submit the data. Please try again.')
            }
            else{
              const data = await response.json()
            
            sendColorToParent(false)

            }
       
            // Handle response if necessary
            
            
      
          } catch (error) {
            // Capture the error message to display to the user
            console.log(error)
          
          } finally {
            sendColorToParent(false)
          }
        }
  return (
    <div  className="fixed inset-0 z-999 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <button onClick={()=>sendColorToParent(false)} className=' p-2 m-2 bg-[#4b313d]  rounded-md'>
          <VscClose />
        </button>
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-medium text-dark dark:text-white">
              Update Colore
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Nome
              <span className=" text-red-500 h-3 w-3 p-1">*</span>
              </label>
              <input
              type="text"
              placeholder="Nome"
              {...register('name')}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
              {errors.name && <p className=" text-xs text-red-500">{errors.name.message}</p> }
            </div>
            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Cod
              <span className=" text-red-500 h-3 w-3 p-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Cod"
              {...register('cod')}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            {errors.cod && <p className=" text-xs text-red-500">{errors.cod.message}</p> }
          </div>
          <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Prezzo
              <span className=" text-red-500 h-3 w-3 p-1">*</span>
            </label>
            <input
              type="number"
              step="any"
              placeholder="Prezzo"
              {...register('price')}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            {errors.price && <p className=" text-xs text-red-500">{errors.price.message}</p> }
          </div>
          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Cod
            <span className=" text-red-500 h-3 w-3 p-1">*</span>
            </label>
            <input
              type="number"
              placeholder="Stock"
              {...register('stock')}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            {errors.stock && <p className=" text-xs text-red-500">{errors.stock.message}</p> }
          </div>
          <div className=" flex justify-between">
            <button type="submit" className="flex w-1/3 justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
            Invia
            </button>
            <Link  href={`/?showColor=true`}>
              <BsCardList className="  w-12 h-12"/>
            </Link>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default UpdateColor

