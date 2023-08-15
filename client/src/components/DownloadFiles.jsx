import React from 'react'
import { useNavigate } from 'react-router-dom'


const DownloadFiles = () => {
  const navigate=useNavigate()

  const fncgetImage=async(e)=>{
    let mimetype=null
    const dataType=e.target.dataset.type
    if (dataType==="image") {
      mimetype="jpg"
    }
    if (dataType==="video") {
      mimetype="mp4"
    }
    if (dataType==="csv") {
      mimetype="csv"
    }
    if (dataType==="xlsx") {
      mimetype="xlsx"
    }
    console.log(dataType)
    const response=await fetch(`${import.meta.env.VITE_SERVER_PATH}/file/${dataType}`)
    const blob=await response.blob()
    const reader=new FileReader()
    reader.readAsDataURL(blob)
    reader.onload=()=>{
      const result =reader.result
      const a=document.createElement("a")
      a.download=`image.${mimetype}`
      a.href=result
      a.click()
    }
  }

  return (
    <>
    <span style={{margin:"10px"}}><button onClick={()=>navigate("/home")}>Back Home</button></span>
    <div className='buttons'>
      <button onClick={fncgetImage} data-type="image">Image</button>
      <button onClick={fncgetImage} data-type="video">Video</button>
      <button onClick={fncgetImage} data-type="csv">CSV</button>
      <button onClick={fncgetImage} data-type="xlsx">XLSX</button>
    </div>
    </>
  )
}

export default DownloadFiles