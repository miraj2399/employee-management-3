const express = require("express")
require("dotenv").config()
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const jwt = require("jsonwebtoken")
const authRoutes = require("./routes/authRoutes")
const basicAuth = require("./middleware/basicAuth")


const app = express()

//middlewares
app.use(express.json())
app.use('/users',authRoutes)


/** 
const posts = []
app.get("/posts",basicAuth,(req,res)=>{
    try{
        const filteredPosts = posts.filter((post)=>post.userId==req.userId)
        return res.status(200).send(filteredPosts)
    }
    catch{
        return res.sendStatus(500)
    }
})

app.post("/posts",basicAuth,(req,res)=>{
    try{
        const title = req.body.title
        const content = req.body.content
        
        posts.push({
            userId:req.userId,
            title: title,
            content: content
        })
        return res.sendStatus(201)
    } catch{
        return res.sendStatus(500)
    }
})

*/





app.listen(3006)