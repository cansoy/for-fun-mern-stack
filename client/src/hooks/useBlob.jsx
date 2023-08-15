import React, { useEffect, useState } from 'react'

const useBlob = (url,blobpath) => {
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(true)
    const [blob,setBlod]=useState(null)

    useEffect(()=>{
        if (!blobpath) return
        const controller=new AbortController()
        const signal=controller.signal
        fetch(url,{signal:signal})
            .then(res=>res.blob())
            .then(data=>{
                const reader=new FileReader()
                reader.readAsDataURL(data)
                reader.onload=()=>{
                    const result =reader.result
                    setLoading(false)
                    if (blobpath==="file-download-blob-video") {
                       const first= result.split("data:application/octet-stream")[1]
                       const video="data:video/mp4".concat(first)
                       setBlod(video)
                    }
                    else{
                        setBlod(result)
                    }
                    
                }
            })

        return ()=>{
            // console.log(signal.aborted)
            controller.abort()
            // console.log(signal.aborted)
        }
    },[url])


  return {loading,blob}
}

export default useBlob