import React from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'

import Login from "./components/Login"
import Home from './components/Home'
import InputFile from './components/InputFile'
import FormData from './components/FormData'
import GetJsonData from './components/GetJsonData'
import GetJsonDataDirect from "./components/GetJsonDataDirect"
import FileDownload from "./components/FileDownload"
import DownloadFiles from "./components/DownloadFiles"
import Mediadevices from "./components/Mediadevices"
import Users from "./components/Users"
import Usersadd from "./components/Usersadd"
import Usersdelete from "./components/Usersdelete"
import Userstodos from "./components/Userstodos"
import Usersalbums from "./components/Usersalbums"
import User from './components/User'

const App = () => {
  return (
    <>
      <Routes>
        {/* *********************************************************** */}
        <Route path='/' element={<Navigate to={"/home"}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        {/* *********************************************************** */}
        <Route path='/form-data' element={<FormData/>}/>
        <Route path='/file-data' element={<InputFile/>}/>
        {/* *********************************************************** */}
        <Route path='/get-json-direct' element={<GetJsonDataDirect/>}/>
        <Route path='/get-json' element={<GetJsonData/>}/>
        {/* *********************************************************** */}
        <Route path='/get-file-blob' element={<FileDownload/>}/>
        {/* *********************************************************** */}
        <Route path='/download-files' element={<DownloadFiles/>}/>
        {/* *********************************************************** */}
        <Route path='/media-devices' element={<Mediadevices/>}/>
        {/* *********************************************************** */}
        <Route  path='/users-outlet' element={<Users/>}> 
          <Route path='add' element={<Usersadd/>}/>
          <Route path='delete' element={<Usersdelete/>}/>
          <Route path='todos' element={<Userstodos/>}/>
          <Route path='albums' element={<Usersalbums/>}/>
          <Route path=':userid' element={<User/>}/>
        </Route> 
      {/* *********************************************************** */}
      </Routes>
    </>
  )
}

export default App