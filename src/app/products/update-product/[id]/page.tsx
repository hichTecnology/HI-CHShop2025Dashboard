import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import React from 'react'

const page : React.FC = () =>  {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="View products" />
      <div>
        update product
      </div>
    </DefaultLayout>
    
  )
}

export default page