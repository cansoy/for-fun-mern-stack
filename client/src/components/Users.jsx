import React, { useEffect } from 'react'
import { useState } from 'react'
import { Outlet,Link,useNavigate } from 'react-router-dom'

const Users = () => {
  const navigate=useNavigate()
  const [users,setUsers]=useState([])
  const [id,setId]=useState(0)

  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res=>res.json())
      .then(data =>{
        setUsers(data)
      })
  },[])

  const fncSetUserId=(e)=>{
    setId(e.target.textContent)
  }

  return (
    <div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
         Tempore dolor recusandae exercitationem consequatur esse distinctio
          tenetur ipsum deserunt debitis eaque cum in, impedit aperiam? Laudantium
           consequatur tempore labore est autem.
          </p>
      <hr />
        <button onClick={()=>navigate("/home")}>Back Home</button>
      <hr />
      {
        users.map(user=>{
          return <ul key={Math.random()}>
                  <li onClick={fncSetUserId} style={{cursor:"pointer"}}>{user.id}</li>
                  <li>{user.name}</li>
                  <li>{user.username}</li>
                </ul>
        })
      }
      <hr />
      <hr />
        <Link to={"/users-outlet/add"}>Add</Link>
        <br />
        <Link to={"/users-outlet/delete"}>Delete</Link>
        <br />
        <Link to={"/users-outlet/todos"}>User Todos</Link>
        <br />
        <Link to={"/users-outlet/albums"}>User Albums</Link>
        <br />
        <Link to={`/users-outlet/${id}`}>User Data</Link>
        <br />
      <hr />
      <hr />
      <Outlet/>
    </div>
  )
}

export default Users