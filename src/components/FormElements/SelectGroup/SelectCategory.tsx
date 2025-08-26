import ClickOutside from '@/components/ClickOutside'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from "next/image";
import { Model } from '@/app/api/modal';

interface Category {
  id: string
  name: string
  grado : number
  children : Category[]
  models : Model[]
}
interface CategoriaProps{
  list : Category[]
  sendCategoryToParent: (data: Category) => void;
}

const SelectCategory:React.FC<CategoriaProps> =({sendCategoryToParent,list}) =>{
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoria, setCategoria] = useState<string>('Categoria');
  const sendCate=(category:Category)=>{
    sendCategoryToParent(category)
    setCategoria(category.name)
  }
  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
    <Link
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="flex items-center gap-4"
      href="#"
    >
      <span className="flex bg-slate-200 rounded-xl opacity-60 items-center gap-2 font-medium text-dark py-1 px-4 mt-4 dark:text-dark-6">
        <span className="hidden lg:block">{categoria}</span>
        <svg
          className={`fill-current duration-200 ease-in ${dropdownOpen && "rotate-180"}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.6921 7.09327C3.91674 6.83119 4.3113 6.80084 4.57338 7.02548L9.99997 11.6768L15.4266 7.02548C15.6886 6.80084 16.0832 6.83119 16.3078 7.09327C16.5325 7.35535 16.5021 7.74991 16.24 7.97455L10.4067 12.9745C10.1727 13.1752 9.82728 13.1752 9.59322 12.9745L3.75989 7.97455C3.49781 7.74991 3.46746 7.35535 3.6921 7.09327Z"
            fill=""
          />
        </svg>
      </span>
    </Link>

    {/* <!-- Dropdown Star --> */}
    {dropdownOpen && (
      <div className={`absolute z-999 right-0 mt-7.5 flex w-[280px] flex-col rounded-lg border-[0.5px] border-stroke bg-white shadow-default dark:border-dark-3 dark:bg-gray-dark`}>
        <div className=" items-center gap-2.5 px-5 pb-5.5 pt-3.5">
          <ul className="h-48 py-2 overflow-y-auto   text-black dark:text-gray-200" >
            {list.map((cate)=>(
              <li key={cate.id}>
              <a href="#" className="flex items-center text-xl px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                {cate.name}
              </a>
              {cate.children.map((value)=>(<ul key={value.id} className=" list-disc ml-2 text-gray-700 dark:text-gray-200">
                  <li onClick={()=>sendCate(value)} key={value.id} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                    -  {value.name}
                </li>
              </ul>
            ))}
            </li>
            ))}
          </ul>
          </div>
      </div>
    )}
    {/* <!-- Dropdown End --> */}
  </ClickOutside>
  )
}

export default SelectCategory
