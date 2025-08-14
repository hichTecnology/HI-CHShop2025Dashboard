// components/ProductModal.tsx

import { order } from '@/app/api/modal'
import { useState } from 'react'
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';



interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  order?: order
}

export default function ProductModal({ isOpen, onClose, order }: ProductModalProps) {
  
  if (!isOpen) return null

  const handleBuy = () => {
    
    onClose()
  }
  const convertDate =(data : Date) =>{
    
    const date = new Date(data);
    const formatted = date.toLocaleDateString('it-IT',{
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return formatted
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-8">
      <div className="bg-white rounded-xl max-h-[80vh] overflow-y-auto shadow-lg w-full  p-6 relative m-4">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 "
          onClick={onClose}
        >
          ✕
        </button>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4">
        <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">. Clienti</h2>
      
        
        
          <div  className={` w-70% borderborder-blue-500 border-4  border-opacity-65 rounded-xl p-4 my-2 relative`}>
            <div>
            <p className=' text-gray-800 dark:text-white font-extralight'>Nome: <span className=' text-gray-800 px-4'>{order?.user.username}</span></p>
            <p className=' py-4 text-gray-800 dark:text-white font-extralight'>Email : <span className=' text-gray-800 px-4'>{order?.user.email}</span> </p>
            
            </div>
            
          </div>
        
        <div className=' w-full flex justify-end '>

        </div>
        
      </section>
        {order?.shipment.address &&<section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">. Indirizzo</h2>
      
        
        
          <div  className={` w-70% borderborder-blue-500 border-4  border-opacity-65 rounded-xl p-4 my-2 relative`}>
            <div>
            <p className=' text-gray-800 dark:text-white font-extralight'>{order?.shipment.address.indirizzo1} <span className=' text-gray-800 px-4'>{order?.shipment.address.civico}</span></p>
            <p className=' py-4 text-gray-800 dark:text-white font-extralight'>{order?.shipment.address.CAP} <span className=' text-gray-800 px-4'>{order?.shipment.address.comune}</span> <span>{order?.shipment.address.provincia}</span></p>
            <p className=' text-gray-800  font-extralight'>{order?.shipment.address.telefono} </p>
            </div>
            
          </div>
        
        <div className=' w-full flex justify-end '>

        </div>
        
      </section>}
      <div className=' m-8 border '>
         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 p-2 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                    titolo
                </th>
                <th scope="col" className="px-6 py-3">
                    quantita
                </th>
                <th scope="col" className="px-6 py-3">
                    prezzo
                </th>
              
              
            </tr>
        </thead>
        {order?.carts?.map((item) => (
          <tbody key={item.id}>
          <tr className="bg-white  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="p-4">
            <Image height={80} width={80} src={item.product.image} alt={'Defult'}/>
          </td>
          <td className="px-6 py-4 font-semibold max-w-32 text-gray-900 dark:text-white">
              {item.product.name}
          </td>
          <td className="px-6 py-4">
              <div className="flex items-center">
                  
                  <div>
                      <input  type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={item.quantity.toString()} required />
                  </div>
                
              </div>
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {item.product.price}
          </td>
          
      </tr>

      
    
  </tbody>

        ))}
        <tfoot>
            <tr className="font-semibold text-gray-900 dark:text-white border-b pb-6">
                {order && (
                  <th scope="row" className="px-6 py-3 text-base">Total : <span className=' text-red-500'>{order.totalAmount}€</span></th>
                )}
                <td className="px-6 py-3">data : <span>{order ? convertDate(order.createdAt) : 'N/A'}</span></td>
                {order?.payment && <td className="px-6 py-3">pagamento : <span className=' text-green-400'>{order.status}</span></td>}
                <td className="px-6 py-3">
                <td className="px-6 py-3">shipment : <span className=' text-green-400'>{order?.shipment.status}</span></td>
                </td>
            </tr>
        </tfoot>
      </table>

      </div>
       

   
    </div>
      </div>
    </div>
  )
}

