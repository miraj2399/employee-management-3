const {Organization,OrganizationJoin} =  require('../models/organizationModel')
const User = require('../models/userModel')

async function createOrganizationHandler(req, res) {
    
    const {name,address} = req.body
    try{
        const newOrganization = await Organization.create({
            name:name,
            address:address,
            owner:req.userId
        })
        const organizationId = newOrganization._id.toString()
        const userId = req.userId
        const role = "owner"
        // update user record with organizationId and role
        const updatedUser = await User.findByIdAndUpdate(userId,
            {
                $set:{
                    organizationId:organizationId,
                    role:role
                }

            })

        //return new organization without the owner field
        return res.status(201).send({organizationId:organizationId,name:name,address:address})


    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
  }
  

async function getOrganizationByNameHandler(req,res){
    try{
        const name = req.params.name
        const organization = await Organization.findOne({name:name})
        return res.status(200).send(organization)
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}

async function getAvailablePermissionsHandler(req,res){
    try{
        const userId = req.userId
        const organizationId = req.organizationId
        if (!userId || !organizationId){
            return res.status(400).send({message:"userId and organizationId are required!","details":"you probably are not using the updated token!"})
        }
        if (req.role == "owner" || req.role == "admin"){
            return res.status(200).send({"message":"all permissions are available!"})
        }
        else if (req.role == "moderator"){
            const moderator = await User.findOne({_id:userId})
            return res.status(200).send({
                    "userId": moderator._id,
                    "moderatorPermissions": moderator.moderatorPermissions
                })
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}

async function requestJoinOrganizationHandler(req,res){
    const {organizationId} = req.body
    try{
        const newJoinRequest = await OrganizationJoin.create({
            organizationId:organizationId,
            userId:req.userId
        })
        return res.status(201).send(newJoinRequest)
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }

}


// write a function so that owner or admin can view all join requests
async function getAllJoinRequestsHandler(req,res){
    try{ 
        const organizationId = req.organizationId
        if (!organizationId){
            return res.status(400).send({message:"organizationId is required!","details":"you probably are not using the updated token!"})
        }
        else{
            const joinRequests = await OrganizationJoin.find({organizationId:organizationId})
            return res.status(200).send(joinRequests)
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }

}

async function approveJoinRequestHandler(req,res){
    try{
        const {_id,organizationId,userId,approved,rejected} = req.body
        if (req.organizationId===organizationId){
            if (approved&&rejected){
                return res.status(400).send({message:"approved and rejected cannot be true at the same time!"})
            }
            if (approved){
                 await User.findByIdAndUpdate(userId,
                    {
                        $set:{
                            organizationId:organizationId,
                            role:"moderator"
                        }
                    })

                await OrganizationJoin.findByIdAndUpdate(_id,
                    {
                        $set:{
                            approved:true,
                            rejected:false
                        }
                    })

                return res.status(200).send({message:"approved!"})
            }
            if (rejected){
                await OrganizationJoin.findByIdAndUpdate(_id,
                    {
                        $set:{
                            approved:false,
                            rejected:true
                        }
                    })

                return res.status(200).send({message:"rejected!"})
            }
                
    
    }
    else{
        return res.status(401).send({message:"unauthorized!"})
    }
} catch(err){
    console.log(err)
    return res.status(500).send({message:err.message})
}
}


const updatePermissionsHandler = async (req,res) => {
    try{
        
        const {userId,moderatorPermissions} = req.body
        const moderator = await User.findOne({_id:userId})
        if (!moderator){
            return res.status(400).send({message:"invalid userId!"})
        }
        if (req.organizationId.toString()!==moderator.organizationId.toString()){
            return res.status(401).send({message:"unauthorized!",details:"you are not a owner or ammin of this organization!"})
        }
        else{
            const updatedModerator = await User.findOneAndUpdate({_id:userId},
                {
                    moderatorPermissions:moderatorPermissions
                },
                {
                    // by default old record is returned, we want the new record
                    new:true
                    }
                )
            return res.status(200).send({
                "userId": updatedModerator._id,
                "moderatorPermissions": updatedModerator.moderatorPermissions
            })
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}



module.exports={
    createOrganizationHandler,
    getOrganizationByNameHandler,
    getAvailablePermissionsHandler,
    requestJoinOrganizationHandler,
    getAllJoinRequestsHandler,
    approveJoinRequestHandler,
    updatePermissionsHandler
   
}
