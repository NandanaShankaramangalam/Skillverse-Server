import { courseRepository } from './../../../infra/repositories/courseRepository';
export const getSavedCourses = (courseRepository:courseRepository) => async(studId:string) =>{
    const result = await courseRepository
}