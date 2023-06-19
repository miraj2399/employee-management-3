const RevenueRecord = require("../models/revenueRecordModel")

async function getAllRevenueRecordsHandler(req,res){
    try{
        const organizationId = req.organizationId
        if (!organizationId){
            return res.status(400).send({message:"organizationId is required!"})
        }
        else{
            const revenueRecords = await RevenueRecord.find({organizationId:organizationId})
            return res.status(200).send(revenueRecords)
        }
    } catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}

async function getRevenueRecordByIdHandler(req,res){
    const id = req.params.id
    const organizationId = req.organizationId
    try{
        const revenueRecord = await RevenueRecord.findOne({_id:id,organizationId:organizationId})
        if (!revenueRecord){
            return res.status(404).send({message:"revenue record not found!"})
        }
        return res.status(200).send(revenueRecord)
    } catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}

async function getLatestRevenueRecords(organizationId,days){
    const revenueRecords = await RevenueRecord.find({organizationId:organizationId}).sort({date:1}).limit(days)
    return revenueRecords
}


async function getLatestRevenueRecordsHandler(req,res){
   const days = req.params.days
    const organizationId = req.organizationId
    try{
        if (!organizationId){
            return res .status(400).send({message:"organizationId is required!"})
        }
        else{
            const revenueRecords = await getLatestRevenueRecords(organizationId,days)
            return res.status(200).send(revenueRecords)
        }
    } catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}


async function searchRevenueRecordsHandler(req,res){
    const {startDate,endDate} = req.body
    console.log(startDate,endDate)
    const organizationId = req.organizationId
    try{
        if (!organizationId){
            return res.status(400).send({message:"organizationId is required!"})
        }
        const revenues = await RevenueRecord.find({organizationId:organizationId,date:{$gte: new Date(startDate)
            ,$lte:new Date(endDate)}})
        return res.status(200).send(revenues)
    } catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}

async function createRevenueRecordHandler(req,res){
    try{
        const {amount, date,description} = req.body
        console.log(amount,date,description)
        const organizationId = req.organizationId
        if (!organizationId){
            return res.status(400).send({message:"organizationId is required!"})
        }
        const newRevenueRecord = await RevenueRecord.create({
            amount:amount,
            date:date,
            organizationId:organizationId,
            description:description
        })
        return res.status(201).send(newRevenueRecord)
    } catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}

async function updateRevenueRecordByIdHandler(req,res){
    try{
        const id = req.params.id
        const {revenue, date,description} = req.body
        const organizationId = req.organizationId
        if (!organizationId){
            return res.status(400).send({message:"organizationId is required!"})
        }
        const updatedRevenueRecord = await RevenueRecord.findByIdAndUpdate(id,{
            revenue:revenue,
            date:date,
            organizationId:organizationId,
            description:description
        },{new:true})
        if (!updatedRevenueRecord){
            return res.status(404).send({message:"revenue record not found!"})
        }
        return res.status(200).send(updatedRevenueRecord)
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}

async function deleteRevenueRecordByIdHandler(req,res){
    try{
        const id = req.params.id
        const organizationId = req.organizationId
        if (!organizationId){
            return res.status(400).send({message:"organizationId is required!"})
        }
        await RevenueRecord.findByIdAndDelete(id)
        return res.status(200).send({message:"revenue record deleted successfully"})
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}

async function deleteMultipleRevenueRecordsHandler(req,res){
    try{
        const ids = req.body.map((records)=>records._id)
        const organizationId = req.organizationId
        if (!organizationId){
            return res.status(400).send({message:"organizationId is required!"})
        }
        await RevenueRecord.deleteMany({_id:{$in:ids}})
        return res.status(200).send({message:"revenue records deleted successfully"})
    } catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}

module.exports={
    getAllRevenueRecordsHandler,
    getRevenueRecordByIdHandler,
    getLatestRevenueRecords,
    getLatestRevenueRecordsHandler,
    searchRevenueRecordsHandler,
    createRevenueRecordHandler,
    updateRevenueRecordByIdHandler,
    deleteRevenueRecordByIdHandler,
    deleteMultipleRevenueRecordsHandler
}