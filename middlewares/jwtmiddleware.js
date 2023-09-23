const jwt=require('jsonwebtoken')

const jwtMiddleware=(req, res, next)=>{
    try{
        const token=req.headers['access_token']
        
        jwt.verify(token,"secretkey123")

        next()
    }
    catch{
        res.status(401).json({
            status:false,
            message:"Please Login",
            statusCode:401
        })
    }
}

module.exports={jwtMiddleware}



















