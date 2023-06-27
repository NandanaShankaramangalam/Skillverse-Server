import { loginStudent } from './../../app/usecases/student/logStudent';
import { Request,Response } from "express";
import { studentModel } from "../../infra/database/studentModel";
import { studentRepositoryImpl } from "../../infra/repositories/studentRepository";
import { registerStudent } from '../../app/usecases/student/regStudent';
const jwt=require('jsonwebtoken');

// const JWT_SECRET="sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456";
const JWT_SECRET='your-secret-key';
const db = studentModel;
const studentRepository = studentRepositoryImpl(db);

//Student Registration
export const studentRegister = async(req:Request,res:Response)=>{
    console.log('hii',req.body);
    
    const {fname,lname,username,email,password} = req.body;

    try{
        const student = await registerStudent(studentRepository)(fname,lname,username,email,password);
        if(student){
            res.status(201).json({message:'Registration successful',student})
        }
        else{
            res.status(401).json({message:'Invalid credentials'})
        }
    }catch(err){
        // console.log(JSON.parse(JSON.stringify(err)).code);
        // if(JSON.parse(JSON.stringify(err)).code == 11000){
        //     res.status(403).json({message:'Email already exist!'});
        // }
        // else{
        //     res.status(500).json({message:'Internal server error!'});
        // }
        res.status(500).json({message:'Internal server error!'});
    }
}

//Student Login
export const studentLogin = async(req:Request,res:Response)=>{
    console.log('req--',req.body);
    const {email,password}  = req.body;

    const expirationTime = Math.floor(Date.now() / 1000) + 1 * 60 * 60;
    const payload = {
        exp: expirationTime,
      };
    try{
        const studentExist = await loginStudent(studentRepository)(email, password);
        if (studentExist) {
            // console.log('stu',student);
                const student = {
                fname: studentExist.fname,
                lname: studentExist.lname,
                username: studentExist.username,
                email: studentExist.email,
            }
            
            const token=jwt.sign(payload,JWT_SECRET);
            // res.status(200).json({ success: "Login successful", student , token});
            res.json({ success: "Login successful", student , token});
              
           
          } else {
            // res.status(401).json({ invalid: "Invalid email or password" });
            res.json({ invalid: "Invalid email or password!" });
          }
    }catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    
}