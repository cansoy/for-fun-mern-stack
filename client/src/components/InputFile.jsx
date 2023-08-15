import React, { useRef, useState } from 'react'
import {Link,useNavigate} from "react-router-dom"

const InputFile = () => {
    const refInput =useRef()
    const refButton=useRef()
    const navigate=useNavigate()
    const [state,setState]=useState(false)
    const [visibility,setVisibility]=useState("hidden")
    const [resultoffile,setResultoffile]=useState("")

    const fncUsenavigate=()=>navigate("/home")

    const fncOnchangeInput =()=>{
        const file =refInput.current.files[0]
        if (!file) return
        setVisibility("visible")
    }

    const fncSendFileToDb=()=>{
        const file =refInput.current.files[0]
        const reader =new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload=()=>{
            const objfile ={
                name:file.name,
                size:file.size,
                type:file.type,
                mimetype:file.type.split("/")[1]
            }
            const result =reader.result
            fetch("http://127.0.0.1:3000/file",{
                method:"POST",
                headers:{
                    "content-type":"application/octet-stream",
                    "name":"muhammedcansoy",
                    "objfile":JSON.stringify(objfile)
                },
                body:result
            })
                .then(res=>{
                    if (res.status===200) {
                        refInput.current.value=null
                        setResultoffile("File Sended !!!")
                        setVisibility("hidden")
                    }
                })
        }
    }
    

  return (
    <div className='input-file'>
        <hr />
            <Link to={"/home"}>Back Home</Link>
            <br /><br />
            <button onClick={fncUsenavigate}>Back Home</button>
        <hr />
            <p>{resultoffile}</p>
        <hr />
            <input onInput={fncOnchangeInput} type="file" ref={refInput}/>
        <hr />
            <button onClick={fncSendFileToDb} ref={refButton} style={{visibility:visibility}}>Send Me Server !</button>
        <hr />
    </div>
  )
}

export default InputFile