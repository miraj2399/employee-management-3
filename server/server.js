const express = require("express")
const dot = require('dotenv').config()
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const jwt = require("jsonwebtoken")
const authRoutes = require("./routes/authRoutes")
const basicAuth = require("./middleware/basicAuth")
const connectDB = require("./config/db")


const app = express()


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




const PORT = process.env.SERVER_PORT
app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is listening to port ${PORT}`)
})