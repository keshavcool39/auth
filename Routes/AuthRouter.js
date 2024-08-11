const express=require("express");
const { loginValidation, signupValidation} = require("../Middleware/AuthValidation");
const { signup, login, middleware } = require("../Controller/AuthController");
const router = express.Router();

router.post('/login',loginValidation,login)
 

router.post('/signup',signupValidation,signup)

router.get("/",middleware ,(req,res)=>{
    res.json({sucess:"true"});

})

module.exports=router