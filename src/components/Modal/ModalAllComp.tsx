
import { useRouter } from 'next/navigation';
import React from 'react'
import { VscClose } from 'react-icons/vsc';
interface ChildComponentProps {
  component: React.ReactNode;
}
const ModalAllComp : React.FC<ChildComponentProps> = ({ component }) =>{
  const route = useRouter()
  return (
    <div  className="fixed inset-0 z-999 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <button onClick={()=>route.back()} className=' p-2 m-2 bg-[#4b313d]  rounded-md'>
        <VscClose />
        </button>
        {component}

      </div>
    </div>
  )
}

export default ModalAllComp
