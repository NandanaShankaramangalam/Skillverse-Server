import { courseRepository } from './../../../infra/repositories/courseRepository';
export const getPurchasedCourses = (courseRepository:courseRepository) => async(studId:string) =>{
    const result = await courseRepository.fetchPurchasedCourses(studId);
    return result ? result : null;
}