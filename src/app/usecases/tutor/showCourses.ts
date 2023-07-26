import { Course } from '../../../domain/models/course';
import { courseRepository } from '../../../infra/repositories/courseRepository';
export const courseList = (courseRepository:courseRepository)=>async(tutId:string)=>{
    const courseData : Course[] = await courseRepository.fetchTutorCourses(tutId);
    if(courseData){
        return courseData;
    }
    return null;
}