const express=require("express");
const { loginValidation, signupValidation } = require("../Middleware/AuthValidation");
const { signup, login } = require("../Controller/AuthController");
const router = express.Router();

router.post('/login',loginValidation,login)
 

router.post('/signup',signupValidation,signup)

module.exports=router