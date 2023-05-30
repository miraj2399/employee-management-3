const jwt = require("jsonwebtoken")
require("dotenv").config()

function verifyToken(payload){
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
        const token = await verifyToken(req.body.token)
        const {username,userId,organizationId} = token
        
        req.username =username || null
        req.userId = userId || null,
        req.organizationId = organizationId || null,
        req.role = token.role|| null
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