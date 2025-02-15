"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxFive from "@/components/FormElements/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/FormElements/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/FormElements/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/FormElements/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/FormElements/Checkboxes/CheckboxTwo";
import { VscAdd } from "react-icons/vsc";
import MultiSelect from "@/components/FormElements/MultiSelect";
import SelectGroupTwo from "@/components/FormElements/SelectGroup/SelectGroupTwo";
import InputGroup from "./InputGroup";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import ButtonDefault from "../Buttons/ButtonDefault";
import ModalAllComp from "../Modal/ModalAllComp";
import AddColor from "../Form/AddColor";
interface Color {
  name: string
  cod : string
  selected: boolean;
  element?: HTMLElement;
}
type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};
const FormElements =   ({ searchParams }: SearchParamProps)=> {
  const show = searchParams?.show;
  
  const [resource, setResource] = useState<string | null>();
  const [colors , setColors] = useState<Color[]>([])
  const [colorFromChild, setColorFromChild] = useState<Color>();
  const [colorsFromChild, setColorsFromChild] = useState<Color[]>([]);  
  const handleDataFromChild = (data: Color) => {
    setColorFromChild(data); 
    setColorsFromChild([...colorsFromChild,data])
    };
    
    const removeColor = (option: Color) => { 
      setColorsFromChild(colorsFromChild.filter(item => item.name !== option.name)); 
    };
  
      useEffect(() =>{
        const fetchCategories = async () => {
          try {
            const res = await fetch('http://localhost:3333/colors'); // Sostituisci con la tua API
            if (!res.ok) {
              throw new Error('Errore nella risposta dell\'API');
            }
            const data: Color[] = await res.json();
            setColors(data);
            console.log(data)
          } catch (error) {
            console.error(error);
            
          } 
        };
        fetchCategories()
      })
    
  return (
    <>
      <Breadcrumb pageName="FormElements" />
      
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
        <div className="flex flex-col col-span-2 gap-9">
        {show && <p>hello word </p> }
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
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                <p className=" text-xs">A product name is required and recommended to be unique.</p>
              </div>
              
              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Descrizione
                  <span className=" text-red-500 h-3 w-3 p-1">*</span>
                </label>
                <textarea
                  rows={6}
                  placeholder="Descrizione"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                ></textarea>
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
              <InputGroup required label="price" type="number" placeholder="price"></InputGroup>
              <InputGroup required label="stock" type="number" placeholder="stock"></InputGroup>
              <InputGroup required label="modal" type="text" placeholder="modal"></InputGroup>
            </div>
          </div>

          {/* <!-- File upload --> */}
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
              { resource && <CldImage 
                width="150"
                height="150"
                src={resource }
                alt="Description of my image"
            />}
          </div>
        </div>
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
              
            </div>
              
              <ButtonDefault
              label="Aggiunge unaltro colore"
              link="/adds/form-elements/?show=true"
              customClasses="bg-[#253662] rounded-[5px] w-[250px]  text-[#5D87FF] py-[11px] "
            >
              <VscAdd/>
            </ButtonDefault>
            </div>
        </div>
      </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Textarea Fields --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Textarea Fields
              </h3>
            </div>
            <div className="flex flex-col gap-6 p-6.5">
              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Default textarea
                </label>
                <textarea
                  rows={6}
                  placeholder="Default textarea"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Active textarea
                </label>
                <textarea
                  rows={6}
                  placeholder="Active textarea"
                  className="w-full rounded-[7px] border-[1.5px] border-primary bg-transparent px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:bg-dark-2 dark:text-white"
                ></textarea>
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Disabled textarea
                </label>
                <textarea
                  rows={6}
                  disabled
                  placeholder="Disabled textarea"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
                ></textarea>
              </div>
            </div>
          </div>

          {/* <!-- Checkbox and radio --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Checkbox and radio
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <CheckboxOne />
              <CheckboxTwo />
              <CheckboxThree />
              <CheckboxFour />
              <CheckboxFive />
            </div>
          </div>

          {/* <!-- Select input --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Select input
              </h3>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default FormElements;
