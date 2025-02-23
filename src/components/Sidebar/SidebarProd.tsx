import React from 'react'
import ClickOutside from '../ClickOutside';
import Category, { Tag } from '@/app/api/modal';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  categories : Category[]
  tags : Tag[]

}
const SidebarProd : React.FC<SidebarProps> =({ sidebarOpen, setSidebarOpen,categories,tags }: SidebarProps)=> {
  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-9999 lg:z-99 flex h-screen  flex-col overflow-y-hidden border-r border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark lg:static lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0 duration-300 ease-linear"
            : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between    ">
        <div className="h-full px-3 py-4 w-full overflow-y-auto bg-white dark:border-stroke-dark dark:bg-gray-dark">
      <ul className="space-y-2 font-medium">
        <li>
          <span className="ms-3">Categorie</span>
        </li>
        <li>
          {categories.map((value)=>
            <a key={value.id} href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <span className="flex-1 ms-3 whitespace-nowrap">{value.name}</span>
            </a>
          )}
          
        </li>
        
      </ul>
      <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
      <li>
          <span className="ms-3">Tags</span>
        </li>
        <li>
          {tags.map((value)=>
            <a key={value.id} href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <span className="flex-1 ms-3 whitespace-nowrap">{value.name}</span>
            </a>
          )}
          
        </li>
      </ul>
   </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          
          {/* <!-- Sidebar Menu --> */}
        </div>
    </aside>

    </ClickOutside>
    
  )
}

export default SidebarProd
