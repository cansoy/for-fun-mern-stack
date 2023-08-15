const fs=require("fs")
const express=require("express")
const router=express.Router()

router.get("/file-download-blob-image",(req,res)=>{
    fs.readFile("./files/pic (1).jpg",(err,data)=>{
        if (err) {
            res.json({mission:"error"})
            return  
        }
        res.send(data)
        res.end()
    })
})

router.get("/file-download-blob-video",(req,res)=>{
    fs.readFile("./files/video (1).mp4",(err,data)=>{
        if (err) {
            res.json({mission:"error"})
            return  
        }
        res.send(data)
        res.end()
    })
})


router.get("/file/:type",(req,res)=>{
    const type=req.params.type
    if (type==="image") {
        fs.readFile("./files/pic (1).jpg",(err,data)=>{
            if (err) {
                console.log("error exist")
                return
            }
            res.send(data)
            res.end()
        })
    }
    if (type==="video") {
        fs.readFile("./files/video (1).mp4",(err,data)=>{
            if (err) {
                console.log("error exist")
                return
            }
            res.send(data)
            res.end()
        })
    }
    if (type==="csv") {
        fs.readFile("./files/csv.csv",(err,data)=>{
            if (err) {
                console.log("error exist")
                return
            }
            res.send(data)
            res.end()
        })
    }

    if (type==="xlsx") {
        fs.readFile("./files/xlsx.xlsx",(err,data)=>{
            if (err) {
                console.log("error exist")
                return
            }
            res.send(data)
            res.end()
        })
    }
    
})

module.exports=router