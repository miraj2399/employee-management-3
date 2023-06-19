// create empty functions for all the routes you need to implement
const Employee = require("../models/employeeModel")
const TimeRecord = require("../models/timeRecordModel")

async function getAllTimeRecordsHandler(req,res){
    try{
        const organizationId = req.organizationId
        if (!organizationId){
            return res.status(400).send({message:"organizationId is required!"})
        }
        else{
            const timeRecords = await TimeRecord.find({organizationId:organizationId}).populate({
                path:"employee",
                select:"firstName lastName employeeNumber hourlyRate",
            })

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

async function getLatestTimeRecords(organizationId,days){
    const timeRecords = await TimeRecord.find({organizationId:organizationId}).sort({clockIn:-1}).limit(days).populate({
        path:"employee",
        select:"firstName lastName employeeNumber",
    })
    return timeRecords
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
            const timeRecords = await getLatestTimeRecords(organizationId,days)
            return res.status(200).send(timeRecords)
        }}
    catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}

async function searchTimeRecords(organizationId, startDate, endDate) {
    const query = TimeRecord.find({
      organizationId: organizationId,
      clockIn: { $gt: new Date(startDate), $lt: new Date(endDate) }
    });
  
    const timeRecords = await query.exec();
    return timeRecords;
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
    // handle multiple timeRecords

    const organizationId = req.organizationId
    const timeRecords = req.body
    try{
        if (!organizationId){
            return res.status(400).send({message:"organizationId is required!"})
        }
        else{
            /*
            * check if employee exists
            */
            for (let i = 0; i < timeRecords.length; i++){
                const employeeExists = await Employee.findById(timeRecords[i].employee)
                if (!employeeExists){
                    console.log("employee not found!")
                    return res.status(404).send({message:"employee not found!"})
                }
                /*
                * check if clockIn is before clockOut
                */
                if (timeRecords[i].clockIn > timeRecords[i].clockOut){
                    console.log("clockIn must be before clockOut!")
                     return res.status(400).send({message:"clockIn must be before clockOut!"})
                }
                /*
                * check any records that overlap with the new record
                */
                const records = await TimeRecord.find({employee:timeRecords[i].employee,organizationId:organizationId,clockIn:{$lte:timeRecords[i].clockOut},clockOut:{$gte:timeRecords[i].clockIn}})
                if (records.length > 0){
                    console.log("timeRecord overlaps with existing record!")
                    return res.status(400).send({message:"timeRecord overlaps with existing record!"})
                }
                timeRecords[i].organizationId = organizationId
            }
            console.log(timeRecords)
            const newTimeRecords = await TimeRecord.insertMany(timeRecords)
            return res.status(200).send(newTimeRecords)
        }
    } catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }


/*
    const organizationId = req.organizationId
    const {clockIn,clockOut,employee,description} = req.body
    console.log(req.body)
    try{
        if (!organizationId){
            return res.status(400).send({message:"organizationId is required!"})
        }
        else{
            
            const employeeExists = await Employee.findById(employee)
            if (!employeeExists){
                console.log("employee not found!")
                return res.status(404).send({message:"employee not found!"})
            }
            
            if (clockIn > clockOut){
                console.log("clockIn must be before clockOut!")
               return res.status(400).send({message:"clockIn must be before clockOut!"})
            }

           
            const records = await TimeRecord.find({employee:employee,organizationId:organizationId,clockIn:{$lte:clockOut},clockOut:{$gte:clockIn}})
            if (records.length > 0){
                console.log("timeRecord overlaps with existing record!")
                return res.status(400).send({message:"timeRecord overlaps with existing record!"})
            }


                
            const newTimeRecord = await TimeRecord.create({
                clockIn:clockIn,
                clockOut:clockOut,
                employee:employee,
                description:description,
                organizationId:organizationId
            })
            return res.status(200).send(newTimeRecord)
        }
    } catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    } */

}

async function updateTimeRecordByIdHandler(req,res){
    const id = req.params.id
    const organizationId = req.organizationId
    const {clockIn,clockOut,employee,description} = req.body
    try{
        if (!organizationId){
            return res.status(400).send({message:"organizationId is required!"})
        }
        else{
            const updatedTimeRecord = await TimeRecord.findByIdAndUpdate(id,{
                clockIn:clockIn,
                clockOut:clockOut,
                employee:employee,
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
    getLatestTimeRecords,
    searchTimeRecords,
    searchTimeRecordsHandler,
    postTimeRecordsHandler,
    updateTimeRecordByIdHandler,
    deleteTimeRecordByIdHandler,
    deleteMultipleTimeRecordsHandler
}
