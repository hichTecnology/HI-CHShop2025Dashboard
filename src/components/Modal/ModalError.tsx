import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
interface ModalErrorProps{
  link : string
  message : string
}

const ModalError : React.FC<ModalErrorProps> =({link,message}) => {
  const route = useRouter()
  function deleteModal (){
    route.back()

  }
  return (
    <div onClick={ () => deleteModal()} className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-999">
    <div className="p-8  w-96  rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-dark dark:text-white">Messaggio</h3>
        <div className="mt-2 px-7 py-3">
          <p className="text-lg text-red-600 "> {message}</p>
        </div>
        <div className="flex justify-center mt-4">

          {/* Navigates back to the base URL - closing the modal */}
          <Link
            href={link}
            className="px-4 py-2 bg-blue-500 text-dark dark:text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Close
          </Link>

        </div>
      </div>
    </div>
  </div>
  )
}

export default ModalError
