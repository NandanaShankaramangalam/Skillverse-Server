import { Course } from '../../../domain/models/course';
import { courseRepository } from './../../../infra/repositories/courseRepository';
export const fetchCourseDetails = (courseRepository:courseRepository) => async(id:string) =>{
    const courseData : Course | null = await courseRepository.fetchCourseDetails(id);
    return courseData ? courseData : null;
}