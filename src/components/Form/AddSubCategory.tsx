import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsCardList } from 'react-icons/bs'
import { z } from 'zod'
import apiUrl from '@/app/api/apiUrl'
import Category from '@/app/api/modal'

interface AddCategory{
  categoria? : Category
}

  const AddSubCategory:React.FC<AddCategory> = ({categoria})=> {
  const route = useRouter()
  const [categoryFromChild, setCategoryFromChild] = useState<Category>();
  const schemaCategory = z.object({
      name : z.string().min(1,{message : ' il nome e obblegatorio '}),
      
    })
    
    type IssinUp = z.infer<typeof schemaCategory>
    const {handleSubmit ,register,reset,formState:{errors}} = useForm<IssinUp>({
      mode : "onChange",
      resolver : zodResolver(schemaCategory)
    })
    
    const onSubmit :SubmitHandler<IssinUp> = async (category) =>{
        console.log(category)
        const categoryItem = {
          name : category.name,
          grado :  (categoria?.grado ?? 0) + 1,
          parentId : categoria?.id

        }
        try {
          const requestBody = JSON.stringify(categoryItem);
          const response = await fetch(`${apiUrl}/categories`, {
            method: 'POST',
            
            headers: { 'Content-Type': 'application/json' },
            body:requestBody
          })
     
          if (!response.ok) {
            throw new Error('Failed to submit the data. Please try again.')
          }
     
          // Handle response if necessary
          const data = await response.json()
          reset();
          route.push(`/products/add-variente/?show=true`)
    
        } catch (error) {
          // Capture the error message to display to the user
          
          console.error(error)
        } finally {
          console.log('tutto ok')
        }
      }
  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
              Aggiunge SottoCategoria
              </h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5.5 p-6.5">
              {categoria &&<p>{categoria.name}</p>}
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
              
              
              <div className=" flex justify-between">
              <button type="submit" className="flex w-1/3 justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
                  Invia
              </button>
              <Link href={'/products/add-variente/?showCategory=true'}>
              <BsCardList className="  w-12 h-12"/>
              </Link>
              </div>
            </form>
      </div>
  )
}

export default AddSubCategory
