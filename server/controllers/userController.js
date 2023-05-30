const bcrypt = require("bcrypt")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const Organization = require("../models/organizationModel")
const { use } = require("../routes/organizationRoutes")
async function signUpHandler(req,res){
    try{
        const {username,password} = req.body
        const salt =  await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password,salt)
        await User.create({
            username:username,
            password:hashedPassword
        })
        return res.sendStatus(201)
    } catch(err){
        console.log(err.message)
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}

async function loginHandler(req,res){
    try{
        const username = req.body.username
        const password = req.body.password

        const userRecord = await User.findOne({username:username})


        if (await bcrypt.compare(password,userRecord.password)){
            console.log(userRecord,userRecord._id.toString())
            jwt.sign(
                {
                username: username,
                userId: userRecord._id.toString(),
                organizationId: userRecord.organizationId || null,
                role: userRecord.role || null
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
    } catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}

async function changeUserRoleHandler(req,res){
    try{
        const {userId,role} = req.body
        const organization = await Organization.findOne({_id:req.organizationId})
        if (organization){
            if (organization.owner === req.userId || req.role=== "admin" ){
                await User.updateOne({_id:userId},{role:role})
                return res.status(200).send({"message":"user role updated!"})
            }
        } else{
            return res.status(401).send({"message":"organization not found!"})
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}



module.exports={
    signUpHandler,
    loginHandler,
    changeUserRoleHandler
}