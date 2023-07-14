import { Course } from '../../../domain/models/course';
import { courseRepository } from './../../../infra/repositories/courseRepository';
export const fetchCourse = (courseRepository:courseRepository)=>async(id:string)=>{
    const data = await courseRepository.fetchCourseData(id);
    if(data){
        return data;
    }
    return null;
}