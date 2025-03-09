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
import { Product } from "@/app/api/modal";
import { AiOutlineClose } from "react-icons/ai";
import UpdateColor from "@/components/Form/UpdateColor";
import UpdateSize from "@/components/Form/UpdateSize";
import UpdateVariente from "@/components/Form/UpdateVariente";



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


const UpdateProdPage =   ({ params }: { params: { id: string } })=> {
  const searchParam = useSearchParams()
  const show = searchParam.get('show')
  const showVariente = searchParam.get('showVariente')
  const showSale = searchParam.get('showSale')
  const showGallery = searchParam.get('showGallery')
  const showError = searchParam.get('showError')
  const showMessage = searchParam.get('showMessage')
  const showSize = searchParam.get('showSize')

  const [updateColor,setUpdateColor] = useState<boolean>(false)
  const [updateSize,setUpdateSize] = useState<boolean>(false)
  const [updateVariente,setUpdateVariente] = useState<boolean>(false)


    const [resource, setResource] = useState<string | null>();
    const [message, setMessage] = useState<string>('Error ...');
    
    const [colors , setColors] = useState<Color[]>([])
    const [idColor , setIdColor] = useState<string>('')
    const [idSize , setIdSize] = useState<string>('')
    const [idVariente , setIdVariente] = useState<string>('')
    const [varientsFromChild , setVarientsFromChild] = useState<Variente[]>([])
    const [check , setCheck] = useState<boolean>(false)
    const [sizes , setSizes] = useState<Size[]>([])
    const [tags , setTags] = useState<Tag[]>([])
    const [product , setProduct] = useState<Product>()
    const [id, setId] = useState<string >('');
    const [categories , setCategories] = useState<Category[]>([])
    const [colorFromChild, setColorFromChild] = useState<Color>(); 
    const [colorsFromChild, setColorsFromChild] = useState<Color[]>([]);
    const [sizeFromChild, setSizeFromChild] = useState<Size>(); 
    const [categoryFromChild, setCategoryFromChild] = useState<string| undefined>(undefined); 
    const [sizesFromChild, setSizesFromChild] = useState<Size[]>([]);
    const [tagsFromChild, setTagsFromChild] = useState<Tag[]>([]);
    const [tagFromChild, setTagFromChild] = useState<Tag>();
    const [galleryFromChild, setGalleryFromChild] = useState<Gallery[]>([]);
    const [SaleFromChild, setSaleFromChild] = useState<Sale>();
    const [checkRef,setCheckRef] = useState<boolean>(false)
    
    const schemaCategory = z.object({
        name : z.string(),
        
        description : z.string(),
        price : z.coerce.number(),
        
        stock : z.coerce.number({
          required_error: "Stock e obbligatorio",
          invalid_type_error: "Stock deve essere un numero",
        }),
        model :z.string(),
      })
      type IssinUp = z.infer<typeof schemaCategory>
        const {handleSubmit ,register,reset,formState:{errors}} = useForm<IssinUp>({
        mode : "onChange",
        resolver : zodResolver(schemaCategory),
        
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
      const handleCloseModal = (data: boolean) => {
        setUpdateColor(data)
      };
      const handleSizeModalClose = (data: boolean) => {
        setUpdateSize(data)
      };
      const handleVarienteModalClose = (data: boolean) => {
        setUpdateVariente(data)
      };
      function modalUpdateColor(id : string){
        setIdColor(id)
        setUpdateColor(true)
      }
      function modalUpdateSize(id : string){
        setIdSize(id)
        setUpdateSize(true)
      }
      function modalUpdateVariente(id : string){
        setIdVariente(id)
        setUpdateVariente(true)
      }
      
      /*const removeColor = (option: Color) => { 
        setColorsFromChild(colorsFromChild.filter(item => item.name !== option.name)); 
      };
      const removeSize = (option: Size) => { 
        setSizesFromChild(sizesFromChild.filter(item => item.name !== option.name)); 
      };*/
      


      const idAdmin = localStorage.getItem('id');
      const router = useRouter()
      const onSubmit :SubmitHandler<IssinUp> = async (variente) =>{
        setCheck(true)
       
        let IdColors: string[]= []
        let IdSizes: string[]= []
        let IdVarients: string[]= []
        let IdTags: string[]= []
        let IdImages: string[]= []
        const productColorsIds = product?.colors.map(color => color.id);
        IdColors = [...productColorsIds??[]]
        colorsFromChild.map((value)=>{
          IdColors.push(value.id)
        })
        const productSizesIds = product?.sizes.map(size => size.id);
        IdSizes = [...productSizesIds??[]]
        sizesFromChild.map((value) =>{
          IdSizes.push(value.id)
        })
        const productVarientsIds = product?.varients.map(variente => variente.id);
        IdVarients = [...productVarientsIds??[]]
        varientsFromChild.map((value) =>{
          IdVarients.push(value.id)
        })
        const productTagsIds = product?.tags.map(tag => tag.id);
        IdTags = [...productTagsIds??[]]
        tagsFromChild.map((value) =>{
          IdTags.push(value.id)
        })
        const productImagesIds = product?.medias.map(image => image.id);
        IdImages = [...productImagesIds??[]]
        galleryFromChild.map((value)=>{
          IdImages.push(value.id)
        })
        
        const categoryItem = {
          name : variente.name? variente.name: product?.name,
          image : resource,
          description : variente.description ? variente.description :product?.description,
          price : variente.price ?  variente.price : product?.price,
          stock : variente.stock ? variente.stock : product?.stock,
          model : variente.model ? variente.model : product?.model,
          category : product?.category,
          admin : idAdmin,
          colors : IdColors,
          sizes : IdSizes,
          varients : IdVarients,
          tags : IdTags,
          sale : SaleFromChild?.id,
          medias: IdImages
        }
        
        if(!categoryFromChild){
          setMessage('Aggiunge Categoria')
          router.push(`/products/update-product/${id}/?showError=true`)
        }
        else if(IdTags.length == 0){
          setMessage('Aggiunge Tag')
          router.push(`/products/update-product/${id}/?showError=true`)
        }
        else{
          try {
            const requestBody = JSON.stringify(categoryItem);
            const response = await fetch(`${apiUrl}/products/${id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body:requestBody
            })
            if (!response.ok) {
              throw new Error('Failed to submit the data. Please try again.')
            }
            // Handle response if necessary
            setCheck(false)
            const data = await response.json()
            setSizesFromChild([])
            setColorsFromChild([])
            setVarientsFromChild([])
            
            router.refresh()
            reset();
          } catch (error) {
            setCheck(false)
            router.push(`/products/update-product/${id}/?showError=true`)
          } finally {
            setCheck(false)
          }
        }
      }
      async function deleteColor (idColor : string){
        try {
      
          const response = await fetch(`${apiUrl}/colors/${idColor}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
            
          })
          if (!response.ok) {
            throw new Error('Failed to submit the data. Please try again.')
          }
          const data = await response.json()
          
        } catch (error) {
          console.log(error)
        } finally {
        }
      }
      async function deleteSize (idSize : string){
        try {
      
          const response = await fetch(`${apiUrl}/sizes/${idSize}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
            
          })
          if (!response.ok) {
            throw new Error('Failed to submit the data. Please try again.')
          }
          const data = await response.json()
          
        } catch (error) {
          console.log(error)
        } finally {
        }
      }
      async function deleteVariente (idVarient : string){
        try {
      
          const response = await fetch(`${apiUrl}/varientes/${idVarient}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
            
          })
          if (!response.ok) {
            throw new Error('Failed to submit the data. Please try again.')
          }
          const data = await response.json()
          setCheckRef(true)
        } catch (error) {
          console.log(error)
        } finally {
        }
      }
      async function deleteMedias (idMedia : string){
        try {
      
          const response = await fetch(`${apiUrl}/product-medias/${idMedia}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
            
          })
          if (!response.ok) {
            throw new Error('Failed to submit the data. Please try again.')
          }
          const data = await response.json()
          setCheckRef(true)
        } catch (error) {
          console.log(error)
        } finally {
        }
      }
      async function deleteSconte (idSale : string){
        try {
      
          const response = await fetch(`${apiUrl}/sales/${idSale}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
            
          })
          if (!response.ok) {
            throw new Error('Failed to submit the data. Please try again.')
          }
          const data = await response.json()
          setCheckRef(true)
        } catch (error) {
          console.log(error)
        } finally {
        }
      }
      useEffect(() =>{
        const fetchProducts = async () => {
          const { id } =  params;
          setId(id);
          try {
            const res = await fetch(`${apiUrl}/products/${id}`); // Sostituisci con la tua API
            if (!res.ok) {
              throw new Error('Errore nella risposta dell\'API');
            }
            const data: Product = await res.json();
            setProduct(data)
            
            
            setCategoryFromChild(product?.category.id)
          } catch (error) {
          } 
        };
        fetchProducts()
      },[params,product,checkRef,resource,deleteColor,deleteSize])
      
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
              const res = await fetch(`${apiUrl}/categories`); // Sostituisci con la tua API
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
      <Breadcrumb pageName="Modifica" />
      {showError && <ModalError  message={message} check={false} link={`/products/update-product/${id}`}/>}
      {show && <ModalAllComp component={<AddColor sendColorToParent={handleDataFromChild} check={false} link={`/products/update-product/${id}`}/>}/> }
      {showSize && <ModalAllComp component={<AddSize  sendSizeToParent={handleSizeFromChild} check={false} link={`/products/update-product/${id}`}/>}/> }
      {showVariente && <ModalAllComp component={<AddVariente link={`/products/update-product/${id}`} check={false} sendVarienteToParent={handleVarienteFromChild}/>}/> }
      {showSale && <ModalAllComp component={<AddSale link={`/products/update-product/${id}`} check={false}  sendSizeToParent={handleSaleFromChild}/>}/> }
      {showGallery && <ModalAllComp component={<AddGallery link={`/products/update-product/${id}`} sendGalleryToParent={handleGalleryFromChild}  />}/> }
      {showMessage && <ModalMessage  link="/products/update-products"/>}
      {updateColor && <UpdateColor id={idColor} link={`/products/update-product/${id}`} sendColorToParent={handleCloseModal}/>}
      {updateSize && <UpdateSize id={idSize} link={`/products/update-product/${id}`} sendSizeToParent={handleSizeModalClose}/>}
      {updateVariente && <UpdateVariente id={idVariente} link={`/products/update-product/${id}`} sendVarienteToParent={handleVarienteModalClose}/>}
      {product?.name &&<form onSubmit={handleSubmit(onSubmit)}>
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
                  id="name"
                  placeholder={product?.name}
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
                  placeholder={product.description}
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
                placeholder={product.price.toString()}
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
                placeholder={product.stock.toString()}
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
                placeholder={product.model}
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
            <div className=" flex">
            { product.medias.length !=0 && product.medias.map((value) =>
              <div key={value.id} className=" relative border border-dashed border-1 border-[#5d87ff] rounded-lg  m-2">
                <button onClick={()=> deleteMedias(value.id)}  type="button" className="inline-flex items-center m-2 absolute right-0 top-0 px-2 py-1.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-400 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                  <span className="inline-flex items-center justify-center w-4 h-4  text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                    <AiOutlineClose />
                  </span>
                </button>
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
            
            <Link href={`/products/update-product/${id}/?showGallery=true`}>
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
              Colors:
              </h2>
              <div  className="grid grid-cols-4 gap-2" >
              {product.colors.map((value)=>
              <div key={value.id} className="  bg-gray-100 cursor-pointer text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300">
                <button onClick={()=> deleteColor(value.id)}  type="button" className="inline-flex items-center   px-2 py-1.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-400 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    
                    <span className="inline-flex items-center justify-center w-2 h-2  text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                      <AiOutlineClose />
                    </span>
                  </button>
                <span  onClick={()=>modalUpdateColor(value.id)} className="   ">{value.name}</span>
              </div>
              )}
              </div>
            </div>
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
              link={`/products/update-product/${id}/?show=true`}
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
              Sizes:
              </h2>
              <div  className="grid grid-cols-4 gap-2" >
              {product.sizes.map((value)=>
              <div key={value.id} className="  bg-gray-100 cursor-pointer text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300">
                <button onClick={()=> deleteSize(value.id)}  type="button" className="inline-flex items-center   px-2 py-1.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-400 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                  <span className="inline-flex items-center justify-center w-2 h-2  text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                    <AiOutlineClose />
                  </span>
                </button>
                <span  onClick={()=>modalUpdateSize(value.id)} className="   ">{value.name}</span>
              </div>
                
              )}
              </div>
            </div>
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
              link={`/products/update-product/${id}/?showSize=true`}
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
                Varientes :
              </h2>
              {product.varients.map((value) =>
                <div key={value.id}  className=" relative border border-[#253662] rounded-md">
                  <button onClick={()=> deleteVariente(value.id)}  type="button" className="inline-flex items-center m-2 absolute right-0 top-0 px-2 py-1.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-400 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    <span className="inline-flex items-center justify-center w-4 h-4  text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                      <AiOutlineClose />
                    </span>
                  </button>
                  <div onClick={()=> modalUpdateVariente(value.id)} className=" grid grid-cols-2 gap-2 p-2">
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
              link={`/products/update-product/${id}/?showVariente=true`}
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
            <CldImage 
                width="150"
                height="150"
                src={product.image}
                className=" rounded-lg"
                alt="Description of my image"
              />
            <div>
              <CldUploadWidget 
                uploadPreset="oorid-frondend"
                onSuccess={(result : any, { widget }) => {
                  setResource(result.info.url)
                  
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
              <p>{product.category.name}</p>
              
            </div>
          </div>
          {/* <!-- Select Tag --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Selezione Tag
              </h3>
              {product.tags.map((value)=>
              <span key={value.id} className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300">{value.name}</span>
              )}
              <div className="flex flex-col gap-5.5 ">
            <div>
            </div>
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
              link={`/products/update-product/${id}/?showSale=true`}
              customClasses="bg-[#253662] rounded-[5px] w-2/3 m-4  text-[#5D87FF] py-[8px] "
            ></ButtonDefault>


            </div>
          </div>
          {product.sale &&<div>
    <div className=" relative rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
    <button onClick={()=> deleteSconte(product.sale.id)}  type="button" className="inline-flex items-center m-2 absolute right-0 top-0 px-2 py-1.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-400 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">

      <span className="inline-flex items-center justify-center w-4 h-4  text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
        <AiOutlineClose />
      </span>
    </button>
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
        <p>{product.sale.discountPercentage}</p>
      </div>
      <div className=" p-4">
      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
        Data Inizio
      </label>
      <DataTime data={product.sale.startDate}></DataTime>
      </div>
      <div className=" p-4">
      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
        Data fini
      </label>
        <DataTime data={product.sale.endDate}></DataTime>
      </div>
      
      
      
    
    </div>
    </div>}

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

      </form>}
       
    </DefaultLayout>
  );
};

export default withAuth(UpdateProdPage) ;
