import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useBlob from '../hooks/useBlob'


const FileDownload = () => {
    const [blobUrl,setBloburl]=useState(null)
    const {loading,blob}=useBlob(`${import.meta.env.VITE_SERVER_PATH}/${blobUrl}`,blobUrl)

    const fncBlobImage=()=>{
        setBloburl("file-download-blob-image")
    }

    const fncBlobVideo=()=>{
        setBloburl("file-download-blob-video")
    }

  return (
    <>
    <span>
        <Link to={"/home"}>Back Home</Link>
        <button onClick={fncBlobImage}>Show Image</button>
        <br /><br />
        <button onClick={fncBlobVideo}>Show Video</button>
    </span>
        <div className="files">
            <div className="image">
                {/* {loading ?
                    ("Loadding")
                    :
                    (<img src={blob} alt="" />)
                } */}
                <img src={blob} alt="" />
            </div>
            <div className="video">
                <video src={blob} controls></video>
            </div>
            
        </div>
    </>
  )
}

export default FileDownload