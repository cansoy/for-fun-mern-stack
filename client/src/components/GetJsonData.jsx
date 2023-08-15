import React from 'react'
import useFetch from '../hooks/useFetch'
import {Link,useNavigate} from "react-router-dom"

const GetJsonData = () => {
  const navigate=useNavigate()
  const {loading,data}=useFetch(`${import.meta.env.VITE_SERVER_PATH}/json-data`)
  return (
    <div>
      <hr />
        <Link to={"/home"}> Back Home </Link>
        <br /><br />
        <button onClick={()=>navigate("/home")}>Back Home Button</button>
      <hr />
      <button>Combine All Users</button>
      {
        loading ? 
          ("Loading....")
                :
          (
            data.map(user=>{
              return <ul key={Math.random()}>
                        <li style={{background:"black",color:"white"}}>{user.id}</li>
                        <li>{user.name}</li>
                        <li>{user.username}</li>
                        {
                          user.todos.map(todo=>{
                            return <ul key={Math.random()}>
                                    <li>{todo.title}</li>
                                    <li>{todo.completed ? (<span style={{background:"green"}}>Completed</span>) :(<span style={{background:"red"}}>Waiting To Complete</span>)}</li>
                                  </ul>
                          })
                        }
                        {
                          user.posts.map(post=>{
                            return <ul key={Math.random()}>
                                      <li style={{background:"thistle"}}>{post.title}</li>
                                    </ul>
                          })
                        }
                        <hr /> 
                    </ul>
            })
          )
      }
    </div>
  )
}

export default GetJsonData