import { tutorRepository, tutorRepositoryImpl } from './../../infra/repositories/tutorRepository';
import { studentRepository, studentRepositoryImpl} from './../../infra/repositories/studentRepository';
import { admin } from './../../domain/models/admin';
import { adminRepository, adminRepositoryImpl } from './../../infra/repositories/adminRepository';
import { Request,Response } from "express";
import { adminModel } from "../../infra/database/adminModel";
import { loginAdmin } from '../../app/usecases/admin/logAdmin';
import { fetchStudentData } from '../../app/usecases/admin/fetchStudent';
import { studentModel } from '../../infra/database/studentModel';
import { blockStud } from '../../app/usecases/student/blockStudent';
import { unblockStud } from '../../app/usecases/student/unblockStudent';
import { tutorModel } from '../../infra/database/tutorModel';
import { fetchTutorData } from '../../app/usecases/admin/fetchTutor';
import { blockTut } from '../../app/usecases/tutor/blockTutor';
import { unblockTut } from '../../app/usecases/tutor/unblockTutor';

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';

const db = adminModel;
const adminRepository = adminRepositoryImpl(db);

const studDb = studentModel;
const studentRepository = studentRepositoryImpl(studDb);

const tutDb = tutorModel;
const tutorRepository = tutorRepositoryImpl(tutDb);
//Admin Login
export const adminLogin = async(req:Request,res:Response)=>{
    console.log('reqst=',req.body);
    const {username,password} = req.body;
    
    const expirationTime = Math.floor(Date.now() / 1000) + 1 * 60 * 60;
    const payload = {
        exp: expirationTime,
      };
try{
    const adminExist = await loginAdmin(adminRepository)(username,password);
    console.log('adexist',adminExist);
    
    if(adminExist){
        const admin={
            username:adminExist.username
        }
        const token=jwt.sign(payload,JWT_SECRET);
        res.json({ success: "Login successful", admin,token})
    }else{
        res.json({ invalid: "Invalid email or password!" });
    }
}catch(error){
    res.status(500).json({ message: "Internal server error" });
}
}

//Fetch Student Data
export const showStudent = async(req:Request,res:Response)=>{

    try{
      const studentData = await fetchStudentData(studentRepository)();
    //   console.log('okkkkkkkkkkkkk',studentData);
      
    if(studentData){
        res.json({success:'data fetching successful',studentData});
    }else{
        res.json({ invalid: "no student data available!" });
    }  
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
    
}

//Block Student
export const blockStudent = async(req:Request,res:Response)=>{
    console.log('blkuesr',req.body);
    const {id} = req.body;
    console.log('cntrl id=',id);
    
    // const blocked =  blockStudent(studentRepository)(id);
    try{
        const blocked =  await blockStud(studentRepository)(id);
        console.log('blocked in cntrl',blocked);
        if(blocked){
            res.json({message:'blocked student',isBlocked:true})
        }else{
            res.json({message:'block failed'})
        }
    }catch(err){
        console.log(err);
                              
    }
}    
   
//Unblock student
export const unblockStudent = async(req:Request,res:Response)=>{
     console.log('unblk id',req.body);
     const {id} = req.body;
     try{
        const unblocked = await unblockStud(studentRepository)(id);
        console.log('unblocked in cntrl',unblocked);
        if(unblocked){
            res.json({message:'unblocked student',isUnblocked:true})
        }else{
            res.json({message:'unblock failed'})
        }
     }catch(err){      
        console.log(err);  
    }
}

//Fetch Tutor Data
export const showTutor = async(req:Request,res:Response)=>{

    try{
      const tutorData = await fetchTutorData(tutorRepository)();
    //   console.log('okkkkkkkkkkkkk',studentData);
      
    if(tutorData){
        res.json({success:'data fetching successful',tutorData});
    }else{
        res.json({ invalid: "no student data available!" });
    }  
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
    
}

//Block Tutor 
export const blockTutor = async(req:Request,res:Response)=>{
    console.log('blkuesr',req.body);
    const {id} = req.body;
    console.log('cntrl blk id=',id);

    try{
        const blocked = await blockTut(tutorRepository)(id);
        console.log('blocked in cntrl',blocked);
        if(blocked){
            res.json({message:'blocked tutor',isBlocked:true})
    }else{
        res.json({message:'block failed'})
    }
}catch(err){
    console.log(err);
                          
}
}

//Unblock Tutor
export const unblockTutor = async(req:Request,res:Response)=>{
    console.log('unblk id',req.body);
    const {id} = req.body;
     try{
        const unblocked = await unblockTut(tutorRepository)(id);
        console.log('unblocked in cntrl',unblocked);
        if(unblocked){
            res.json({message:'unblocked tutor',isUnblocked:true})
        }else{
            res.json({message:'unblock failed'})
        }
     }catch(err){      
        console.log(err);  
    }
}

//Add Category
export const addCategory = async(req:Request,res:Response)=>{
    console.log('Add cate rqbdy = ',req.body);
}