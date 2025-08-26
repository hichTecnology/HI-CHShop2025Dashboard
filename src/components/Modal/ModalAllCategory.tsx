'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import apiUrl from '@/app/api/apiUrl'

import React, { useEffect, useState } from 'react'
import { Model } from '@/app/api/modal'

interface Category {
  id: string
  name: string
  grado : number
  children : Category[]
  models : Model[]
}
interface CategoriaProps{
  sendCategoryToParent: (data: Category) => void;
}


  const ModalAllCategory:React.FC<CategoriaProps> =({sendCategoryToParent})=> {
  const [categories , setCategories] = useState<Category[]>([])
  const route = useRouter()
  useEffect(() =>{
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${apiUrl}/categories`); // Sostituisci con la tua API
        if (!res.ok) {
          throw new Error('Errore nella risposta dell\'API');
        }
        const data: Category[] = await res.json();
        setCategories(data);
        
      } catch (error) {
        console.error(error);
        
      } 
    };
    fetchCategories()
  },[])
  function addCategory (cate : Category){
    sendCategoryToParent(cate)
    route.push('/products/add-variente')


  }
  
  
  return (
    <div  className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
    <div className="p-8  w-96  rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-dark dark:text-white">Category </h3>
        
        <div className=" mt-4">
          <div className=' w-full h-[280px]  border rounded-[10px] border-stroke  dark:border-dark-3 dark:bg-dark-2 pb-4 overflow-auto '>
          {categories.map((category) => (
        <div key={category.id} className="mb-2">
          {category?.grado <= 1?<h2 onClick={()=>addCategory(category)} className="text-xl font-semibold cursor-pointer text-blue-600 ">{category.name}</h2>:null}
          {category.children?.length > 0 && (
            <ul className="">
              {category.children.map((child) => (
                <li key={child.id} onClick={()=>addCategory(child)}>
                  {child.grado == 2?<p className=' text-stone-800 text-lg text-left ml-6'>- {child.name}</p>:
                  <p className=' '>{child.grado}-{child.name}</p>
                  }
                  
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

          </div>
        
          <div className=' pt-4'>
          <Link
            href="/products/add-variente"
            className="px-4 py-2 bg-blue-500 text-dark dark:text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Close
          </Link>

          </div>
          
          

        </div>
      </div>
    </div>
  </div>
  )
}

export default ModalAllCategory
