const fs=require("fs")
const path =require("path")
const express=require("express")
const router =express.Router()

router.get("/video-recorder",(req,res)=>{
    res.render("video-recorder")
    res.end()
})

router.post("/video-recorder-post",(req,res)=>{
    const buffer =req.body
    const clientobj=JSON.parse(req.headers.clientobj)
    fs.writeFile(`./files/${clientobj.name}_${clientobj.id}.${clientobj.type}`,buffer,(err)=>{
        if (err) {
            console.log(err)
            res.end()
            return
        }
    })
})


router.get("/video-recorder-links",(req,res)=>{
    fs.readdir(path.join(__dirname,"../files"),(err,files)=>{
        if (err) {
            console.log(err)
            res.send("Error exist")
            res.end()
            return
        }
        res.json(files)
        res.end()
    })
})

router.get("/video-links/:link",(req,res)=>{
    const link =req.params.link
    console.log(link)
    fs.readFile(`./files/${link}`,(err,data)=>{
        if (err) {
            console.log(err)
            res.send("Error exist")
            return
        }
        res.send(data)
        res.end()
    })
    
})

module.exports=router