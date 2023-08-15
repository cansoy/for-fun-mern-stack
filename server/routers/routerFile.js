const fs =require("fs")
const express=require("express")
const router =express.Router()

router.get("/file",(req,res)=>{
    res.send("You Will get File From Client !!!")
})

router.post("/file",(req,res)=>{
    const buffer =req.body
    const objfile =JSON.parse(req.headers.objfile)
    fs.writeFile(`./files/${objfile.name}`,buffer,err=>{
        if (err) {
            res.json({mission:"failed",server:"side"})
            res.end()
            return
        }
        res.json({mission:"completed",server:"side"})
        res.end()
    })
})

module.exports=router