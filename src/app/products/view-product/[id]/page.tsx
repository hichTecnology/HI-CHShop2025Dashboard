"use client"
import apiUrl from '@/app/api/apiUrl'
import { Product } from '@/app/api/modal'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DataTime from '@/components/DataStats/DataTime'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import { useParams, useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'

const page  =  ({ params }: { params: { id: string } })  =>  {
  const [product , setProduct] = useState<Product>()
  const router = useRouter()
  const [id, setId] = useState<string | null>(null);
  
  console.log(params)
  useEffect(() =>{
    const fetchProducts = async () => {
      const { id } =  params;
      setId(id);
      try {
        const res = await fetch(`${apiUrl}/products/${id}`); // Sostituisci con la tua API
        if (!res.ok) {
          throw new Error('Errore nella risposta dell\'API');
        }
        const data: Product = await res.json();
        setProduct(data)
        console.log(data)
      } catch (error) {
        console.error(error);
        
      } 
    };
    
    
    
    fetchProducts()
  },[])

  return (
    <DefaultLayout>
      <Breadcrumb pageName="View products" />
      <div className='bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'>
        <div className="grid gap-4 p-6">
        <div className=' '>
            <img className="h-115 w-full rounded-lg" src={product?.image} alt=""/>
            
        </div>
        <div className="grid grid-cols-5 gap-4">
          {product?.medias.map((value)=>
            <div key={value.id}>
              <img className="h-auto max-w-full rounded-lg" src={value.url} alt=""/>
            </div>
          )}
        </div>
        </div>
        <div className="px-5 pb-5 border-b-1 border-gray-200 pt-4 mt-4 space-y-2">
        <h5 className="text-xl  font-semibold tracking-tight text-gray-900 dark:text-white">{product?.name}</h5>
        
        <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
        </div>
        <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{product?.price}€</span>
            
        </div>
        <span className='flex p-2'><p className='text-xl  font-semibold tracking-tight text-gray-900 dark:text-white'>Stock :</p> <p className='font-normal text-lg px-4 text-gray-700 dark:text-gray-400'>{product?.stock}</p> </span>
        <span className='flex p-2'><p className='text-xl  font-semibold tracking-tight text-gray-900 dark:text-white'>Model :</p> <p className='font-normal text-lg px-4 text-gray-700 dark:text-gray-400'>{product?.model}</p> </span>
        <span className='flex p-2'><p className='text-xl  font-semibold tracking-tight text-gray-900 dark:text-white'>Categoria :</p> <p className='font-normal text-lg px-4 text-gray-700 dark:text-gray-400'>{product?.category.name}</p> </span>
        <span className='flex p-2'><p className='text-xl  font-semibold tracking-tight text-gray-900 dark:text-white'>Tag :</p>{product?.tags.map((value)=><p key={value.id} className='font-normal text-lg px-4 text-gray-700 dark:text-gray-400'>{value.name}</p> )} </span>
        </div>
        <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Descrizione :</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product?.description}</p>
        </div>
        <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Colors :</h5>
          {product?.colors.map((value)=><span key={value.id} className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300">{value.name}</span>)}
        </div>
        <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Sizes :</h5>
          {product?.sizes.map((value)=><span key={value.id} className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300">{value.name}</span>)}
        </div>
        <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Variante :</h5>
          {product?.varients.map((value)=>
          <div key={value.id} className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300">
            <img className="h-28 max-w-28 rounded-lg" src={value.image} alt=""/>
            <span className='flex p-1'><p className='text-base  font-semibold tracking-tight text-gray-900 dark:text-white'>Nome :</p> <p className='font-normal text-base px-2 text-gray-700 dark:text-gray-400'>{product?.name}</p> </span>
            <span className='flex p-1'><p className='text-base  font-semibold tracking-tight text-gray-900 dark:text-white'>Stock :</p> <p className='font-normal text-base px-2 text-gray-700 dark:text-gray-400'>{product?.stock}</p> </span>
            <span className='flex p-1'><p className='text-base  font-semibold tracking-tight text-gray-900 dark:text-white'>Price :</p> <p className='font-normal text-base px-2 text-gray-700 dark:text-gray-400'>{product?.price}</p> </span>
          </div>)}
        </div>
        {product?.sale &&<div>
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
    <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
      <h3 className="font-medium text-dark dark:text-white">
      Sconto 
      </h3>
    </div>
    
      <div className=" p-4">
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          sconto
          <span className=" text-red-500 h-3 w-3 p-1">*</span>
        </label>
        <p>{product.sale.discountPercentage}</p>
      </div>
      <div className=" p-4">
      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
        Data Inizio
      </label>
      <DataTime data={product.sale.startDate}></DataTime>
      </div>
      <div className=" p-4">
      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
        Data fini
      </label>
        <DataTime data={product.sale.endDate}></DataTime>
      </div>
      
      
      
    
    </div>
    </div>}
      </div>
      
    </DefaultLayout>
    
  )
}

export default page
