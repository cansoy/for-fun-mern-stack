import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <hr />
          <Link to={"/login"}>Logout</Link>
        <hr />
          <Link to={"/form-data"}>Form Data Upload</Link>
        <hr />
          <Link to={"/file-data"}>File Upload</Link>
        <hr />  
          <Link to={"/get-json-direct"}>Get JSON Data Direct</Link>
        <hr />
          <Link to={"/get-json"}>Get JSON</Link>
        <hr />
          <Link to={"/get-file-blob"}>Get File Blob</Link>
        <hr />
          <Link to={"/download-files"}>Download Files</Link>
        <hr />
          <Link to={"/media-devices"}>Media Devices</Link>
        <hr />
          <Link to={"/users-outlet"}>User List</Link>
    </div>
  )
}

export default Home