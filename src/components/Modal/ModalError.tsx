import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
interface ModalErrorProps{
  link : string
  message : string
  check : boolean
  id? : string
 
}

const ModalError : React.FC<ModalErrorProps> =({link,message,check,id}) => {
  const route = useRouter()
  function deleteModal (){
    route.back()
  }
  const someFunction = () => {
    
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-999">
    <div className="p-8  w-96  rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-dark dark:text-white">Messaggio</h3>
        <div className="mt-2 px-7 py-3">
          <p className="text-lg text-red-600 "> {message}</p>
        </div>
          {/* Navigates back to the base URL - closing the modal */}
          <div className=' flex justify-between'>
          <Link
            href={link}
            className="px-2 py-1 bg-blue-500 text-dark dark:text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">
            Close
          </Link>
          {check &&<button onClick={()=> someFunction()}  type="button" className="inline-flex items-center m-2  px-2 py-1.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none dark:bg-red-600 dark:hover:bg-red-700">
            Cancella
            <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
              <AiOutlineClose />
            </span>
          </button>}
          </div>
      </div>
    </div>
  </div>
  )
}

export default ModalError
