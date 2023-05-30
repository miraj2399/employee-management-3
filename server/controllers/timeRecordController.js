// create empty functions for all the routes you need to implement

async function getAllTimeRecordsHandler(req,res){
    res.send("getAllTimeRecordsHandler")
}

async function getTimeRecordByIdHandler(req,res){
    res.send("getTimeRecordByIdHandler")
}

async function getLatestTimeRecordsHandler(req,res){
    res.send("getLatestTimeRecordsHandler")
}

async function searchTimeRecordsHandler(req,res){
    res.send("searchTimeRecordsHandler")
}

async function postTimeRecordsHandler(req,res){
    res.send("postTimeRecordsHandler")
}

async function updateTimeRecordByIdHandler(req,res){
    res.send("updateTimeRecordByIdHandler")
}

async function deleteTimeRecordByIdHandler(req,res){
    res.send("deleteTimeRecordByIdHandler")
}

async function deleteMultipleTimeRecordsHandler(req,res){
    res.send("deleteMultipleTimeRecordsHandler")
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
