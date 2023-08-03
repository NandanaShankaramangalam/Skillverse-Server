// import { UpdateResult } from './studentRepository';
import { ObjectId } from 'mongodb';
import { category } from './../../domain/models/category';
import { Course } from "../../domain/models/course";
import { MongoDBCourse, courseModel } from "../database/courseModel";
import { UpdateResult } from '../../domain/models/update';

export type courseRepository = {
    createCourse : (course : Course) => Promise<Course>;
    fetchCourse : (selectedCategory : string) => Promise<Course[]>;
    fetchCourseData : (id : string) => Promise<Course | undefined>;
    fetchTutorCourses : (tutId:string) => Promise<Course[]>;
    fetchCourseDetails : (id:string) => Promise<Course | null>;
    insertTutorial : (videoLocation:string,thumbnailLocation:string,title:string,description:string,courseId:string) => Promise<Course | null | UpdateResult>;
    coursePayment : (id:string,status:boolean,studId:string) => Promise<Course | void | UpdateResult>;
    bookmarkCourse : (courseId:string,studId:string) => Promise<Course | void | UpdateResult>;
    removeBookmark : (courseId:string,studId:string) => Promise<Course | void | UpdateResult>;
    fetchSavedCourses : (studId:string) => Promise<Course[]|null>;
    fetchPurchasedCourses : (studId:string) => Promise<Course[]|null>;
}    

export const courseRepositoryImpl = (courseModel:MongoDBCourse):courseRepository=>{
    //Create Course
    const createCourse = async(course:Course):Promise<Course>=>{
        try{
          console.log('okeyyyy');
          console.log('course=',course);
          
        const createdCourse=await courseModel.create(course)
        console.log('hiiii-',createdCourse);
        return createdCourse.toObject();  
        }catch (error) {
            console.error('Error creating course:', error);
            throw error; // or handle the error appropriately
          }
        
    }
    
    //Fetch courses
    const fetchCourse = async(selectedCategory:string):Promise<Course[]>=>{
        const course = await courseModel.find({category:selectedCategory});
        return course.map((obj)=>obj.toObject());
    }

    //Fetch Course Details
    const fetchCourseData = async(id:string):Promise<Course | undefined>=>{
        try{
            const courseData = await courseModel.findOne({_id:new ObjectId(id)});
            // console.log('cosdata=',courseData);
            return courseData?.toObject();
        }catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
          }
        
    }

    //Fetch Courses for Tutor
    const fetchTutorCourses = async(tutId:string):Promise<Course[]>=>{
       try{
         const courseData = await courseModel.find({tutId:tutId});
         return courseData.map((obj)=>obj.toObject());
       }catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
          }
    }

    //Fetch Course Details for tutor
    const fetchCourseDetails = async(id:string):Promise<Course | null>=>{
       try{
        const courseData = await courseModel.findOne({_id:new ObjectId(id)});
        return courseData ? courseData.toObject() : null;
       }catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
          }
    }

    //Upload tutorial 
    const insertTutorial = async(videoLocation:string,thumbnailLocation:string,title:string,description:string,courseId:string):Promise<Course | null | UpdateResult>=>{
      try{
        const tutorial = await courseModel.updateOne({_id:new ObjectId(courseId)},{ $push: { tutorial: { title: title, description: description, video:videoLocation, thumbnail: thumbnailLocation }}})
        if(tutorial.modifiedCount>0){
          console.log('modifiedcount of add tutorial');
          return tutorial
        } 
        return null
      }catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
          }
    }

    //Payment
    const coursePayment = async(id:string,status:boolean,studId:string):Promise<Course | void | UpdateResult>=>{
      try{
          const payment = await courseModel.updateOne(
          {_id:new ObjectId(id)},
          {
          // $set:{paymentStatus:status},
          $push:{students:studId}}
          );

          if(payment.modifiedCount>0){
            console.log('modifiedcount blk ok');
            return payment
          }
      }catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
          }

    }

    //Bookmark a course
   const bookmarkCourse = async(courseId:string,studId:string):Promise<Course | void | UpdateResult>=>{
    try{
      const bookmark = await courseModel.updateOne({_id:new ObjectId(courseId)},
      {$push:{bookmarks:studId}});
      if(bookmark.modifiedCount>0){
        return bookmark
      }
    }catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
          }
   }

   //Remove Bookmareked Courses
   const removeBookmark = async(courseId:string,studId:string):Promise<Course | void | UpdateResult>=>{
    try{
      const bookmark = await courseModel.updateOne({_id:new ObjectId(courseId)},
      {$pull:{bookmarks:studId}});
      if(bookmark.modifiedCount>0){
        return bookmark
      }
    }catch (error) {
      console.error('Error occured:', error);
      throw error; // or handle the error appropriately
    }
   }

  //  Fetch all bookmarked courses
   const fetchSavedCourses = async(studId:string):Promise<Course[]|null>=>{
    try{
      // console.log('sid=',studId);
      
     const courses = await courseModel.aggregate([
      {
        $match:{
          bookmarks:{$in:[studId]}
        }
        // $lookup:{
        //   from:'students',
        //   localField:'students',
        //   foreignField:'studId',
        //   as:'Students'
        // }
      }
     ])
     return courses
    }catch (error) {
      console.error('Error occured:', error);
      throw error; // or handle the error appropriately
    }
   }

   //Fetch Purchased Courses
   const fetchPurchasedCourses = async(studId:string):Promise<Course[]|null>=>{
    const courses = await courseModel.aggregate([
      {
        $match:{
          students:{$in:[studId]}
        }
      }
     ])
    return courses
   }

    return{
        createCourse,
        fetchCourse,
        fetchCourseData,
        fetchTutorCourses,
        fetchCourseDetails,
        insertTutorial,
        coursePayment,
        bookmarkCourse,
        removeBookmark,
        fetchSavedCourses,
        fetchPurchasedCourses,
    }
}