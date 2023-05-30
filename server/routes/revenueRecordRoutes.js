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


// Get all revenue records
router.get('/', getAllRevenueRecordsHandler);

// Get revenue record by ID
router.get('/:id', getRevenueRecordByIdHandler);

// Get the latest revenue records
router.get('/latest', getLatestRevenueRecordsHandler);

// Search revenue records with a specified range
router.get('/search', searchRevenueRecordsHandler);

// Create a new revenue record
router.post('/', createRevenueRecordHandler);

// Update revenue record by ID
router.put('/:id', updateRevenueRecordByIdHandler);

// Delete revenue record by ID
router.delete('/:id', deleteRevenueRecordByIdHandler);

// Delete multiple revenue records
router.delete('/', deleteMultipleRevenueRecordsHandler);

module.exports = router;
