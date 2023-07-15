import { Course } from '../../../domain/models/course';
import { courseRepository } from '../../../infra/repositories/courseRepository';
export const courseList = (courseRepository:courseRepository)=>async()=>{
    const courseData : Course[] = await courseRepository.fetchTutorCourses();
    if(courseData){
        return courseData;
    }
    return null;
}