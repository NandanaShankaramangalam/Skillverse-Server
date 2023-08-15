import { studentRepository, studentRepositoryImpl } from './../../infra/repositories/studentRepository';
import { category } from './../../domain/models/category';
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
import { courseList } from '../../app/usecases/tutor/showCourses';
import { fetchCourseDetails } from '../../app/usecases/tutor/courseDetails';
import { classUpload } from '../../app/usecases/tutor/classUpload';
import { profileEdit } from '../../app/usecases/tutor/editProfile';
import { fetchSubcategory } from '../../app/usecases/tutor/fetchSubcategory';
import { studentModel } from '../../infra/database/studentModel';
import { fetchStudentData } from '../../app/usecases/admin/fetchStudent';
import { fetchGraphData } from '../../app/usecases/tutor/fetchGraphData';
import { TutorialEdit } from '../../app/usecases/tutor/TutorialEdit';
import { fetchStud } from '../../app/usecases/tutor/fetchStudents';
const jwt=require('jsonwebtoken');

const JWT_SECRET='your-secret-key';  
const db = tutorModel;
const tutorRepository = tutorRepositoryImpl(db);

const cateDb = categoryModel;
const categoryRepository = categoryRepositoryImpl(cateDb);

const courseDb = courseModel;
const courseRepository = courseRepositoryImpl(courseDb);

const studDb = studentModel;
const studentRepository = studentRepositoryImpl(studDb);
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
    const expirationTime = Math.floor(Date.now() / 1000) + 2 * 60 * 60 * 1000;
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
                // console.log('tootr=',tutor);
                
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
      const {profileLocation,bannerLocation,description,niche,tutId} = req.body;
      const profileData = await profileAdd(tutorRepository)(profileLocation,bannerLocation,description,niche,tutId);
    //   console.log(profileData);
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
    console.log('aaa');
    
   console.log('tut id=',req.params.tutId);
   try{
     const tutId = req.params.tutId;
     const profileData = await fetchProfileData(tutorRepository)(tutId)
     console.log('prof data =',profileData);
     
     if(profileData){
        res.json({success:'Profile data fetching successful',profileData});
    }else{
        res.json({ invalid: "Profile data fetching failed!" });
    }  
   }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }  
}

//Edit Profile
export const editProfile = async(req:Request,res:Response)=>{
    try{
        console.log('tut id=',req.params.tutId);
        console.log('datssssss=',req.body);
        const {profileLocation,bannerLocation,description,niche,tutId} = req.body;
        // const {profileLocation,bannerLocation} = req
        const profileData = await profileEdit(tutorRepository)(profileLocation,bannerLocation,description,niche,tutId);
        // console.log('pro=',profileData);
        if(profileData){
          res.json({message:'Tutor Profile Edit Success',isBlocked:true,isEdit:true});
      }else{
          res.json({message:'Tutor Profile Edit Failed!'})
      }
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    } 
}

//Show Category
export const showCategory = async(req:Request,res:Response)=>{
    try{
        // console.log('okkkkkkkkkkkkkkkkkkkkkkk');
        
        const cateData = await fetchCategoryData(categoryRepository)();
        
        if(cateData){
            
         
            const newArray = cateData.map(obj=>{return {...obj}})
            // const newArray = cateData.map(obj=>{return {...obj,subcategory:obj.subcategory}})
            // console.log('kk',newArray);
            res.json({success:'Category data fetching successful',newArray});
        }else{
            res.json({ invalid: "No category data available!" });
        }  
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }  
}

//Show Subcategory
export const showSubcategory = async(req:Request,res:Response)=>{
    try{
     const category = req.params.cat;
     console.log('catt=',category);
     const subCategory = await fetchSubcategory(categoryRepository)(category);
     console.log('subb=',subCategory);
     if(subCategory){
        res.json({success:'Subcategories fetch successful',subCategory});
       }else{
        res.json({ invalid: "Subcategories fetch failed!" });
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

//Show Courses
 export const showCourses = async(req:Request,res:Response)=>{
    try{
        const tutId = req.params.tutId;
        console.log('new tutid=',tutId);
        
        const courseData = await courseList(courseRepository)(tutId);
        // console.log('costut=',courseData);
        if(courseData){
            res.json({success:'Course fetching successful',courseData});
           }else{
            res.json({ invalid: "Course fetching failed!" });
           }  
         
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    } 
 }
  
 //Show Course Details
 export const showCourseDetails = async(req:Request,res:Response)=>{
    try{
       const id = req.params.courseId;
       console.log('ciddd=',id);
       
       const courseData = await fetchCourseDetails(courseRepository)(id);
    //    console.log('hhh=',courseData);
       if(courseData){
        res.json({success:'Course fetching successful',courseData});
       }else{
        res.json({ invalid: "Course fetching failed!" });
       }  
       
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    } 
 }

 //Upload class
 export const uploadClass = async(req:Request,res:Response)=>{
    try{
      const {videoLocation,thumbnailLocation,title,description,courseId,id} = req.body;
      console.log('title=',title);
      console.log('vdo=',videoLocation);
      const tutorial = await classUpload(courseRepository)(videoLocation,thumbnailLocation,title,description,courseId,id);
      console.log('tutorial=',tutorial);
      if(tutorial){
        res.json({success:'Tutorial upload successful',tutorial});
    }else{
        res.json({ invalid: "Tutorial upload failed!" });
    }   
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
 }

 //Fetch Students
 export const fetchStudents = async(req:Request,res:Response)=>{
    try{
        console.log('controller ok');
        const {tutId} = req.body;
        // const students = await fetchStudentData(studentRepository)();
        const students = await fetchStud(courseRepository)(tutId);
        if(students){
            console.log('stdd=',students);
            res.json({success:'Student fetch successful',students});
        }else{
            res.json({ invalid: "Student fetch failed!" });
        }   
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
 }

 //Edit Tutorials
 export const editTutorial = async(req:Request,res:Response)=>{
    try{
      const{courseId,newTitle,newDescription,ImgLocation,VdoLocation,img,videoUrl,vdoId,index} = req.body;
      console.log('cidddddddddddddddddddddddddddddddddddddd=',courseId);
      console.log('title=',newTitle);
      console.log('Imgloc=',ImgLocation);
      console.log('Vdo=',VdoLocation);
      console.log('Desc=',newDescription);
      console.log('Img=',img);
      console.log('Vdourl=',videoUrl);
      console.log('VdoId=',vdoId);
      const editData = await TutorialEdit(courseRepository)(courseId,newTitle,newDescription,ImgLocation,VdoLocation,img,videoUrl,vdoId,index);
    }catch(error){
        console.log('errr=',error);  
        
        res.status(500).json({ message: "Internal server error" });
    }
 }
     
 //Dashboard Data
export const dashboardData = async(req:Request,res:Response) =>{
    try{
     const tutId = req.params.tutId;
     console.log('tutu=',tutId);
     
     const dashData = await courseList(courseRepository)(tutId);
     const totalCourses = dashData?.length;
     console.log('dttd=',totalCourses);
     
     dashData?.map((obj)=>{console.log('okk--',obj.stud);}
     )
    //  console.log('dashhh=',dashData);
     const graphData = await fetchGraphData(courseRepository)(tutId);
     console.log('graph=',graphData);

    //  const barData = await fetc
     
     res.json({message:'Data fetched successfully',graphData,dashData})
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
}