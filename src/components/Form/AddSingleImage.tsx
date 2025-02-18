import { CldImage, CldUploadWidget } from 'next-cloudinary';
import React, { useState } from 'react'

interface AddAddSingleImage {

  sendVarienteToParent: (data: string) => void;
  
  
}
const AddSingleImage : React.FC<AddAddSingleImage> = ({sendVarienteToParent}) => {
  const [resource1, setResource1] = useState<string | null>();
  return (
    <div>
      <div>
      <CldUploadWidget 
            uploadPreset="oorid-frondend"
              onSuccess={(result : any, { widget }) => {
                setResource1(result.info.url)
                sendVarienteToParent(result.info.url)
              }}
              onQueuesEnd={(result, { widget }) => {
            widget.close();
            }}
          >
            {({ open }) => {
              function handleOnClick() {
                setResource1(undefined);
                open();
              }
            return (
          <button  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-4  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          onClick={handleOnClick}>
            Immagine
          </button>
            );
            }}
          </CldUploadWidget>
          { resource1 && <CldImage 
            width="150"
            height="150"
            src={resource1 }
            alt="Description of my image"
            />}
      </div>
    </div>
  )
}

export default AddSingleImage
