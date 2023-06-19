const express = require('express');
const router = express.Router();
const {
    createOrganizationHandler,
    getOrganizationByNameHandler,
    getAvailablePermissionsHandler,
    updatePermissionsHandler,
    requestJoinOrganizationHandler,
    getAllJoinRequestsHandler,
    approveJoinRequestHandler
} = require('../controllers/organizationController');
const accessControl = require('../middleware/accessControl');

// Create a new organization
router.post('/', createOrganizationHandler);



// Get available permissions
router.get('/permissions', getAvailablePermissionsHandler);

// Request modify permissions (must include userID and should be made from an admin account)
router.post('/permissions',(req,res,next) => {
    accessControl("","")(req,res,next) }
 ,updatePermissionsHandler);

// Request to join an organization (must include userID)
router.post('/join', requestJoinOrganizationHandler);

// Get all requests to join an organization (must be made from an admin account)
router.get('/join', (req,res,next)=>{
    accessControl("","")(req,res,next)
}, getAllJoinRequestsHandler);

// approve or reject a request to join an organization (must be made from an admin account)
router.put('/approve', (req,res,next)=>{accessControl("","")(req,res,next)}, approveJoinRequestHandler);

// Get details of an organization by name
router.get('/:name', getOrganizationByNameHandler);

module.exports = router;
