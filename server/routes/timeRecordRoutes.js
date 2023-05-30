const express = require('express');
const router = express.Router();
const {
    getAllTimeRecordsHandler,
    getTimeRecordByIdHandler,
    getLatestTimeRecordsHandler,
    searchTimeRecordsHandler,
    postTimeRecordsHandler,
    updateTimeRecordByIdHandler,
    deleteTimeRecordByIdHandler,
    deleteMultipleTimeRecordsHandler
} = require('../controllers/timeRecordController');
const accessControl = require('../middleware/accessControl');
// Get all clock-in/clock-out records for employees
router.get('/', (req,res,next)=>{accessControl("timeRecord","view")(req,res,next)}, getAllTimeRecordsHandler);


// Get the latest x days clock-in/clock-out records
router.get('/latest/:days',(req,res,next)=>{accessControl("timeRecord","view")(req,res,next)}, getLatestTimeRecordsHandler);

// Search time records with a specified range
router.get('/search',(req,res,next)=>{accessControl("timeRecord","view")(req,res,next)},searchTimeRecordsHandler);

// Post clock-in/clock-out records for employees
router.post('/',(req,res,next)=>{accessControl("timeRecord","add")(req,res,next)}, postTimeRecordsHandler);

// Get time record by ID
router.get('/:id',(req,res,next)=>{accessControl("timeRecord","view")(req,res,next)}, getTimeRecordByIdHandler);

// Update time record by ID
router.put('/:id',(req,res,next)=>{accessControl("timeRecord","update")(req,res,next)}, updateTimeRecordByIdHandler);

// Delete time record by ID
router.delete('/:id',(req,res,next)=>{accessControl("timeRecord","delete")(req,res,next)}, deleteTimeRecordByIdHandler);

// Delete multiple time records
router.delete('/',(req,res,next)=>{accessControl("timeRecord","delete")(req,res,next)}, deleteMultipleTimeRecordsHandler);

module.exports = router;
