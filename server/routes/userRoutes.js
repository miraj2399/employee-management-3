const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.post("/signup", userController.signUpHandler)
router.post("/login",userController.loginHandler)
router.put("/changeUserRole",userController.changeUserRoleHandler)


module.exports = router