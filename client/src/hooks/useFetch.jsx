import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
    // console.log(url)
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)

    useEffect(()=>{
        const controller=new AbortController()
        const signal=controller.signal
        fetch(url,{signal:signal})
            .then(res=>res.json())
            .then(json=>{
                setLoading(false)
                setData(json)
            })
        return ()=>{
            // console.log(signal.aborted)
            controller.abort()
            // console.log(signal.aborted)
        }
    },[url])

    return {loading,data}
}

export default useFetch