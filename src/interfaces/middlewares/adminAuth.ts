import { Request,Response ,NextFunction} from "express";
import jwt from 'jsonwebtoken';

interface Auth{
    iat : number,
    exp : number
}

export const  adminAuth=(req:Request,res:Response,next:NextFunction)=>{
    try{
        console.log("haaaiii");
        
        console.log('req hdr admin tkn=',req.headers.token);
        let token = req.headers.token;
        console.log('token admin=',token);  
        
        // let JWT_SECRET=process.env.JWT_SECRET as string
        let JWT_SECRET='your-secret-key';
        if(token){
            
            
            token=token.toString()
            // token=JSON.parse(token).token as string
            let decoded=jwt.verify(token,JWT_SECRET) as Auth
            const currentTimestamp=Math.floor(Date.now()/1000);
            const isTokenExpired = decoded.exp < currentTimestamp;
            if(isTokenExpired){
                res.json({message:'expired'})
            }else{
                next()
            }  
           }else{
            res.json({message:'unauthorized'})
           }
    
    }catch(err){
        console.log(err);
        
    }
}