import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const FormData = () => {
  
  const inputName=useRef()
  const inputAge=useRef()
  const inputCity=useRef()
  const inputDate=useRef()
  const [alert,setAlert]=useState("")
  const [state,setState]=useState(false)
  const [secondata_1,setSecondata_1]=useState("Waiting-1")
  const [secondata_2,setSecondata_2]=useState("Waiting-2")

  const navigate=useNavigate()
  const fncUseNavigate=()=>navigate("/home")
  const fncSendFormdata=()=>{
    if (
      inputName.current.value==="" ||
      inputAge.current.value==="" ||
      inputCity.current.value==="" ||
      inputDate.current.value===""
      )
      {
        setAlert("Please Fill Blanks !!!")
        return
      }

      const objFormdata={
        name:inputName.current.value,
        age: inputAge.current.value,
        city:inputCity.current.value,
        date:inputDate.current.value
      }

      inputName.current.value=null
      inputAge.current.value=null
      inputCity.current.value=null
      inputDate.current.value=null
      fetch(`${import.meta.env.VITE_SERVER_PATH}/json`,{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(objFormdata)
      })
        .then(res=>{
          if (res.status===200) {
            setAlert("Mission Completed !!!")
          }
        })
    }

  return (
    <div className='form-data'>
      <div className="first-data">
        <hr />
          <Link to={"/home"}>Back Home Link</Link>
          <br />
          <br />
          <button onClick={fncUseNavigate}>Use Navigate To Back Home</button>
          <hr />
        <hr />
          <p className='alert'>{alert}</p>
        <hr />
        <p>Name</p>
        <input type="text" ref={inputName}/>
        <hr />
        <hr />
        <p>Age</p>
        <input type="number" ref={inputAge}/>
        <hr />
        <hr />
        <p>City</p>
        <select ref={inputCity}>
          <option value="ankara">Ankara</option>
          <option value="istanbul">İstanbul</option>
          <option value="gaziantep">GaziAntep</option>
          <option value="erzurum">Erzurum</option>
        </select>
        <hr />
        <hr />
        <p>Date</p>
        <input type="date" ref={inputDate}/>
        <hr />
        <hr />
        <button onClick={fncSendFormdata}>Send Me DB</button>
        <hr />
      </div>
      <div className="other-data">
        <p>{secondata_1}</p>
        <hr />
        <p>{secondata_2}</p>
        <hr />
        <hr />
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates omnis 
          iure exercitationem ullam deserunt suscipit, tempora praesentium. 
          Cupiditate, error alias minus, eius esse dolor debitis, quam doloremque quae exercitationem nemo!
          </p>
      </div>
    </div>
  )
}

export default FormData