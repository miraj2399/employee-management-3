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
        const {username,userId} = token
        req.username =username
        req.userId = userId
        next()
    } catch(err) {
        return res.status(401).send({
            message:"JWT tempered!",
            details: err
        })
    }
}

module.exports = basicAuth