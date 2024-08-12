
const UserModel = require("../models/Users");
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt');
const signup=async (req, res)=> {
    try {
        const { name, email, password } = req.body;
        // console.log(name)
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ msg: "user already exist" });
        }
        

        const hashpassword=await bcrypt.hash(password, 10);
        
        await UserModel.create({name,email,password:hashpassword});
        res.status(201).json({ msg: "user created successfully"  });
    }

    catch (e) {
        res.status(500).json({msg:"error while storing information"});

    }

}

const login=async(req,res)=>{
    
    try{
        
        const {email,password}=req.body;
        
        const user=await UserModel.findOne({email});

        if(!user)
        {
            res.status(401).json({msg:"email is not registered"})
        }
       
        const compare=await bcrypt.compare(password,user.password);
        
        if(!compare)
        {
            res.status(401).json({msg:"password is wrong"})
        }

        const jwttoken=jwt.sign(
            {email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
        
        res.status(201).json({msg:"login successfully",jwttoken});
    }
    catch(e){
        res.status(401).json({e})
    }


}

const middleware=async (req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth)
    {
        res.status(403).json({msg:"authorization header or JWT toekn is not present"})
    }
    try{
        const decoded=jwt.verify(auth,process.env.JWT_SECRET);
        req.user=decoded;
        if(decoded){
            next();
        }
    }
    catch(e){
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token wrong or expired' });


    }
    

}
module.exports={
    signup,
    login,
    middleware
}
