import { Request,Response } from "express";
import { tutorModel } from "../../infra/database/tutorModel";
import { tutorRepositoryImpl} from "../../infra/repositories/tutorRepository";
import { registerTutor } from "../../app/usecases/tutor/regTutor";
import { loginTutor } from "../../app/usecases/tutor/logTutor";
const jwt=require('jsonwebtoken');

const JWT_SECRET='your-secret-key';
const db = tutorModel;
const tutorRepository = tutorRepositoryImpl(db);

//Tutor Registration
export const tutorRegister = async(req:Request,res:Response)=>{
    console.log('tut',req.body);
    const {fname,lname,username,email,password} = req.body;
    
    try{
        const tutor = await registerTutor(tutorRepository)(fname,lname,username,email,password);
        if(tutor){
            res.status(201).json({message:'Registration successful',tutor})
        }
        else{
            res.status(401).json({message:'Invalid credentials'})
        }
    }catch(err){
        res.status(500).json({message:'Internal server error!'});
    }
}

//Tutor Login
export const tutorLogin = async(req:Request,res:Response)=>{
    console.log('tut req=',req.body);
    const {email,password}  = req.body;
    const expirationTime = Math.floor(Date.now() / 1000) + 1 * 60 * 60;
    const payload = {
        exp: expirationTime,
      };
    try{
        const tutorExist = await loginTutor(tutorRepository)(email,password);
        if(tutorExist){
            const tutor = {
                fname: tutorExist.fname,
                lname: tutorExist.lname,
                username: tutorExist.username,
                email: tutorExist.email,
            }
            const token=jwt.sign(payload,JWT_SECRET);
            res.json({ success: "Login successful", tutor,token});
        }else{
            res.json({ invalid: "Invalid email or password!" });
        }
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
  
}