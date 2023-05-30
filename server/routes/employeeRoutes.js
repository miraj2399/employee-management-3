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

// Define the routes

/**
 * Get all employees
 * GET /employees
 */
router.get('/', getAllEmployeesHandler);

/**
 * Get employee by ID
 * GET /employees/:id
 */
router.get('/:id', getEmployeeByIdHandler);

/**
 * Create a new employee
 * POST /employees
 */
router.post('/', createEmployeeHandler);

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
