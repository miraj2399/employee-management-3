const jwt = require("jsonwebtoken")
require("dotenv").config()

async function verifyToken(payload){
    const token =  new Promise((resolve,reject)=>{
        jwt.verify(payload,process.env.ACCESS_TOKEN_SECRET,(err,token)=>
        {
            if (err) reject(err)
            else resolve(token)
        })
    })
    return token
}
async function basicAuth(req,res,next){
    try{
        if (!req.headers.authorization){
            return res.status(401).send({
                message:"No JWT provided!"
            })
        }
        const payload = req.headers.authorization.split(" ")[1]
        console.log(payload)
        const token = await verifyToken(payload)
        console.log(token)
        const {username,userId,organizationId} = token
        
        req.username =username 
        req.userId = userId 
        req.organizationId = organizationId 
        req.role = token.role
        req.moderatorPermissions = token.moderatorPermissions 
        console.log(`username: ${req.username}, userId: ${req.userId}, organizationId: ${req.organizationId}, role: ${req.role}`)
        next()
    } catch(err) {
        return res.status(401).send({
            message:"JWT tempered!",
            details: err
        })
    }
}

module.exports = basicAuth