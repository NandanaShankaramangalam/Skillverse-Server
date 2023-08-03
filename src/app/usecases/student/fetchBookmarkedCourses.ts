import { Course } from '../../../domain/models/course';
import { courseRepository } from './../../../infra/repositories/courseRepository';
export const getSavedCourses = (courseRepository:courseRepository) => async(studId:string)=>{
    const result = await courseRepository.fetchSavedCourses(studId);
    return result?result:null
}