import { Request,Response ,NextFunction} from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'

interface Auth{
    iat : number,
    exp : number
}
export const  studentAuth=(req:Request,res:Response,next:NextFunction)=>{
    try{
        console.log('req hdr stud=',req.headers);
        
        let studToken = req.headers.studtoken;
        console.log('stud tokn=',studToken);
        
        let JWT_SECRET='your-secret-key';
        if(studToken){
            
            
            studToken=studToken.toString()
            // studToken=JSON.parse(studToken).token as string
            let decoded=jwt.verify(studToken,JWT_SECRET) as Auth
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