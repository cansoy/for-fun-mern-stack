import React from 'react'
import {Link,useNavigate} from "react-router-dom"
import useFetch from "../hooks/useFetch"

const GetJsonDataDirect = () => {
  const navigate=useNavigate()
  const {loading,data}=useFetch(`${import.meta.env.VITE_SERVER_PATH}/json-data-direct`)

  return (
    <div>
      <hr />
        <Link to={"/home"}>Back Home</Link>
        <br /><br />
        <button onClick={()=>navigate("/home")}>Back Home use-navigate</button>
      <hr />
      <hr />
      {
        loading ?
          ("Loading Wait Please")
        :
        (
          data.map(item=>{
            return  <ul key={Math.random()}>
                      <li>{item.albumId}</li>
                      <li>{item.title}</li>
                      <li>{item.thumbnailUrl}</li>
                      <hr />
                    </ul>
          })
        ) 
      }
    </div>
  )
}

export default GetJsonDataDirect