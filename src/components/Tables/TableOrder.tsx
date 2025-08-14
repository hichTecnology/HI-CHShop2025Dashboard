import apiUrl from "@/app/api/apiUrl";
import { order } from "@/app/api/modal";
import { Package } from "@/types/package";
import { useEffect, useState } from "react";
import Image from 'next/image';
import ProductModal from "../Modal/ModalProduct";
import ModalShipment from "../Modal/ModalShipment";


const TableOrder = () => {
  const [orders , setOrders] = useState<order[]>([])
  const [order , setOrder] = useState<order>()
  const [isOpen, setIsOpen] = useState(false)
  const [check , setCheck] = useState<boolean>(false)
  const [totalPage , setTotalPage] = useState<number|undefined>(1)
  const [currentPage , setCurrentPage] = useState<number|undefined>(1)
  const [isOpenShipment, setIsOpenShipment] = useState(false)
  const [link , setLink] = useState<string>(`${apiUrl}/orders/page/orders?page=1&limit=5`)
  const pageNumbers = Array.from({ length: totalPage??1 }, (_, index) => index + 1);
  function openModal(order:order){
    setOrder(order)
    setIsOpen(true)
  }
  function openModalShipment(order:order){
    setOrder(order)
    setIsOpenShipment(true)
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
  useEffect(() =>{
    const fetchTags = async () => {
      try {
        const res = await fetch(link); // Sostituisci con la tua API
        if (!res.ok) {
          throw new Error('Errore nella risposta dell\'API');
        }
        const data = await res.json();
        setOrders(data.orders);
        const tot = Math.ceil(data.total/5)
        setTotalPage(tot)
        console.log(data)
      } catch (error) {
        console.error(error);
        
      } 
    };
    fetchTags()
  },[isOpenShipment,link])
  const previousPage = async () => {
    
    if(currentPage)
    if(currentPage > 1){
      setCurrentPage(currentPage-1)
      
        setLink(`${apiUrl}/orders/page/orders?page=${currentPage-1}&limit=5`)
     
    
    }
    
  }
  const changePage = (page :number) => {
    
    setCurrentPage(page)
      setLink(`${apiUrl}/orders/page/orders?page=${page}&limit=5`)
    
    
  }

  const nextPage = async () => {
    if(currentPage&&totalPage){
      if(currentPage < totalPage){
        setCurrentPage(currentPage+1)
          setLink(`${apiUrl}/orders/page/orders?page=${currentPage+1}&limit=5`)
    }
    
  }}
  return (
    
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <ProductModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        order={order}
      />
      <ModalShipment
        isOpen={isOpenShipment}
        onClose={() => setIsOpenShipment(false)}
        order={order}
      />
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                Products
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                Data
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
          {orders.length > 0 ? (
            orders.map((packageItem, index) => (
              <tr key={index}>
              <td
                className={`border-[#eee] rounded-xl grid grid-cols-4 gap-2 px-4 py-4 dark:border-dark-3 xl:pl-7.5 `}
              >
                {packageItem.carts.map((item) =>(
                  <div key={item.id} className="">
                    <Image height={45} width={45} src={item.product.image} alt={'Defult'}/>
                  </div>
                ))}
              
              </td>
              <td
                className={`border-[#eee] px-4 py-4 dark:border-dark-3 `}
              >
                <p className="text-dark dark:text-white">
                  {convertDate(packageItem.createdAt)}
                </p>
              </td>
              <td
                className={`border-[#eee] px-4 py-4 dark:border-dark-3 `}
              >
                <p
                  className={`inline-flex rounded-full px-3.5 py-1 text-body-sm font-medium ${
                    packageItem.status === "pagato"
                      ? "bg-[#219653]/[0.08] text-[#219653]"
                      : packageItem.status === "Unpaid"
                        ? "bg-[#D34053]/[0.08] text-[#D34053]"
                        : "bg-[#FFA70B]/[0.08] text-[#FFA70B]"
                  }`}
                >
                  {packageItem.status}
                </p>
              </td>
              <td
                className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 `}
              >
                <div className="flex items-center justify-end space-x-3.5">
                  <button onClick={() => openModal(packageItem)} className="hover:text-primary">
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.99935 6.87492C8.27346 6.87492 6.87435 8.27403 6.87435 9.99992C6.87435 11.7258 8.27346 13.1249 9.99935 13.1249C11.7252 13.1249 13.1243 11.7258 13.1243 9.99992C13.1243 8.27403 11.7252 6.87492 9.99935 6.87492ZM8.12435 9.99992C8.12435 8.96438 8.96382 8.12492 9.99935 8.12492C11.0349 8.12492 11.8743 8.96438 11.8743 9.99992C11.8743 11.0355 11.0349 11.8749 9.99935 11.8749C8.96382 11.8749 8.12435 11.0355 8.12435 9.99992Z"
                        fill=""
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.99935 2.70825C6.23757 2.70825 3.70376 4.96175 2.23315 6.8723L2.20663 6.90675C1.87405 7.3387 1.56773 7.73652 1.35992 8.20692C1.13739 8.71064 1.04102 9.25966 1.04102 9.99992C1.04102 10.7402 1.13739 11.2892 1.35992 11.7929C1.56773 12.2633 1.87405 12.6611 2.20664 13.0931L2.23316 13.1275C3.70376 15.0381 6.23757 17.2916 9.99935 17.2916C13.7611 17.2916 16.2949 15.0381 17.7655 13.1275L17.792 13.0931C18.1246 12.6612 18.431 12.2633 18.6388 11.7929C18.8613 11.2892 18.9577 10.7402 18.9577 9.99992C18.9577 9.25966 18.8613 8.71064 18.6388 8.20692C18.431 7.73651 18.1246 7.33868 17.792 6.90673L17.7655 6.8723C16.2949 4.96175 13.7611 2.70825 9.99935 2.70825ZM3.2237 7.63475C4.58155 5.87068 6.79132 3.95825 9.99935 3.95825C13.2074 3.95825 15.4172 5.87068 16.775 7.63475C17.1405 8.10958 17.3546 8.3933 17.4954 8.71204C17.627 9.00993 17.7077 9.37403 17.7077 9.99992C17.7077 10.6258 17.627 10.9899 17.4954 11.2878C17.3546 11.6065 17.1405 11.8903 16.775 12.3651C15.4172 14.1292 13.2074 16.0416 9.99935 16.0416C6.79132 16.0416 4.58155 14.1292 3.2237 12.3651C2.85821 11.8903 2.64413 11.6065 2.50332 11.2878C2.37171 10.9899 2.29102 10.6258 2.29102 9.99992C2.29102 9.37403 2.37171 9.00993 2.50332 8.71204C2.64413 8.3933 2.85821 8.10958 3.2237 7.63475Z"
                        fill=""
                      />
                    </svg>
                  </button>
                  <button onClick={() => openModalShipment(packageItem)} className="hover:text-primary">
                  <svg className="fill-current" 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                  </svg>

                  </button>
                  <button className="hover:text-primary">
                    <svg className="fill-current" 
                    aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7h1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h11.5M7 14h6m-6 3h6m0-10h.5m-.5 3h.5M7 7h3v3H7V7Z"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))
        ):(
        <tr>
          <td colSpan={4} className="text-center py-4">
            Nessun ordine trovato
          </td>
        </tr>)}
        </tbody>
          
        </table>
        <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button onClick={()=>previousPage()}  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
        </li>
        {pageNumbers.map((value,index)=>(
          currentPage ==index+1 ?<li key={index}> 
          <a  href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{index+1}</a>
        </li>:<li key={index}>
          <button onClick={()=>changePage(index+1)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{index+1}</button>
        </li>
      ))}
      <li>
        <button onClick={()=>nextPage()} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
      </li>
    </ul>
  </nav>
      </div>
    </div>
  );
};

export default TableOrder;
