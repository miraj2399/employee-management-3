// create empty functions for all the routes you need to implement
const TimeRecord = require("../models/timeRecordModel")

async function getAllTimeRecordsHandler(req,res){
    try{
        const organizationId = req.organizationId
        if (!organizationId){
            return res.status(400).send({message:"organizationId is required!"})
        }
        else{
            const timeRecords = await TimeRecord.find({organizationId:organizationId})
            return res.status(200).send(timeRecords)
        }
    } catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}

async function getTimeRecordByIdHandler(req,res){
    const id = req.params.id
    const organizationId = req.organizationId
    try{
        if (!organizationId){
            return res.status(400).send({message:"organizationId is required!"})
        }
        else{
            const timeRecord = await TimeRecord.findOne({_id:id,organizationId:organizationId})
            if (!timeRecord){
                return res.status(404).send({message:"timeRecord not found!"})
            }
            return res.status(200).send(timeRecord)
        }} catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
        }
}

async function getLatestTimeRecordsHandler(req,res){
    const days = req.params.days
    const organizationId = req.organizationId
    try{
        if (!organizationId){
            return res.status(400).send({message:"organizationId is required!"})
        }
        else{
            if (!days){
                days = 7
            }
            const timeRecords = await TimeRecord.find({organizationId:organizationId}).sort({clockIn:-1}).limit(days)
            return res.status(200).send(timeRecords)
        }}
    catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}

async function searchTimeRecordsHandler(req,res){
    const {startDate,endDate} = req.body
    const organizationId = req.organizationId
    try{
        if (!startDate || !endDate|| !organizationId){
            res.status(400).send({message:"startDate, endDate, and organizationId are required!"})
        }
        else{
            const records = await TimeRecord.find({organizationId:organizationId,clockIn:{$gte: new Date(startDate),$lte: new Date(endDate)}})
            return res.status(200).send(records)       
    }
    } catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}

async function postTimeRecordsHandler(req,res){
    const organizationId = req.organizationId
    const {clockIn,clockOut,employeeId,description} = req.body
    try{
        if (!organizationId){
            return res.status(400).send({message:"organizationId is required!"})
        }
        else{
            const newTimeRecord = await TimeRecord.create({
                clockIn:clockIn,
                clockOut:clockOut,
                employeeId:employeeId,
                description:description,
                organizationId:organizationId
            })
            return res.status(200).send(newTimeRecord)
        }
    } catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }

}

async function updateTimeRecordByIdHandler(req,res){
    const id = req.params.id
    const organizationId = req.organizationId
    const {clockIn,clockOut,employeeId,description} = req.body
    try{
        if (!organizationId){
            return res.status(400).send({message:"organizationId is required!"})
        }
        else{
            const updatedTimeRecord = await TimeRecord.findByIdAndUpdate(id,{
                clockIn:clockIn,
                clockOut:clockOut,
                employeeId:employeeId,
                description:description,
                organizationId:organizationId
            },{new:true})
            if (!updatedTimeRecord){
                return res.status(404).send({message:"timeRecord not found!"})
            }
            return res.status(200).send(updatedTimeRecord)
        }
    } catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}

async function deleteTimeRecordByIdHandler(req,res){
    const id = req.params.id
    const organizationId = req.organizationId
    try{
        if (!organizationId){
            return res.status(400).send({message:"organizationId is required!"})
        }
        else{
            const deletedTimeRecord = await TimeRecord.findByIdAndDelete(id)
            if (!deletedTimeRecord){
                return res.status(404).send({message:"timeRecord not found!"})
            }
            return res.status(200).send(deletedTimeRecord)
        }
    } catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}

async function deleteMultipleTimeRecordsHandler(req,res){
    const organizationId = req.organizationId
    const ids = req.body.map((records)=>records._id)
    try{
        if (!organizationId){
            return res.status(400).send({message:"organizationId is required!"})
        }
        else{
            const deletedTimeRecords = await TimeRecord.deleteMany({_id:{$in:ids}})
            return res.status(200).send(deletedTimeRecords)
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}

module.exports={
    getAllTimeRecordsHandler,
    getTimeRecordByIdHandler,
    getLatestTimeRecordsHandler,
    searchTimeRecordsHandler,
    postTimeRecordsHandler,
    updateTimeRecordByIdHandler,
    deleteTimeRecordByIdHandler,
    deleteMultipleTimeRecordsHandler
}
