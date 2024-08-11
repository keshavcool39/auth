const zod=require("zod");

const signupValidation=(req,res,next)=>{
    try{
        const emailschema=zod.string().email();
        const passwordschema=zod.string().min(4).max(100);
        const nameschema=zod.string().min(4).max(100);

        const userschema=zod.object({
            email:emailschema,
            password:passwordschema,
            name:nameschema
        })
        userschema.parse(req.body);
        next();

    }
    catch(e)
    {
        const error=e.issues.map(issue => {
            return {
                message: issue.message,
                path: issue.path
            };
        });
        res.status(405).json({error})
    }
    
}


const loginValidation=(req,res,next)=>{
    try{
        const emailschema=zod.string().email();
        const passwordschema=zod.string().min(4).max(100);

        const userschema=zod.object({
            email:emailschema,
            password:passwordschema,
        })
        userschema.parse(req.body);
        next();

    }
    catch(e)
    {
        const error=e.issues.map(issue => {
            return {
                message: issue.message,
                path: issue.path
            };
        });
        res.status(405).json({error})
    
      
    }
    
   
}



module.exports={
    signupValidation,
    loginValidation,
    
}