const express = require('express');
const router = require('express').Router();

const {
getDashBoardHandler
} = require('../controllers/dashBoardController');


router.get('/', getDashBoardHandler);

module.exports = router;
