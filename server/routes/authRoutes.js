const express = require("express")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
require("dotenv").config()
const jwt = require("jsonwebtoken")

const router = express.Router()

// willl delete upon database logic implementation
const users = []


router.post("/signup",async (req,res)=>{
    try{
        const username = req.body.username
        const password = req.body.password
        

        const salt =  await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password,salt)

        /**
         * DATABSE LOGIC
         * CHECK IF username already exist in db
         */
        users.push({
            username:username,
            password: hashedPassword,
            userId: uuid.v4()
        })
        console.log(users)
        return res.sendStatus(201)
    } catch{
        return res.sendStatus(500)
    }

})

router.post("/login",async (req,res)=>{
    try{
        const username = req.body.username
        const password = req.body.password


        /** 
         * DATABASE LOGIC TO BE IMPLEMENTED HERE
        */ 
        const userRecord = users.find((user)=>username === user.username)


        if (await bcrypt.compare(password,userRecord.password)){
            jwt.sign(
                {
                username: username,
                userId: userRecord.userId
            },
            process.env.ACCESS_TOKEN_SECRET,
            (err,token)=>{
                if (err){
                    req.status(401).send({"message":"error creating JWT!"})
                    return
                }
                return res.status(200).send({token:token})

            }
            )
        }
        else{
            return res.status(401).send({"message":"authorization failed!"})
        }
    } catch{
        return res.sendStatus(500)
    }
})


module.exports = router