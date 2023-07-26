import { Course } from '../../../domain/models/course';
import { UpdateResult } from '../../../domain/models/update';
import { courseRepository } from './../../../infra/repositories/courseRepository';
export const coursePayment = (courseRepository:courseRepository)=>async(courseId : string, status:boolean, studId:string):Promise<Course | UpdateResult | void>=>{
  const result = await courseRepository.coursePayment(courseId,status,studId);
  return result;
}