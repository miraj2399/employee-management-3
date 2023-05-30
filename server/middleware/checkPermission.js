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
async function checkPermission(functionality,accessLevel){

    return async function(req,res,next){
        try{
            const token = await verifyToken(req.body.token)
            const {moderatorPermissions,role} = token

            if (role === "admin"){
                next()
                return
            }
            if (role === "moderator"){
                if (moderatorPermissions[functionality][accessLevel]){
                    next()
                    return
                }
                else{
                    return res.status(401).send({
                        message: "You are not authorized to perform this action!"
                    })
                }
            }

        }
        catch(err){
            return res.status(401).send({
                message: err.message
        }
        )}
    }
}
