import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import apiUrl from '@/app/api/apiUrl'
import React, { useState } from 'react'

interface Gallery {
  id : string,
  mediaType : string,
  url : string
}
interface AddGalleryProps {
  sendGalleryToParent: (data: Gallery) => void;
  link : string
}
const AddGallery : React.FC<AddGalleryProps> = ({sendGalleryToParent,link}) => {
  const route = useRouter()
  const [images, setImages] = useState<string >('');
  const [type, setTypes] = useState<string >('');
  const AddGalleries = async () =>{
    const Gallery ={
      mediaType : type,
      url:images
    }
       
    try {
      const requestBody = JSON.stringify(Gallery);
      const response = await fetch(`${apiUrl}/product-medias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:requestBody
      })
      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }
        
              // Handle response if necessary
      const data = await response.json()
      console.log(data)
      sendGalleryToParent(data)
      route.push(`${link}`)

       
      } catch (error) {
              // Capture the error message to display to the user
      console.error(error)
      } finally {
        console.log('tutto ok')
      }
  }
  return (
    <div>
      <div className="rounded-[10px]  border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                File upload
              </h3>
            </div>
            <div>
              <CldUploadWidget 
                uploadPreset="oorid-frondend"
                onSuccess={(result : any, { widget }) => {
                  
                  setImages(result.info.url)
                  setTypes(result.info.resource_type)
                  

                  
                }}
                onQueuesEnd={(result, { widget }) => {
                widget.close();
              }}
              >
              {({ open }) => {
              function handleOnClick() {
                
                open();
              }
            return (
            <div  className='text-white border border-dashed border-1 border-[#5d87ff] grid grid-cols-1 gap-4 content-center  p-5  h-30  m-6 bg-[#253662] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 my-4  dark:bg-[#253662] dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
              onClick={handleOnClick}>
              <p className=" text-[#5d87ff]"> aggiunge un nuova immagine</p>
            </div>
            );
            }}
            </CldUploadWidget>
            <div className=" flex ">
              { images.length !=0 && 
                <div  className=" border border-dashed border-1 border-[#5d87ff] rounded-lg  m-2">
                  <CldImage 
                    width="150"
                    height="150"
                    src={images }
                    className=" rounded-lg"
                    alt="Description of my image"
                  />
                </div>
              }
            </div>
            <button onClick={ AddGalleries} type="submit" className="flex w-1/3 justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
              Invia
            </button>
          </div>
        </div>
    </div>
  )
}

export default AddGallery
