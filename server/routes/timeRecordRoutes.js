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


// Get all clock-in/clock-out records for employees
router.get('/', getAllTimeRecordsHandler);

// Get time record by ID
router.get('/:id', getTimeRecordByIdHandler);

// Get the latest 7 days clock-in/clock-out records
router.get('/latest', getLatestTimeRecordsHandler);

// Search time records with a specified range
router.get('/search', searchTimeRecordsHandler);

// Post clock-in/clock-out records for employees
router.post('/', postTimeRecordsHandler);

// Update time record by ID
router.put('/:id', updateTimeRecordByIdHandler);

// Delete time record by ID
router.delete('/:id', deleteTimeRecordByIdHandler);

// Delete multiple time records
router.delete('/', deleteMultipleTimeRecordsHandler);

module.exports = router;
