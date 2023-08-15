const express=require("express")
const router=express.Router()


router.get("/",(req,res)=>{
    res.send("Here We Are Home Page")
})

module.exports=router
