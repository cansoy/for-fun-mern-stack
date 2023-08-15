import React, { useRef, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Mediadevices = () => {
  const navigate=useNavigate()
  const refVideo=useRef()
  const openBtn=useRef()
  const recordBtn=useRef()
  const watchBtn=useRef()
  const sendDbBtn=useRef()
  const getVideoFromDbBtn=useRef()
  const [videolist,setVideolist]=useState([])

  let videoStream=null
  let mediaRecorder=null
  let blobOfChunk=[]

  const fncOninputEvents=(e)=>{
    const file =e.target.files[0]
    const objfile ={
      name:file.name,
      size:file.size,
      type:file.type
    }
    const reader=new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend=()=>{
      const result=reader.result
      console.log(result)
    }

  }

  const fncOpenCamera=async()=>{
    // refVideo.current.setAttribute("autoplay",true) //doesnt work
    // refVideo.current.setAttribute("muted",true)    //doesnt work
    videoStream=null
    mediaRecorder=null
    blobOfChunk=[]
    refVideo.current.srcObject=null
    openBtn.current.style.backgroundColor="red"
    watchBtn.current.style.backgroundColor="thistle"
    
    refVideo.current.muted=true
    refVideo.current.autoplay=true
    refVideo.current.controls=false
    const stream =await navigator.mediaDevices.getUserMedia({video:true,audio:true})
    videoStream=stream
    refVideo.current.srcObject=videoStream
  }

  const fncStartRecord=()=>{
    if (!videoStream) return
    recordBtn.current.style.backgroundColor="red"
    mediaRecorder=new MediaRecorder(videoStream,{mimeType:"video/webm"}) //mimeType doent support video/mp4 ***
    mediaRecorder.start(1000)
    mediaRecorder.ondataavailable=(e)=>{
      if (e.data.size>0) {
        // console.log(e.data)
        blobOfChunk.push(e.data)
        // console.log(blobOfChunk)
      }
    }
    mediaRecorder.onstop=(e)=>{
      refVideo.current.srcObject=null
      openBtn.current.style.backgroundColor="thistle"
      recordBtn.current.style.backgroundColor="thistle"
      const blob =new Blob(blobOfChunk,{type:"video/mp4"})
      const readerVideo=new FileReader()
      readerVideo.readAsDataURL(blob)
      readerVideo.onloadend=()=>{
        const result =readerVideo.result
        refVideo.current.src=result
        refVideo.current.controls=true
        refVideo.current.autoplay=false
        refVideo.current.muted=false
      }
    }
  }

  const fncStopAndWatch=()=>{
    if (!mediaRecorder) return
    watchBtn.current.style.backgroundColor="red"
    mediaRecorder.stop()
  }

  const fncSendVideoDb=()=>{
    if (!mediaRecorder)  return
    sendDbBtn.current.style.backgroundColor="red"
    const blob =new Blob(blobOfChunk,{type:"video/mp4"})
    const clientobj={
      id:new Date().getTime(),
      name:"video_",
      type:"mp4"
    }
    const reader =new FileReader()
    reader.readAsArrayBuffer(blob)
    reader.onloadend=()=>{
      const result =reader.result
      fetch(`${import.meta.env.VITE_SERVER_PATH}/video-recorder-post`,{
        method:"POST",
        headers:{
          "content-type":"application/octet-stream",
          "clientobj":JSON.stringify(clientobj) 
        },
        body:result
      })
        .then(res=>{
          console.log(res)
        })
    }
  }

  const fncgetVideos=async()=>{
    const response =await fetch(`${import.meta.env.VITE_SERVER_PATH}/video-recorder-links`)
    const links=await response.json()
    setVideolist(links)
  }

  const fncPlayVideo=async(e)=>{
    const item=e.target.textContent
    const type =item.split(".")[1]
    if (type!=="mp4") return
    refVideo.current.src=null
    refVideo.current.srcObject=null
    refVideo.current.controls=true
    refVideo.current.autoplay=false
    refVideo.current.muted=false
    const respose=await fetch(`${import.meta.env.VITE_SERVER_PATH}/video-links/${item}`)
    const blob =await respose.blob()
    const reader =new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend=()=>{
      const result=reader.result
      const first=result.split("data:application/octet-stream")[1]
      const videosrc="data:video/mp4".concat(first)
      refVideo.current.src=videosrc
    }
  }

  return (
    <div>
      <Link to={"/home"}>Back Home Link !</Link>
      <button onClick={()=>navigate("/home")}>Back Home Navigate</button>
        <p>Load Video</p>
        <input type="file" onInput={fncOninputEvents}/>
        <hr />
        <button onClick={fncOpenCamera} ref={openBtn} >Open Camera</button>
        <button onClick={fncStartRecord} ref={recordBtn}>Start Record</button>
        <button onClick={fncStopAndWatch} ref={watchBtn}>Watch Video</button>
        <button onClick={fncSendVideoDb} ref={sendDbBtn}>Send DB Video</button>
        <button onClick={fncgetVideos} ref={getVideoFromDbBtn}>Get Video Sended DB</button>
        <video src="" className='video' ref={refVideo}></video>
        <div className="video-list">
          {
            videolist.map(item=>{
              return <ul key={Math.random()}>
                      <br />
                      <li onClick={fncPlayVideo} style={{cursor:"pointer"}}>{item}</li>
                      <br />
                    </ul>
            })
          }
        </div>
    </div>
  )
  
}

export default Mediadevices