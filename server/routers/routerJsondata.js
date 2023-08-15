const axios=require("axios").default
const express=require("express")
const router =express.Router()

router.get("/json",(req,res)=>{
    res.render("json-data")
})

router.post("/json",(req,res)=>{
    const jsondata =req.body
    console.log(jsondata)
    res.end()
})

router.get("/json-data-direct",async(req,res)=>{
    const response=await axios.get(`${process.env.JSON_PLACE_HOLDER}/photos`)
    const data =response.data
    res.json(data)
    res.end()
})


router.get("/json-data",async(req,res)=>{
    const users =await axios.get(`${process.env.JSON_PLACE_HOLDER}/users`)
    const usersdata =users.data
    
    const todos=await axios.get(`${process.env.JSON_PLACE_HOLDER}/todos`)
    const todosdata=todos.data

    const posts=await axios.get(`${process.env.JSON_PLACE_HOLDER}/posts`)
    const postsdata =posts.data

    const albums =await axios.get(`${process.env.JSON_PLACE_HOLDER}/albums`) 
    const albumsdata =albums.data

    const userscombined=usersdata.map(user=>{
        const usertodos=todosdata.filter(todo=>user.id===todo.userId)
        const userposts=postsdata.filter(post=>user.id===post.userId)
        const useralbums =albumsdata.filter(album=>user.id===album.userId)
        return {
            ...user,
            todos:usertodos,
            posts:userposts,
            albums:useralbums
        }
    })
    // console.log(userscombined[0])
    res.json(userscombined)
})
module.exports=router