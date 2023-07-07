import { Request,Response } from "express";
import { tutorModel } from "../../infra/database/tutorModel";
import { tutorRepositoryImpl} from "../../infra/repositories/tutorRepository";
import { registerTutor } from "../../app/usecases/tutor/regTutor";
import { loginTutor } from "../../app/usecases/tutor/logTutor";
import { profileAdd } from "../../app/usecases/tutor/addProfile";
import { fetchProfileData } from "../../app/usecases/tutor/fetchProfile";
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
     try{
    const {email,password}  = req.body;
    const expirationTime = Math.floor(Date.now() / 1000) + 1 * 60 * 60;
    const payload = {
        exp: expirationTime,
      };
   
        const tutorExist = await loginTutor(tutorRepository)(email,password);
        console.log('tut ex=',tutorExist);
        
        if(tutorExist){
            // const tutor = {
            //     fname: tutorExist.fname,
            //     lname: tutorExist.lname,
            //     username: tutorExist.username,
            //     email: tutorExist.email,
            // }
            const {password,...tutor} = tutorExist;
            console.log('tootr=',tutor);
            
            const token=jwt.sign(payload,JWT_SECRET);
            res.json({ success: "Login successful", tutor,token});
        }else{
            res.json({ invalid: "Invalid email or password!" });
        }
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
  
}

//Video Upload
export const videoUpload = async(req:Request,res:Response)=>{
    console.log('uplddd=',req.body);
    // console.log('upld file',req.file);
    
    
}

// Add Profile
export const addProfile = async(req:Request,res:Response)=>{
    console.log('profile=',req.body);
    try{
      const {fileLocation,description,tutId} = req.body;
      const profileData = await profileAdd(tutorRepository)(fileLocation,description,tutId);
      console.log(profileData);
      if(profileData){
        res.json({message:'Tutor Profile Added',isBlocked:true})
    }else{
        res.json({message:'Tutor Profile Add Failed!'})
    }
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }    
}

//Show Profile
export const showProfile = async(req:Request,res:Response)=>{
   console.log('tut id=',req.params.tutId);
   try{
     const tutId = req.params.tutId;
     const profileData = await fetchProfileData(tutorRepository)(tutId)
     if(profileData){
        res.json({success:'Profile data fetching successful',profileData});
    }else{
        res.json({ invalid: "Profile data fetching failed!" });
    }  
   }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }  
}



