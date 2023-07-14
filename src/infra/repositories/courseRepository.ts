import { ObjectId } from 'mongodb';
import { category } from './../../domain/models/category';
import { Course } from "../../domain/models/course";
import { MongoDBCourse, courseModel } from "../database/courseModel";

export type courseRepository = {
    createCourse : (course : Course) => Promise<Course>;
    fetchCourse : (selectedCategory : string) => Promise<Course[]>;
    fetchCourseData : (id : string) => Promise<Course | undefined>;
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
    return{
        createCourse,
        fetchCourse,
        fetchCourseData,
    }
}