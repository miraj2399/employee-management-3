
const Employee = require("../models/employeeModel")
const Organization = require("../models/organizationModel")

async function getAllEmployeesHandler(req,res){
    const organizationId = req.organizationId
    if (!organizationId){
        return res.status(400).send({message:"organizationId is required!"})
    }
    else{
        const employees = await Employee.find({organizationId:organizationId})
        return res.status(200).send(employees)
    }
}

async function getEmployeeByIdHandler(req,res){
    const id = req.params.id
    const organizationId = req.organizationId
    try{
    if (!organizationId){
        return res.status(400).send({message:"organizationId is required!"})
    }
    else{
        const  employee = await Employee.findOne({_id:id,organizationId:organizationId})
        if (!employee){
            return res.status(404).send({message:"employee not found!"})
        }
        return res.status(200).send(employee)
    }
} catch(err){
    console.log(err)
    return res.status(500).send({message:err.message})
}
}


async function createEmployeeHandler(req,res){
    try{
    const { employeeNumber, firstName, lastName, contact, hourlyRate} = req.body
    const organizationId = req.organizationId
    if (!organizationId){
        return res.status(400).send({message:"organizationId is required!"})
    }

    const newEmployee = await Employee.create({ 
        employeeNumber:employeeNumber,
        organizationId: req.organizationId,
        firstName: firstName,
        lastName: lastName,
        contact: contact,
        hourlyRate: hourlyRate
    })
    return res.status(201).send(newEmployee)
    } catch(err){
        return res.status(500).send({message:err.message})
    }
}

async function updateEmployeeByIdHandler(req,res){
    const id = req.params.id
    const { employeeNumber, firstName, lastName, contact, hourlyRate} = req.body
    const organizationId = req.organizationId
    try{
    if (!organizationId){
        return res.status(400).send({message:"organizationId is required!"})
    }
    else{
        const updatedEmployee = await Employee.findOneAndUpdate({_id:id},{$set:{
            employeeNumber:employeeNumber,
            organizationId: req.organizationId,
            firstName: firstName,
            lastName: lastName,
            contact: contact,
            hourlyRate: hourlyRate
        },
        },{new:true})
        if (!updatedEmployee){
            return res.status(404).send({message:"employee not found!"})
        }
        return res.status(200).send(updatedEmployee)
    }
    } catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}


    

async function deleteEmployeeByIdHandler(req,res){
    const id = req.params.id
    const organizationId = req.organizationId
    try{
    if (!organizationId){
        return res.status(400).send({message:"organizationId is required!"})
    }
    else{
        const deletedEmployee = await Employee.findOneAndDelete({_id:id})
        if (!deletedEmployee){
            return res.status(404).send({message:"employee not found!"})
        }
        return res.status(200).send(deletedEmployee)
    }
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }

}

async function deleteMultipleEmployeesHandler(req,res){
    const employeeIds = req.body.map(employee => employee._id)
    const organizationId = req.organizationId
    try{
        if (!organizationId){
            return res.status(400).send({message:"organizationId is required!"})
        } else{
            const deletedEmployees = await Employee.deleteMany({_id:{$in:employeeIds}})
            return res.status(200).send(deletedEmployees)
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }
}

module.exports={
    getAllEmployeesHandler,
    getEmployeeByIdHandler,
    createEmployeeHandler,
    updateEmployeeByIdHandler,
    deleteEmployeeByIdHandler,
    deleteMultipleEmployeesHandler
}


