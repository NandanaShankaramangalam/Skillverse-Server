import { Course } from '../../../domain/models/course';
import { courseRepository } from './../../../infra/repositories/courseRepository';

export const fetchCourses = (courseRepository:courseRepository)=>async(selectedCategory:string)=>{
    const courseData : Course[] = await courseRepository.fetchCourse(selectedCategory)
    if(courseData){
        console.log('llllllllllllllllllllllllllllllllll=',courseData);
        
        return courseData
    }
    return null;
}