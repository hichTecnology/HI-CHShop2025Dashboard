import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import apiUrl from '@/app/api/apiUrl'

interface Color {
  id: string
  name: string
  cod : string
}

function ModalAllColor() {
  const [colors , setColors] = useState<Color[]>([])

    useEffect(() =>{
      const fetchCategories = async () => {
        try {
          const res = await fetch(`${apiUrl}/colors`); // Sostituisci con la tua API
          if (!res.ok) {
            throw new Error('Errore nella risposta dell\'API');
          }
          const data: Color[] = await res.json();
          setColors(data);
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
        <h3 className="text-2xl font-bold text-dark dark:text-white">Color </h3>
        
        <div className=" mt-4">
          <div className=' w-full h-[280px]  border rounded-[10px] border-stroke  dark:border-dark-3 dark:bg-dark-2 pb-4 overflow-auto '>
          {colors.map((item)=>(
            <div  key={item.id} className=' flex'>
              <p  className='  h-6 m-4 text-white list-disc text-left list-outside '>{item.name}</p>
              <div style={{background: item.cod}}  className={` h-8 w-8  m-4 border rounded-md`}></div>
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

export default ModalAllColor
