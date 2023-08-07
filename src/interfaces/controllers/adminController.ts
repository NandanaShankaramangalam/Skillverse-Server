import { courseRepository, courseRepositoryImpl } from './../../infra/repositories/courseRepository';
import { categoryRepository, categoryRepositoryImpl } from './../../infra/repositories/categoryRepository';
import { category } from './../../domain/models/category';
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
import { createCategory } from '../../app/usecases/admin/addCategory';
import { categoryModel } from '../../infra/database/categoryModel';
import { fetchCategoryData } from '../../app/usecases/admin/fetchCategory';
import { CategoryList } from '../../app/usecases/admin/listCategory';
import { CategoryUnlist } from '../../app/usecases/admin/unlistCategory';
import { subCategoryAdd } from '../../app/usecases/admin/addSubcategory';
import { categoryEdit } from '../../app/usecases/admin/editCategory';
import { courseModel } from '../../infra/database/courseModel';
import { fetchCatData } from '../../app/usecases/admin/fetchCatData';
import { fetchBarData } from '../../app/usecases/admin/fetchBarData';

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';

const db = adminModel;
const adminRepository = adminRepositoryImpl(db);

const studDb = studentModel;
const studentRepository = studentRepositoryImpl(studDb);

const tutDb = tutorModel;
const tutorRepository = tutorRepositoryImpl(tutDb);

const cateDb = categoryModel;
const categoryRepository = categoryRepositoryImpl(cateDb);

const courseDb = courseModel;
const courseRepository = courseRepositoryImpl(courseDb);
//Admin Login
export const adminLogin = async(req:Request,res:Response)=>{
    console.log('reqst=',req.body);
    const {username,password} = req.body;
    
    const expirationTime = Math.floor(Date.now() / 1000) + 2 * 60 * 60 *1000;
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
    
    // console.log('cntrl id=',id);
    
    // const blocked =  blockStudent(studentRepository)(id);
    try{
        const {id} = req.body;
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
    
    // const subcate = req.body.subcategory;
    // const subcateArray = subcate.split(',');
    try{
        const category = req.body.category;
        const cateData = await createCategory(categoryRepository)(category)
        if(cateData){
            res.status(201).json({message:'Category added succesfully',cateData})
        }
        else{
            res.status(401).json({message:'Invalid datas'})
        }
    }catch(err){
        res.status(500).json({message:'Internal server error!'});
    }
}

//Fetch Category Data
export const showCategory = async(req:Request,res:Response)=>{
    try{
        // console.log('okkkkkkkkkkkkkkkkkkkkkkk');
             
        const cateData = await fetchCategoryData(categoryRepository)();
        
        if(cateData){
            
            // const newArray = cateData.map(obj=>{return {...obj,subcategory:obj.subcategory.join()}})
            const newArray = cateData.map(obj=>{return {...obj}})
            console.log('kk',newArray);
            res.json({success:'Category data fetching successful',newArray});
        }else{
            res.json({ invalid: "No category data available!" });
        }  
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }  
}

//List Category
export const listCategory = async(req:Request,res:Response)=>{
    console.log('list cat = ',req.body);
    const {id} = req.body;
    console.log('cntrl list cat id=',id);
    try{
        const listData = await CategoryList(categoryRepository)(id);
        console.log('listdata',listData);
        if(listData){
            res.json({message:'category listed',isListed:true})
        }else{
            res.json({message:'category list failed'})
        }
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }  
}

//Unlist Category
export const unlistCategory = async(req:Request,res:Response)=>{
    console.log('unlist cat = ',req.body);
    const {id} = req.body;
    console.log('cntrl unlist cat id=',id);
    try{
        const unlistData = await CategoryUnlist(categoryRepository)(id);
        console.log('unlist in cntrl',unlistData);
        if(unlistData){
            res.json({message:'Category unlisted',isUnlist:true})
        }else{
            res.json({message:'Category unlist failed'})
        }
    }catch(err){      
        console.log(err);  
    }
}

//Add Subcategory
export const addSubcategory = async(req:Request,res:Response)=>{
  console.log('subctgry=',req.body);
  const {subcategory,cid} = req.body;
  try{
    const subCategoryData = await subCategoryAdd(categoryRepository)(subcategory,cid);
    console.log('subcat in cntrl',subCategoryData);
    if(subCategoryData){
        res.json({message:'Subcategory added successfully'})
    }else{
        res.json({message:'Subcategory add failed'})
    }
}catch(err){
    console.log(err);
                          
}
}

//Edit Category
export const editCategory = async(req:Request,res:Response)=>{
    console.log('catgry=',req.body);
    const {category,cid} = req.body;
    try{
        const editCategoryData = await categoryEdit(categoryRepository)(category,cid);
        console.log('edit cat',editCategoryData);
        if(editCategoryData){
            res.json({message:'Category edited successfully'})
        }else{
            res.json({message:'Category edit failed'})
        }
        
    }catch(err){
        console.log(err);
                              
    }
    
}

//Dashboard Data
export const dashboardData = async(req:Request,res:Response)=>{
    try{
     const studData = await fetchStudentData(studentRepository)();
     const studCount = studData?.length;
    //  console.log('stcnt=',studData);
     const tutData = await fetchTutorData(tutorRepository)();
     console.log('tutdta=',tutData);
     const tutCount = tutData?.length;
     const tutBlockCount = tutData?.filter((obj)=>obj.status===false).length;
     console.log('tutblco=',tutBlockCount);
    const catData = await fetchCategoryData(categoryRepository)();
        // console.log('catData=',catData);
    const catCount = catData?.length;
        // console.log('catcnt=',catCount);
        const pieChartData = await fetchCatData(courseRepository)();
        console.log('hhggb=',pieChartData);
    const barData = await fetchBarData(courseRepository)();
    console.log('baaarr=',barData);
    
        res.json({message:'Data fetched successfully',studCount,tutCount,catCount,tutBlockCount,pieChartData,barData});
        
    }catch(err){
        console.log(err);                          
    }
}
