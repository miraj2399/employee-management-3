const User = require("../models/userModel")
function accessControl(functionality,access){
    return async (req,res,next) => {

        try{
            if(req.role === "admin"|| req.role === "owner"){
                next()
            }else if(req.role === "moderator"){
                console.log("checking moderator permissions")
                    const moderator = await User.findOne({_id:req.userId})
                    if (moderator["moderatorPermissions"][functionality][access]){
                    next()
                    }
                    else{
                    return res.status(401).send("Unauthorized")
                }
            }
        }
        catch(err){
            console.log(err)
            return res.status(500).send({message:err.message})
        }
    }
}

module.exports = accessControl