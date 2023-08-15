const fs =require("fs")
const path =require("path")
require("dotenv").config()
const express=require("express")
const server =express()
const cors=require("cors")
// *****************************************************************************************************
const routerHome =require("./routers/routerHome")
const routerJsondata=require("./routers/routerJsondata")
const routerFile =require("./routers/routerFile")
const routerDownloadFile=require("./routers/routerDownloadFile")
const routerVideoRecorder=require("./routers/routerVideoRecorder")
// *****************************************************************************************************
server.set("view engine","ejs")
server.set("views",path.join(__dirname,"./views"))
// *****************************************************************************************************
server.use(cors())
server.use(express.raw({type:"application/octet-stream",limit:"100mb"}))
server.use(express.json({limit:"50mb"}))
// *****************************************************************************************************
server.use("/",routerHome)
server.use("/",routerJsondata)
server.use("/",routerFile)
server.use("/",routerDownloadFile)
server.use("/",routerVideoRecorder)
// *****************************************************************************************************
server.listen(3000,()=>{
    console.log("*******************************************")
})