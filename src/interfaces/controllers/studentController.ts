import { reviewRepository, reviewRepositoryImpl } from './../../infra/repositories/reviewRepository';
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
import { coursePayment } from '../../app/usecases/student/payment';
import { coursePurchased } from '../../app/usecases/student/coursePurchased';
import { fetchStudentData } from '../../app/usecases/student/fetchStudentData';
import { reviewModel } from '../../infra/database/reviewModel';
import { postReviews } from '../../app/usecases/student/postReviews';
import { fetchReview } from '../../app/usecases/student/fetchReviews';
import mongoose from 'mongoose';
import { courseBookmark } from '../../app/usecases/student/courseBookmark';
import { removeCourseBookmark } from '../../app/usecases/student/removeBookmark';
import { getSavedCourses } from '../../app/usecases/student/fetchBookmarkedCourses';


// const JWT_SECRET="sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456";
const JWT_SECRET='your-secret-key';
const db = studentModel;
const studentRepository = studentRepositoryImpl(db);

const catDb = categoryModel;
const categoryRepository = categoryRepositoryImpl(catDb);

const courseDb = courseModel;
const courseRepository = courseRepositoryImpl(courseDb);

const reviewDb = reviewModel;
const reviewRepository = reviewRepositoryImpl(reviewDb);
//Student Registration
export const studentRegister = async(req:Request,res:Response)=>{
    console.log('hii',req.body);
    
    const {fname,lname,username,email,password,isGoogle} = req.body;

    try{
        const student = await registerStudent(studentRepository)(fname,lname,username,email,password,isGoogle);
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
    console.log('email=',email);
    console.log('password=',password);
    

    const expirationTime = Math.floor(Date.now() / 1000) + 1 * 60 * 60;
    const payload = {
        exp: expirationTime,
      };
    try{
        console.log('kkkk');
        
        const studentExist: student|null |object = await loginStudent(studentRepository)(email, password);
        console.log('studexrt=',studentExist);
        
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
            console.log('kk=',student);
            
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
            
            
            // const newArray = cateData.map(obj=>{return {...obj,subcategory:obj.subcategory}})
            const newArray = cateData.map(obj=>{return {...obj}})
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

//Payment
export const payment = async(req:Request,res:Response)=>{
    try{
     const {status,courseId,studId} = req.body;
     console.log('status payment=',status,courseId);
     const result = await coursePayment(courseRepository)(courseId,status,studId);
     const resultData = await coursePurchased(studentRepository)(courseId,status,studId);
     console.log('res==',result);
        if(result){
            res.json({success:'Payment successful',result});
          }
          else{
           res.json({ invalid: "Payment failed!" });
          } 
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    } 
}

//Fetch Student Details
export const fetchStudentDetails = async(req:Request,res:Response)=>{
    try{   
     const studId = req.params.studId;   
     console.log('sid=',studId);
     const studentData = await fetchStudentData(studentRepository)(studId);
     console.log('stuudddatta=',studentData);
     if(studentData){
        res.json({success:'Student data fetching successful',studentData});
      }
      else{
       res.json({ invalid: "Student data fetching failed!" });
      } 
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    } 
}

//Post Review
export const postReview = async(req:Request,res:Response)=>{
    try{ 
        console.log('rev body=',req.body);
        
        const {review} = req.body;
        const courseId = req.params.courseId;
        const studId = req.params.studId;
        const studid= new mongoose.Types.ObjectId(studId)
        const postedReview = await postReviews(reviewRepository)(review,courseId,studid);
        if(postedReview){
            res.status(201).json({message:'Review added succesfully',postedReview})
        }
        else{
            res.status(401).json({message:'Invalid datas'})
        }
    }catch(error){
        console.log('err=',error);
        
        res.status(500).json({ message: "Internal server error" });
    } 
}    
  
//Fetch Reviews
export const fetchReviews = async(req:Request,res:Response)=>{
    try{
        const courseId = req.params.courseId;
        const postedReviews = await fetchReview(reviewRepository)(courseId);
        if(postedReviews){
            res.status(201).json({message:'Review fetched succesfully',postedReviews}) 
        }
        else{
            res.status(401).json({message:'Invalid datas'})
        }

    }catch(error){
        console.log("err=",error);
        
        res.status(500).json({ message: "Internal server error" });
    } 
}

//Bookmark courses
export const bookmarkCourses = async(req:Request,res:Response)=>{
    try{
     const courseId = req.params.courseId;
     const studId = req.params.studId;
     const bookmark = await courseBookmark(courseRepository)(courseId,studId);
     if(bookmark){
        res.status(201).json({message:'Course bookmarked succesfully',bookmark}) 
        }
        else{
            res.status(401).json({message:'Invalid datas'})
        }
    }catch(error){
        console.log("err=",error);
        
        res.status(500).json({ message: "Internal server error" });
    } 
}

//Remove Bookmarked Courses
export const removeBookmarkedCourses = async(req:Request,res:Response)=>{
    try{
     const courseId = req.params.courseId;
     const studId = req.params.studId;
     const bookmark = await removeCourseBookmark(courseRepository)(courseId,studId);
     if(bookmark){
        res.status(201).json({message:'Course bookmark removed succesfully',bookmark}) 
        }
        else{
            res.status(401).json({message:'Invalid datas'})
        }
    }catch(error){
        console.log("err=",error);
        
        res.status(500).json({ message: "Internal server error" });
    } 
}

//Fetch BookmarkedCourses
// export const fetchSavedCourses = async(req:Request,res:Response)=>{
//     try{
//      const studId = req.params.studId;;
//      const bookmarkedCourses = await getSavedCourses(courseRepository)(studId);
//      if(bookmarkedCourses){
//         res.status(201).json({message:'Fetch all bookmarked courses succesfully',bookmarkedCourses}) 
//     }
//     else{
//         res.status(401).json({message:'Invalid datas'})
//     }
//     }catch(error){
//         console.log("err=",error);
        
//         res.status(500).json({ message: "Internal server error" });
//     } 
// }