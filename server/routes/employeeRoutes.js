const express = require('express');
const router = express.Router();

// Import the employee controller
const {
  getAllEmployeesHandler,
  getEmployeeByIdHandler,
  createEmployeeHandler,
  updateEmployeeByIdHandler,
  deleteEmployeeByIdHandler,
  deleteMultipleEmployeesHandler
} = require('../controllers/employeeController');
const accessControl = require('../middleware/accessControl');


// Define the routes

/**
 * Get all employees
 * GET /employees
 */
router.get('/',(req,res,next)=>{accessControl("employee","view")(req,res,next)}, getAllEmployeesHandler);

/**
 * Get employee by ID
 * GET /employees/:id
 */
router.get('/:id', getEmployeeByIdHandler);

/**
 * Create a new employee
 * POST /employees
 */
router.post('/', (req,res,next)=>{accessControl("employee","add")(req,res,next)},createEmployeeHandler);

/**
 * Update employee by ID
 * PUT /employees/:id
 */
router.put('/:id', updateEmployeeByIdHandler);

/**
 * Delete employee by ID
 * DELETE /employees/:id
 */
router.delete('/:id', deleteEmployeeByIdHandler);

/**
 * Delete multiple employees
 * DELETE /employees
 */
router.delete('/', deleteMultipleEmployeesHandler);

// Export the router
module.exports = router;
