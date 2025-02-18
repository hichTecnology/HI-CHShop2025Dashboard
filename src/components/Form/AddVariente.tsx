import { zodResolver } from '@hookform/resolvers/zod'
import { CldImage, CldUploadWidget } from 'next-cloudinary'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsCardList } from 'react-icons/bs'
import { z } from 'zod'
import apiUrl from '@/app/api/apiUrl'
import Loader from '../common/Loader'
interface Variente{
  id : string
  name : string,
  image : string,
  price : number,
  stock : number
}
interface AddVarienteProps {
  
  sendVarienteToParent: (data: Variente) => void;
  check : boolean
  
}
const  AddVariente : React.FC<AddVarienteProps> =({sendVarienteToParent,check })=> {
  const route = useRouter()
  const [resource1, setResource1] = useState<string | null>();
  const [checkPage, setcheckPage] = useState<boolean | null>(false);
  const schemaCategory = z.object({
    name : z.string().min(1,{message : ' il name e obblegatorio '}),
    price : z.coerce.number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive()
    .min(1, { message: "Price is required" }),
    stock : z.coerce.number({
      required_error: "Stock is required",
      invalid_type_error: "Stock must be a number",
    }).int()
    .positive()
    .min(1, { message: "Stock is required" }),
  })
  type IssinUp = z.infer<typeof schemaCategory>
    const {handleSubmit ,register,reset,formState:{errors}} = useForm<IssinUp>({
      mode : "onChange",
      resolver : zodResolver(schemaCategory)
  })
  const handleUploadSuccess = (uploadedImages: string) => {
      setResource1(uploadedImages)
  };
  const onSubmit :SubmitHandler<IssinUp> = async (variente) =>{
            setcheckPage(true)
            const categoryItem = {
              name : variente.name,
              image : resource1,
              price : variente.price,
              stock : variente.stock
            }
            try {
              const requestBody = JSON.stringify(categoryItem);
              const response = await fetch(`${apiUrl}/varientes`, {
                method: 'POST',
                
                headers: { 'Content-Type': 'application/json' },
                body:requestBody
              })
              if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.')
              }
              // Handle response if necessary
              const data: Variente = await response.json()
              setcheckPage(false)
              sendVarienteToParent(data)
              reset();
              setResource1(null)
              route.push(`/adds/add-products`)
            } catch (error) {
              setcheckPage(false)
              route.push(`/adds/add-products/?showError=true`)
            } finally {
              setcheckPage(false)
              console.log('tutto ok')
            }
  }
          
  return (
    <div>
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
    <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
      <h3 className="font-medium text-dark dark:text-white">
      Aggiunge Variante
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
          Price
          <span className=" text-red-500 h-3 w-3 p-1">*</span>
        </label>
        <input
          type="number"
          placeholder="Price"
          {...register('price')}
          className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
        />
        {errors.price && <p className=" text-xs text-red-500">{errors.price.message}</p> }
        
      </div>
      <div>
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          stock
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
      <div>
      <CldUploadWidget 
            uploadPreset="oorid-frondend"
              onSuccess={(result : any, { widget }) => {
                setResource1(result.info.url)
              }}
              onQueuesEnd={(result, { widget }) => {
            widget.close();
            }}
          >
            {({ open }) => {
              function handleOnClick() {
                setResource1(undefined);
                open();
              }
            return (
          <div  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-4  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          onClick={handleOnClick}>
            Immagine
          </div>
            );
            }}
          </CldUploadWidget>
          { resource1 && <CldImage 
            width="150"
            height="150"
            src={resource1 }
            alt="Description of my image"
            />}
      </div>
      
      
      <div className=" flex justify-between">
      <button type="submit" className="flex w-1/3 justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
          {checkPage ? <Loader/>:<p>Salva</p>}
      </button>
      
      {check &&<Link href={'/adds/add-variente/?showVariente=true'}>
      <BsCardList className="  w-12 h-12"/>
      </Link>}
      
      </div>
      
    </form>
    </div>
    </div>
  )
}

export default AddVariente
