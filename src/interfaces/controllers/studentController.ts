import { courseRepository, courseRepositoryImpl } from './../../infra/repositories/courseRepository';
import {  categoryRepositoryImpl } from './../../infra/repositories/categoryRepository';
import { loginStudent } from './../../app/usecases/student/logStudent';
import { Request,Response } from "express";
import { studentModel } from "../../infra/database/studentModel";
import { studentRepositoryImpl } from "../../infra/repositories/studentRepository";
import { registerStudent } from '../../app/usecases/student/regStudent';
import { student } from '../../domain/models/student';
import { categoryModel } from '../../infra/database/categoryModel';
import { fetchCategoryData } from '../../app/usecases/student/fetchCategory';
import { courseModel } from '../../infra/database/courseModel';
import { fetchCourses } from '../../app/usecases/student/fetchCourses';
const jwt=require('jsonwebtoken');
const AWS = require('aws-sdk');
import {s3Config } from '../../../awsConfig'
import { fetchInfo } from '../../app/usecases/student/fetchInfo';
import { updatePersonalInfo } from '../../app/usecases/student/updateInfo';
import { fetchCourse } from '../../app/usecases/student/fetchCourseDetails';

// const JWT_SECRET="sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456";
const JWT_SECRET='your-secret-key';
const db = studentModel;
const studentRepository = studentRepositoryImpl(db);

const catDb = categoryModel;
const categoryRepository = categoryRepositoryImpl(catDb);

const courseDb = courseModel;
const courseRepository = courseRepositoryImpl(courseDb)

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
        const studentExist: student|null |object = await loginStudent(studentRepository)(email, password);
        if(studentExist  && 'block' in studentExist && studentExist?.block === true){
            res.json({ block: "You are blocked!"});  
        }
        else{

        if (studentExist) {
            // console.log('stu',student);
            //     const student = {
            //     fname: studentExist.fname,
            //     lname: studentExist.lname,
            //     username: studentExist.username,
            //     email: studentExist.email,
            // }
            const {...student} = studentExist
            
            const token=jwt.sign(payload,JWT_SECRET);
            // res.status(200).json({ success: "Login successful", student , token});
            res.json({ success: "Login successful", student , token});
              
           
          } else {
            // res.status(401).json({ invalid: "Invalid email or password" });
            res.json({ invalid: "Invalid email or password!" });
          }
        }
    }catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    
}

//Show Category
export const showCategory = async(req:Request,res:Response)=>{
    try{
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

//Show courses 
export const showCourses = async(req:Request,res:Response)=>{
    try{
        console.log('okkkkkk');
        
        const selectedCategory = req.params.selectedCategory;
        // console.log('sel ctgry=',selectedCategory);
        const courses = await fetchCourses(courseRepository)(selectedCategory);
        console.log('cos=',courses);

        // const s3 = new AWS.S3({
        //     accessKeyId: `${s3Config.accessKeyId}`,
        //     secretAccessKey: `${s3Config.secretAccessKey}`,
        //     region: `${s3Config.region}`,
        //   });


        //   const filteredCourses = courses?.map(course=>{

        //     // const url =  s3.getSignedUrlPromise('getObject', params);
        //     const videoUrl = generateS3SignedUrl(course.video);
            
        //     const thumbnailUrl = generateS3SignedUrl(course.thumbnail);
            
        // // const url = URL.createObjectURL(new Blob([body.Body as ArrayBuffer]));
        //     return { ...course, videoUrl, thumbnailUrl };
        //   })


        //    function generateS3SignedUrl(key:string) {
        //     console.log('key=',key);
            
        //     const params = {
        //       Bucket: `${s3Config.bucketName}`,
        //       Key: key,
        //     //   Expires: 3600, // URL expiration time in seconds
        //     };
          
        //   console.log("this ", params);
          
        //     // return s3.getSignedUrl('getObject', params);
        //     return s3.getSignedUrl('getObject', params)
        //   }


        if(courses){
            res.json({success:'Course data fetching successful',courses});
        }else{
            res.json({ invalid: "Course data not available!" });
        }  
        
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    } 
}

//Fetch Personal Info
export const showInfo = async(req:Request,res:Response)=>{
    try{
       const studId = req.params.studId;
       console.log('stud id=',studId);
       const info = await fetchInfo(studentRepository)(studId);
    //    console.log('inn=',info);
       if(info){
         res.json({success:'Personal Info fetching successful',info});
       }
       else{
        res.json({ invalid: "Personal Info not available!" });
       }
       
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    } 
}

//Update personal info
export const updateInfo = async(req:Request,res:Response)=>{
    try{
        const studId = req.params.studId;
        const {fname,lname,username,email} = req.body;  
        console.log('stud id=',studId);
        console.log('fname=',fname);
        const info = await updatePersonalInfo(studentRepository)(fname,lname,username,email,studId)
        // console.log('upp=',info);
        if(info){
            res.json({success:'Personal Info updating successful',info});
          }
          else{
           res.json({ invalid: "Personal Info updation failed!" });
          }

    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    } 
}

//Fetch Course Details
export const fetchCourseDetails = async(req:Request,res:Response)=>{
    try{
        const courseId = req.params.courseId;
        console.log('cid=',courseId);
        const result = await fetchCourse(courseRepository)(courseId);
        console.log('res==',result);
        if(result){
            res.json({success:'Course data fetching successful',result});
          }
          else{
           res.json({ invalid: "Course data fetching failed!" });
          }  

    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    } 
}