"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { CldImage, CldOgImage, CldUploadWidget } from "next-cloudinary";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import { VscAdd } from "react-icons/vsc";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ModalAllComp from "@/components/Modal/ModalAllComp";
import AddColor from "@/components/Form/AddColor";

import AddSize from "@/components/Form/AddSize";
import AddVariente from "@/components/Form/AddVariente";
import SelectGroupThree from "@/components/FormElements/SelectGroup/SelectGroupThree";
import MultiSelectTag from "@/components/FormElements/MultiSelest/MultiSelectTag";
import AddSale from "@/components/Form/AddSale";
import DataTime from "@/components/DataStats/DataTime";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddGallery from "@/components/Form/AddGallery";
import Link from "next/link";
import { useRouter ,useSearchParams } from "next/navigation";
import ModalError from "@/components/Modal/ModalError";
import apiUrl from '@/app/api/apiUrl'
import withAuth from "@/components/withAuth";
import Loader from "@/components/common/Loader";
import ModalMessage from "@/components/Modal/ModalMessage";
import AddModel from "@/components/Form/AddModel";
import { Model } from "@/app/api/modal";
import SelectCategory from "@/components/FormElements/SelectGroup/SelectCategory";



interface Color {
  id : string
  name: string
  cod : string
  selected: boolean;
  element?: HTMLElement;
}
interface Category{
  id : string
  name: string
  grado : number
  children : Category[]
}
interface Sale{
  id : string
  discountPercentage : number
  startDate : Date
  endDate : Date
}
interface Tag{
  id : string
  name: string
  selected2: boolean;
  element2?: HTMLElement;
  
}
interface Gallery{
  id : string
  mediaType: string
  url: string;
  
  
}
interface Variente {
  id : string
  name: string
  image : string
  price: number;
  stock: number;
}
interface Size {
  id : string
  name: string
  selected1: boolean;
  element1?: HTMLElement;
}
type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

const FormElementsPage : React.FC<SearchParamProps> =   ({ searchParams })=> {
  const searchParam = useSearchParams()
  const show = searchParam.get('show')
  const showVariente = searchParam.get('showVariente')
  const showSale = searchParam.get('showSale')
  const showGallery = searchParam.get('showGallery')
  const showError = searchParam.get('showError')
  const showMessage = searchParam.get('showMessage')
  const showSize = searchParam.get('showSize')
  const showModel = searchParam.get('showModel')
  
  

    const [resource, setResource] = useState<string | null>();
    const [message, setMessage] = useState<string>('Error ...');
    const [resources, setResources] = useState<string[]|null >([]);
    const [colors , setColors] = useState<Color[]>([])
    const [varientsFromChild , setVarientsFromChild] = useState<Variente[]>([])
    const [check , setCheck] = useState<boolean>(false)
    const [sizes , setSizes] = useState<Size[]>([])
    const [tags , setTags] = useState<Tag[]>([])
    const [categories , setCategories] = useState<Category[]>([])
    const [colorFromChild, setColorFromChild] = useState<Color>(); 
    const [colorsFromChild, setColorsFromChild] = useState<Color[]>([]);
    const [sizeFromChild, setSizeFromChild] = useState<Size>(); 
    const [categoryFromChild, setCategoryFromChild] = useState<Category>(); 
    const [modelFromChild, setModelFromChild] = useState<Model>(); 
    const [sizesFromChild, setSizesFromChild] = useState<Size[]>([]);
    const [tagsFromChild, setTagsFromChild] = useState<Tag[]>([]);
    const [tagFromChild, setTagFromChild] = useState<Tag>();
    const [galleryFromChild, setGalleryFromChild] = useState<Gallery[]>([]);
    const [SaleFromChild, setSaleFromChild] = useState<Sale>();
    const schemaCategory = z.object({
        name : z.string().min(1,{message : ' il name e obblegatorio '}),
        
        description : z.string().min(50,{message : ' la descrizione e corta  '}),
        price : z.coerce.number({
          required_error: "Prezzo e obbligatorio",
          invalid_type_error: "Prezzo deve essere un numero",
        })
        .positive()
        .min(1, { message: "Price is required" }),
        stock : z.coerce.number({
          required_error: "Stock e obbligatorio",
          invalid_type_error: "Stock deve essere un numero",
        }).int()
        .positive(),
        model :z.string().min(1,{message : ' il modelo e obblegatorio '}),
      })
      type IssinUp = z.infer<typeof schemaCategory>
        const {handleSubmit ,register,reset,formState:{errors}} = useForm<IssinUp>({
        mode : "onChange",
        resolver : zodResolver(schemaCategory)
      })
    const handleDataFromChild = (data: Color) => {
      setColorFromChild(data); 
      setColorsFromChild([...colorsFromChild,data])
      
      };
      const handleVarienteFromChild = (data:Variente) => {
        setVarientsFromChild((prevItems) => [...prevItems, data])
      };
      const handleGalleryFromChild = (data:Gallery) => {
        setGalleryFromChild((prevItems) => [...prevItems, data])
      };
      const handleSaleFromChild = (data:Sale) => {
        setSaleFromChild(data)
      };
      const handleSizeFromChild = (data: Size) => {
        setSizeFromChild(data); 
        setSizesFromChild([...sizesFromChild,data])
      };
      
      const handleTagFromChild = (data: Tag) => {
        setTagFromChild(data); 
        setTagsFromChild([...tagsFromChild,data])
      };
      const handleModelFromChild = (data: Model) => {
        setModelFromChild(data); 
      };
      const handleCategoryFromChild = (data: Category) => {
        setCategoryFromChild(data); 
        console.log(categoryFromChild?.id)

      };
      const removeTag = (option: Tag) => { 
        setTagsFromChild(tagsFromChild.filter(item => item.name !== option.name)); 
      };

      const idAdmin = localStorage.getItem('id');
      const router = useRouter()
      const onSubmit :SubmitHandler<IssinUp> = async (variente) =>{
        setCheck(true)
        const IdColors: string[]= []
        const IdSizes: string[]= []
        const IdVarients: string[]= []
        const IdTags: string[]= []
        const IdImages: string[]= []
        const Idcategories: string[]= []
        colorsFromChild.map((value)=>{
          IdColors.push(value.id)
        })
        sizesFromChild.map((value) =>{
          IdSizes.push(value.id)
        })
        varientsFromChild.map((value) =>{
          IdVarients.push(value.id)
        })
        tagsFromChild.map((value) =>{
          IdTags.push(value.id)
        })
        galleryFromChild.map((value)=>{
          IdImages.push(value.id)
        })
        
        
        const categoryItem = {
          name : variente.name,
          image : resource,
          description : variente.description,
          price : variente.price,
          stock : variente.stock,
          category : [categoryFromChild?.id],
          admin : idAdmin,
          colors : IdColors,
          sizes : IdSizes,
          varients : IdVarients,
          tags : IdTags,
          sale : SaleFromChild?.id,
          model : modelFromChild?.id,
          medias: IdImages
        }
        if(!resource){
          setMessage('Aggiunge Imaggine')
          router.push('/products/add-products/?showError=true')
        }
        else if(!categoryFromChild?.id){
          setMessage('Aggiunge Categoria')
          router.push('/products/add-products/?showError=true')

        }
        else if(IdTags.length == 0){
          setMessage('Aggiunge Tag')
          router.push('/products/add-products/?showError=true')

        }
        else{
          try {
            const requestBody = JSON.stringify(categoryItem);
            const response = await fetch(`${apiUrl}/products`, {
              method: 'POST',
              
              headers: { 'Content-Type': 'application/json' },
              body:requestBody
            })
            if (!response.ok) {
              throw new Error('Failed to submit the data. Please try again.')
            }
            // Handle response if necessary
            setCheck(false)
            const data = await response.json()
            router.push('/products/add-products/?showMessage=true')
            
            reset();
            
          } catch (error) {
            setCheck(false)
            router.push('/products/add-products/?showError=true')
          } finally {
            setCheck(false)
          }

        }
        
      }
      
        useEffect(() =>{
          const fetchColor = async () => {
            try {
              const res = await fetch(`${apiUrl}/colors`); // Sostituisci con la tua API
              if (!res.ok) {
                throw new Error('Errore nella risposta dell\'API');
              }
              const data: Color[] = await res.json();
              setColors(data);
              
            } catch (error) {
              console.error(error);
              
            } 
          };
          const fetchSize = async () => {
            try {
              const res = await fetch(`${apiUrl}/sizes`); // Sostituisci con la tua API
              if (!res.ok) {
                throw new Error('Errore nella risposta dell\'API');
              }
              const data1: Size[] = await res.json();
              setSizes(data1);

              
            } catch (error) {
              console.error(error);
              
            } 
          };
          const fetchTag = async () => {
            try {
              const res = await fetch(`${apiUrl}/tags`); // Sostituisci con la tua API
              if (!res.ok) {
                throw new Error('Errore nella risposta dell\'API');
              }
              const data1: Tag[] = await res.json();
              setTags(data1);

              
            } catch (error) {
              console.error(error);
              
            } 
          };
          const fetchCategory = async () => {
            try {
              const res = await fetch(`${apiUrl}/categories/filter/1`); // Sostituisci con la tua API
              if (!res.ok) {
                throw new Error('Errore nella risposta dell\'API');
              }
              const data1: Category[] = await res.json();
              setCategories(data1)
            } catch (error) {
              console.error(error);
              
            } 
          };
          fetchColor()
          fetchSize()
          fetchCategory()
          fetchTag()
        },[sizeFromChild,colorFromChild])
  return (
    <DefaultLayout>
      <Breadcrumb pageName="FormElements" />
      {showError && <ModalError  message={message} check={false} link="/products/add-products"/>}
      {show && <ModalAllComp component={<AddColor sendColorToParent={handleDataFromChild} check={false} link="/products/add-products"/>}/> }
      {showSize && <ModalAllComp component={<AddSize  sendSizeToParent={handleSizeFromChild} check={false} link="/products/add-products" />}/> }
      {showModel && <ModalAllComp component={<AddModel sendModelToParent={handleModelFromChild} check={false} link="/products/add-products" list={categories} />}/> }
      {showVariente && <ModalAllComp component={<AddVariente link="/products/add-products" check={false} sendVarienteToParent={handleVarienteFromChild}/>}/> }
      {showSale && <ModalAllComp component={<AddSale link="/products/add-products" check={false}  sendSizeToParent={handleSaleFromChild}/>}/> }
      {showGallery && <ModalAllComp component={<AddGallery link="/products/add-products" sendGalleryToParent={handleGalleryFromChild}  />}/> }
      {showMessage && <ModalMessage  link="/products/add-products"/>}
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
        <div className="flex flex-col col-span-2 gap-9">
        
          {/* <!-- Input Fields --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Date Generale
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Titolo
                  <span className=" text-red-500 h-3 w-3 p-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Titolo"
                  {...register('name')}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                <p className=" text-xs">A product name is required and recommended to be unique.</p>
                {errors.name && <p className=" text-xs text-red-500">{errors.name.message}</p> }
              </div>
              
              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Descrizione
                  <span className=" text-red-500 h-3 w-3 p-1">*</span>
                </label>
                <textarea
                  rows={6}
                  placeholder="Descrizione"
                  {...register('description')}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                ></textarea>
                {errors.description && <p className=" text-xs text-red-500">{errors.description.message}</p> }
              </div>
            </div>
          </div>

          {/* <!-- Time and date --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Prezzo 
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
            <div className=''>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Prezzo
                <span className="text-red">*</span>
              </label>
              <input
                type='number'
                step="any"
                placeholder='Prezzo'
                {...register('price')}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
              {errors.price && <p className=" text-xs text-red-500">{errors.price.message}</p> }
            </div>
            <div className=''>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                stock
                <span className="text-red">*</span>
              </label>
              <input
                type='number'
                placeholder='Stock'
                {...register('stock')}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
              {errors.stock && <p className=" text-xs text-red-500">{errors.stock.message}</p> }
            </div>
            <div className=''>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Modello
                <span className="text-red">*</span>
              </label>
              <input
                type='text'
                placeholder='Modello'
                {...register('model')}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
              {errors.model && <p className=" text-xs text-red-500">{errors.model.message}</p> }
            </div>
            </div>
          </div>

          {/* <!-- File upload --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                File upload
              </h3>
            </div>
            <Link href={'/products/add-products/?showGallery=true'}>
            <div  className='text-white border border-dashed border-1 border-[#5d87ff] grid grid-cols-1 gap-4 content-center  p-5 w-4/4 h-30  m-6 bg-[#253662] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 my-4  dark:bg-[#253662] dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
              <p className=" text-[#5d87ff]"> aggiunge un nuova immagine</p>
            </div>
            </Link>
            <div className=" flex">
            { galleryFromChild.length !=0 && galleryFromChild.map((value) =>
              <div key={value.id} className=" border border-dashed border-1 border-[#5d87ff] rounded-lg  m-2">
                <CldImage 
                width="150"
                height="150"
                src={value.url }
                className=" rounded-lg"
                alt="Description of my image"
              />
              </div>
            )}

            </div>
            
            

        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <!-- Color --> */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Aggiunge Colore
              </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <h2 className=" block text-body-sm font-medium text-dark dark:text-white"> 
                Colore aggiunto :
              </h2>
              {colorsFromChild.map((value)=>
              <span key={value.cod}> {value.name}</span>

              )}
              
            </div>
              
              <ButtonDefault
              label="Colore"
              link="/products/add-products/?show=true"
              customClasses="bg-[#253662] rounded-[5px] w-2/3  text-[#5D87FF] py-[8px] "
            >
              <VscAdd/>
            </ButtonDefault>
          </div>
        </div>
        {/* <!-- Size --> */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Aggiunge Size
              </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <h2 className=" block text-body-sm font-medium text-dark dark:text-white"> 
                Size aggiunto :
              </h2>
              {sizesFromChild.map((value)=>
              <span key={value.name}> {value.name}</span>
              )}
            </div>
            <ButtonDefault
              label="Size "
              link="/products/add-products/?showSize=true"
              customClasses="bg-[#253662] rounded-[5px] w-2/3  text-[#5D87FF] py-[8px] "
            >
            </ButtonDefault>
            </div>
        </div>
        {/* <!-- Variente --> */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Aggiunge Variente
              </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <h2 className=" block text-body-sm font-medium text-dark dark:text-white"> 
                Variente aggiunto :
              </h2>
              {varientsFromChild.map((value) =>
                <div key={value.id} className=" border border-[#253662] rounded-md">
                  <div className=" grid grid-cols-2 gap-2 p-2">
                  { value.image && <CldImage 
                              width="70"
                              height="70"
                              src={value.image }
                              alt="Description of my image"
                              />}
                </div>
                <div className=" p-2">
                  <div>
                  <span className=" text-sm text-gray-400"> price :</span>
                  <span className=" text-sm text-red-500">{value.price}</span>
                  </div>
                  <div>
                  <span className=" text-sm text-gray-400 my-2 py-2"> stock :</span>
                  <span className=" text-sm text-cyan-500 my-2 py-2">{value.stock}</span>
                  </div>
                  
                </div>
                </div>
              )}
            </div>
              <ButtonDefault
              label="Variente "
              link="/products/add-products/?showVariente=true"
              customClasses="bg-[#253662] rounded-[5px] w-2/3  text-[#5D87FF] py-[8px] "
            >
              <VscAdd/>
            </ButtonDefault>
            </div>
        </div>
        {/* <!-- Model --> */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Aggiunge Model
              </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <h2 className=" block text-body-sm font-medium text-dark dark:text-white"> 
                Model  aggiunto : {modelFromChild?.name}
              </h2>
              {varientsFromChild.map((value) =>
                <div key={value.id} className=" border border-[#253662] rounded-md">
                  <div className=" grid grid-cols-2 gap-2 p-2">
                  { value.image && <CldImage 
                    width="70"
                    height="70"
                    src={value.image }
                    alt="Description of my image"
                  />}
                </div>
                <div className=" p-2">
                  <div>
                  <span className=" text-sm text-gray-400"> price :</span>
                  <span className=" text-sm text-red-500">{value.price}</span>
                  </div>
                  <div>
                  <span className=" text-sm text-gray-400 my-2 py-2"> stock :</span>
                  <span className=" text-sm text-cyan-500 my-2 py-2">{value.stock}</span>
                  </div>
                  
                </div>
                </div>
              )}
            </div>
              <ButtonDefault
              label="Model "
              link="/products/add-products/?showModel=true"
              customClasses="bg-[#253662] rounded-[5px] w-2/3  text-[#5D87FF] py-[8px] "
            >
              <VscAdd/>
            </ButtonDefault>
            </div>
        </div>
        

        </div>
        
      </div>

        <div className="flex flex-col gap-9">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                File upload
              </h3>
            </div>
            <div>
              <CldUploadWidget 
                uploadPreset="oorid-frondend"
                onSuccess={(result : any, { widget }) => {
                  setResource(result.info.url)
                  console.log(resource)
                }}
                onQueuesEnd={(result, { widget }) => {
                widget.close();
              }}
              >
              {({ open }) => {
              function handleOnClick() {
                setResource(undefined);
                open();
              }
            return (
            <div  className='text-white border border-dashed border-1 border-[#5d87ff] grid grid-cols-1 gap-4 content-center  p-5 w-4/4 h-30  m-6 bg-[#253662] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 my-4  dark:bg-[#253662] dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
              onClick={handleOnClick}>
              <p className=" text-[#5d87ff]"> aggiunge un nuova immagine</p>
            </div>
            );
            }}
            </CldUploadWidget>
            <div className=" ">
            { resource && <CldImage 
                width="150"
                height="150"
                src={resource }
                className=" border border-dashed border-1 border-[#5d87ff] rounded-lg  m-2"
                alt="Description of my image"
            />}
            </div>
              
          </div>
        </div>
          {/* <!-- Select category --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Selezione Categoria
                
              </h3>
              {/*<SelectGroupThree sendCategoryToParent={handleCategoryFromChild} list={categories}></SelectGroupThree>*/}
              <SelectCategory sendCategoryToParent={handleCategoryFromChild} list={categories}></SelectCategory>
            </div>
          </div>
          {/* <!-- Select Tag --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Selezione Tag
              </h3>
              
              <div className="flex flex-col gap-5.5 ">
              
            <div>
            </div>
              <MultiSelectTag   id="multiSelectTag" removeTag={removeTag} tags={tags} sendTagToParent={handleTagFromChild}  />
          </div>
            </div>
          </div>
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Aggiunge Sconto
              </h3>
              <ButtonDefault
              label="Aggiunge"
              link="/products/add-products/?showSale=true"
              customClasses="bg-[#253662] rounded-[5px] w-2/3 m-4  text-[#5D87FF] py-[8px] "
            ></ButtonDefault>


            </div>
          </div>

    {SaleFromChild &&<div>
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
        <p>{SaleFromChild?.discountPercentage}</p>
      </div>
      <div className=" p-4">
      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
        Data Inizio
      </label>
      <DataTime data={SaleFromChild?.startDate}></DataTime>
      </div>
      <div className=" p-4">
      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
        Data fini
      </label>
        <DataTime data={SaleFromChild?.endDate}></DataTime>
      </div>
      
      
      
    
    </div>
    </div>}
        
        </div>
        
      </div>
      {check ? <Loader/>:<button type="submit" className="flex w-1/3 m-4 justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
        Invia
      </button>}

      </form>
       
    </DefaultLayout>
  );
};

export default withAuth(FormElementsPage) ;
