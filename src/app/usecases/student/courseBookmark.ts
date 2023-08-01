import { Course } from '../../../domain/models/course';
import { UpdateResult } from '../../../domain/models/update';
import { courseRepository } from './../../../infra/repositories/courseRepository';
export const courseBookmark = (courseRepository:courseRepository)=>async(courseId:string,studId:string):Promise<Course | void | UpdateResult>=>{
    const result = await courseRepository.bookmarkCourse(courseId,studId);
    return result && result
}