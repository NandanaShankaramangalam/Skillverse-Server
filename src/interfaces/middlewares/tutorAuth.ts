import { Request,Response ,NextFunction} from "express";
import jwt from 'jsonwebtoken';

interface Auth{
    iat : number,
    exp : number
}

export const  tutorAuth=(req:Request,res:Response,next:NextFunction)=>{
    try{
        let tutToken = req.headers.tutToken;
        let JWT_SECRET='your-secret-key';
        if(tutToken){
            
            
            tutToken=tutToken.toString()
            tutToken=JSON.parse(tutToken).token as string
            let decoded=jwt.verify(tutToken,JWT_SECRET) as Auth
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