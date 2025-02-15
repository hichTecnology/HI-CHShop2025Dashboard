import React from 'react'
interface dateTineProps{
  data : Date

}

const DataTime : React.FC<dateTineProps> =({data}) => {
  const startDateObj = new Date(data);
  return (
    <div>
      <p> {startDateObj.toLocaleDateString()}</p>
    </div>
  )
}

export default DataTime
