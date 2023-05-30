
const Employee = require("../models/employeeModel")
const Organization = require("../models/organizationModel")

async function getAllEmployeesHandler(req,res){
    res.send("getAllEmployeesHandler")
}

async function getEmployeeByIdHandler(req,res){
    res.send("getEmployeeByIdHandler")
}

async function createEmployeeHandler(req,res){
    try{
    const { employeeId, organization, firstName, lastName, contact, hourlyRate} = req.body
    const newEmployee = await Employee.create({ 
        employeeId:employeeId,
        organization: organization,
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
    res.send("updateEmployeeByIdHandler")
}

async function deleteEmployeeByIdHandler(req,res){
    res.send("deleteEmployeeByIdHandler")
}

async function deleteMultipleEmployeesHandler(req,res){
    res.send("deleteMultipleEmployeesHandler")
}

module.exports={
    getAllEmployeesHandler,
    getEmployeeByIdHandler,
    createEmployeeHandler,
    updateEmployeeByIdHandler,
    deleteEmployeeByIdHandler,
    deleteMultipleEmployeesHandler
}


