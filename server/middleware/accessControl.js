function accessControl(functionality,access){
    return (req,res,next) => {

        if(req){
            console.log(req.role)
            if(req.role === "admin"|| req.role === "owner"){
                next()
            }else{
                if(req.role=="moderator" && req.moderatorPermissions[functionality] === access){
                    next()
                }else{
                    res.status(401).send("Unauthorized")
                }
            }
        }else{
            res.status(401).send("Unauthorized")
        }
    }
}

module.exports = accessControl