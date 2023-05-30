const express = require('express');
const router = express.Router();
const {
    getAllRevenueRecordsHandler,
    getRevenueRecordByIdHandler,
    getLatestRevenueRecordsHandler,
    searchRevenueRecordsHandler,
    createRevenueRecordHandler,
    updateRevenueRecordByIdHandler,
    deleteRevenueRecordByIdHandler,
    deleteMultipleRevenueRecordsHandler
} = require('../controllers/revenueRecordController');

const accessControl = require('../middleware/accessControl');

// Get all revenue records
router.get('/',(req,res,next)=>{accessControl("revenueRecord","view")(req,res,next)},getAllRevenueRecordsHandler);



// Get the latest revenue records
router.get('/latest/:days',(req,res,next)=>{accessControl("revenueRecord","view")(req,res,next)}, getLatestRevenueRecordsHandler);

// Search revenue records with a specified range
router.get('/search',(req,res,next)=>{accessControl("revenueRecord","view")(req,res,next)}, searchRevenueRecordsHandler);

// Create a new revenue record
router.post('/',(req,res,next)=>{accessControl("revenueRecord","add")(req,res,next)}, createRevenueRecordHandler);

// Delete multiple revenue records
router.delete('/',(req,res,next)=>{accessControl("revenueRecord","delete")(req,res,next)}, deleteMultipleRevenueRecordsHandler);

// Update revenue record by ID
router.put('/:id',(req,res,next)=>{accessControl("revenueRecord","update")(req,res,next)}, updateRevenueRecordByIdHandler);

// Delete revenue record by ID
router.delete('/:id',(req,res,next)=>{accessControl("revenueRecord","delete")(req,res,next)}, deleteRevenueRecordByIdHandler);

// Get revenue record by ID
router.get('/:id',(req,res,next)=>{accessControl("revenueRecord","view")(req,res,next)}, getRevenueRecordByIdHandler);



module.exports = router;
