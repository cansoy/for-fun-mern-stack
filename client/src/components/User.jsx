import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
  const {userid}=useParams()
  console.log(userid)
  return (
    <div> 
      <p>User</p>
      <hr />
      <p>{userid}</p>
    </div>
  )
}

export default User