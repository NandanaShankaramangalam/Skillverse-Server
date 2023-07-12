import {  courseRepositoryImpl } from './../../infra/repositories/courseRepository';
import { categoryRepository, categoryRepositoryImpl } from './../../infra/repositories/categoryRepository';
import { Request,Response } from "express";
import { tutorModel } from "../../infra/database/tutorModel";
import { tutorRepositoryImpl} from "../../infra/repositories/tutorRepository";
import { registerTutor } from "../../app/usecases/tutor/regTutor";
import { loginTutor } from "../../app/usecases/tutor/logTutor";
import { profileAdd } from "../../app/usecases/tutor/addProfile";
import { fetchProfileData } from "../../app/usecases/tutor/fetchProfile";
import { fetchCategoryData } from "../../app/usecases/tutor/fetchCategory";
import { categoryModel } from '../../infra/database/categoryModel';
import { courseCreation } from '../../app/usecases/tutor/courseCreation';
import { courseModel } from '../../infra/database/courseModel';
import { tutor } from '../../domain/models/tutor';
const jwt=require('jsonwebtoken');

const JWT_SECRET='your-secret-key';  
const db = tutorModel;
const tutorRepository = tutorRepositoryImpl(db);

const cateDb = categoryModel;
const categoryRepository = categoryRepositoryImpl(cateDb);

const courseDb = courseModel;
const courseRepository = courseRepositoryImpl(courseDb);

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
   
        const tutorExist:tutor|null |object= await loginTutor(tutorRepository)(email,password);

        if(tutorExist  && 'block' in tutorExist && tutorExist?.block === true){
            res.json({ block: "You are blocked!"});  
        }
        else{

        
            if(tutorExist){
                // const tutor = {
                //     fname: tutorExist.fname,
                //     lname: tutorExist.lname,
                //     username: tutorExist.username,
                //     email: tutorExist.email,
                // }
                // const {password,...tutor} = tutorExist;
                const {...tutor} = tutorExist;
                console.log('tootr=',tutor);
                
                const token=jwt.sign(payload,JWT_SECRET);
                res.json({ success: "Login successful", tutor,token});
            }else{
                res.json({ invalid: "Invalid email or password!" });
            }
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

//Show Category
export const showCategory = async(req:Request,res:Response)=>{
    try{
        console.log('okkkkkkkkkkkkkkkkkkkkkkk');
        
        const cateData = await fetchCategoryData(categoryRepository)();
        
        if(cateData){
            
            // const newArray = cateData.map(obj=>{return {...obj,subcategory:obj.subcategory.join()}})
            const newArray = cateData.map(obj=>{return {...obj,subcategory:obj.subcategory}})
            // console.log('kk',newArray);
            res.json({success:'Category data fetching successful',newArray});
        }else{
            res.json({ invalid: "No category data available!" });
        }  
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }  
}

//Course creation
export const createCourse = async(req:Request,res:Response)=>{
    try{
       console.log('rqbdy course = ',req.body);
       const { videoLocation, thumbnailLocation, title, fee, category, subcategory, description, tutId} = req.body;
       console.log('title=',title);
       console.log('subcat=',subcategory);
       console.log('tutid=',tutId);
       
       const course = await courseCreation(courseRepository)(title, fee, category, subcategory, description,thumbnailLocation, videoLocation,tutId)
       console.log('course=',course);
       if(course){
        res.json({success:'Course creation successful',course});
       }else{
        res.json({ invalid: "Course creation failed!" });
       }  
       
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }  
}

