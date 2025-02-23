"use client"
import apiUrl from '@/app/api/apiUrl'
import Category, { Product, Tag } from '@/app/api/modal'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import CardProdAll from '@/components/Card/CardProdAll'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import ModalError from '@/components/Modal/ModalError'
import SidebarProd from '@/components/Sidebar/SidebarProd'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineAlignLeft } from 'react-icons/ai'


const page : React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkfromCancel, setCheckfromCancel] = useState(false);
  const [categories , setCategories] = useState<Category[]>([])
  const [idProd , setIdProd] = useState<string>('')
  const [message, setMessage] = useState<string>('Sei sicure di voler cancellare il prodotto');
  const [tags , setTags] = useState<Tag[]>([])
  const [products , setProducts] = useState<Product[]>([])
  const searchParam = useSearchParams()
  const showError = searchParam.get('showError')
  const router = useRouter()

  const handleCheckCancel = (data: boolean) => {
    setCheckfromCancel(data)
    
  };
  const someFunction = async () => {
    if (checkfromCancel) {
      try {
        
        const response = await fetch(`${apiUrl}/products`, {
          method: 'DELETE',
          
          headers: { 'Content-Type': 'application/json' },
          
        })
        if (!response.ok) {
          throw new Error('Failed to submit the data. Please try again.')
        }
        // Handle response if necessary
        
        const data = await response.json()
        router.push('/products/add-products/?showMessage=true')
        
        
        
      } catch (error) {
        
        router.push('/products/add-products/?showError=true')
      } finally {
        
      }
    } else {
      console.error("sendCheckToParent is undefined");
    }
  };
  useEffect(() =>{
    const fetchTags = async () => {
      try {
        const res = await fetch(`${apiUrl}/Tags`); // Sostituisci con la tua API
        if (!res.ok) {
          throw new Error('Errore nella risposta dell\'API');
        }
        const data: Tag[] = await res.json();
        setTags(data);
        console.log(data)
      } catch (error) {
        console.error(error);
        
      } 
    };
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${apiUrl}/products`); // Sostituisci con la tua API
        if (!res.ok) {
          throw new Error('Errore nella risposta dell\'API');
        }
        const data: Product[] = await res.json();
        setProducts(data)
        console.log(data)
      } catch (error) {
        console.error(error);
        
      } 
    };
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
    fetchTags()
    fetchProducts()
  },[])
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tutti products" />
      {showError && <ModalError message={message} id={idProd} check={true} sendCheckToParent={handleCheckCancel} link="/products/all-products"/>}
        <div className=' max-w-3xl  bg-white dark:border-stroke-dark dark:bg-gray-dark rounded-xl shadow-md overflow-hidden md:max-w-screen-3xl'>
          <div className="lg:flex ">
            <SidebarProd sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} categories={categories} tags={tags}></SidebarProd>
            <div className=" p-4 lg:hidden">
            <button
              aria-controls="sidebar"
              onClick={() => setSidebarOpen(true)}
              className="z-999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-dark-3 dark:bg-dark-2 lg:hidden"
              >
              <AiOutlineAlignLeft className='h-8 w-8 bg-cyan-700' />
            </button>
          </div>
          <div className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 bg-white dark:border-stroke-dark dark:bg-gray-dark'>
          {products.map((value)=>
            <div key={value.id}>
              <CardProdAll product={value}></CardProdAll>

            </div>
            
          )
            }
          

          </div>
          
        </div>
      </div>
    </DefaultLayout>
  
  )
}

export default page
