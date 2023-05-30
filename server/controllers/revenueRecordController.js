// create empty functions for all the routes you need to implement

async function getAllRevenueRecordsHandler(req,res){
    res.send("getAllRevenueRecordsHandler")
}

async function getRevenueRecordByIdHandler(req,res){
    res.send("getRevenueRecordByIdHandler")
}

async function getLatestRevenueRecordsHandler(req,res){
    res.send("getLatestRevenueRecordsHandler")
}

async function searchRevenueRecordsHandler(req,res){
    res.send("searchRevenueRecordsHandler")
}

async function createRevenueRecordHandler(req,res){
    res.send("createRevenueRecordHandler")
}

async function updateRevenueRecordByIdHandler(req,res){
    res.send("updateRevenueRecordByIdHandler")
}

async function deleteRevenueRecordByIdHandler(req,res){
    res.send("deleteRevenueRecordByIdHandler")
}

async function deleteMultipleRevenueRecordsHandler(req,res){
    res.send("deleteMultipleRevenueRecordsHandler")
}

module.exports={
    getAllRevenueRecordsHandler,
    getRevenueRecordByIdHandler,
    getLatestRevenueRecordsHandler,
    searchRevenueRecordsHandler,
    createRevenueRecordHandler,
    updateRevenueRecordByIdHandler,
    deleteRevenueRecordByIdHandler,
    deleteMultipleRevenueRecordsHandler
}