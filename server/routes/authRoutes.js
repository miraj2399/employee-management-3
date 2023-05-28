const express = require("express")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const router = express.Router()


router.post("/signup",async (req,res)=>{
    try{
        const username = req.body.username
        const password = req.body.password
        

        const salt =  await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password,salt)
        await User.create({
            username:username,
            password:hashedPassword
        })
        return res.sendStatus(201)
    } catch(err){
        console.log(err.message)
        return res.status(500).send({message:err.message})
    }

})

router.post("/login",async (req,res)=>{
    try{
        const username = req.body.username
        const password = req.body.password


        /** 
         * DATABASE LOGIC TO BE IMPLEMENTED HERE
        */ 
        const userRecord = await User.findOne({username:username})


        if (await bcrypt.compare(password,userRecord.password)){
            jwt.sign(
                {
                username: username,
                userId: userRecord._id
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