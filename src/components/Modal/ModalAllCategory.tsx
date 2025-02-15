'use client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import apiUrl from '@/app/api/apiUrl'

import React, { useEffect, useState } from 'react'

interface Category {
  id: string
  name: string
  description : string
}

 function ModalAllCategory() {
  const [categories , setCategories] = useState<Category[]>([])
  useEffect(() =>{
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${apiUrl}/categories`); // Sostituisci con la tua API
        if (!res.ok) {
          throw new Error('Errore nella risposta dell\'API');
        }
        const data: Category[] = await res.json();
        setCategories(data);
        console.log(data)
      } catch (error) {
        console.error(error);
        
      } 
    };
    fetchCategories()
  })
  
  
  
  return (
    <div  className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
    <div className="p-8  w-96  rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-dark dark:text-white">Category </h3>
        
        <div className=" mt-4">
          <div className=' w-full h-[280px]  border rounded-[10px] border-stroke  dark:border-dark-3 dark:bg-dark-2 pb-4 overflow-auto '>
          {categories.map((item)=>(
          <p  key={item.id} className=' w-full h-6 m-4 text-white list-disc text-left list-outside '>{item.name}</p>
        ))}

          </div>
        
          <div className=' pt-4'>
          <Link
            href="/adds/add-variente"
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
