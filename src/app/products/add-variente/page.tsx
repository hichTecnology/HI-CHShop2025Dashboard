"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import Link from "next/link";
import InputGroup from "@/components/FormElements/InputGroup";

import ModalAllCategory from "@/components/Modal/ModalAllCategory";
import AddCategory from "@/components/Form/AddCategory";
import AddColor from "@/components/Form/AddColor";
import ModalAllColor from "@/components/Modal/ModalAllColor";
import AddSize from "@/components/Form/AddSize";
import ModalAllSize from "@/components/Modal/ModalAllSize";

import ModalAllVariente from "@/components/Modal/ModalAllVariente";
import AddTag from "@/components/Form/AddTag";

import ModalAllTag from "@/components/Modal/ModalAllTag";
import ModalMessage from "@/components/Modal/ModalMessage";
import withAuth from "@/components/withAuth";
import { useSearchParams } from "next/navigation";
import AddSubCategory from "@/components/Form/AddSubCategory";
import Category from "@/app/api/modal";
import { useState } from "react";





const FormLayout = () => {
  const searchParam = useSearchParams()
  const show = searchParam.get('show')
  const showCategory = searchParam.get('showCategory')
  const showColor = searchParam.get('showColor')
  const showSize = searchParam.get('showSize')
  const showVariente = searchParam.get('showVariente')
  const showTag = searchParam.get('showTag')
  const [categoryFromChild, setCategoryFromChild] = useState<Category>();
  
  const handleDataFromChild = (data: Category) => {
    setCategoryFromChild(data); 
    
    };
  
  
  
  
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Form Layout" />
      {show && <ModalMessage link="/products/add-variente" />}
      {showCategory && <ModalAllCategory sendCategoryToParent={handleDataFromChild}   />}
      {showColor && <ModalAllColor/>}
      {showTag && <ModalAllTag/>}
      {showSize && <ModalAllSize/>}
      {showVariente && <ModalAllVariente/>}
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <AddCategory></AddCategory>
      <AddTag></AddTag>
      <AddSubCategory categoria={categoryFromChild}></AddSubCategory>
      {/*<AddColor check={true} link="/adds/add-variente"></AddColor>*/}
      <div className="flex flex-col gap-9">
        {/*<AddSize check={true} link="/adds/add-variente"></AddSize>*/}
        {/*<AddVariente></AddVariente>*/}
      </div>
        
        
      </div>
    </DefaultLayout>
  );
};

export default withAuth(FormLayout) ;
