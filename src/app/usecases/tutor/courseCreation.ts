import { Course } from './../../../domain/models/course';
import { courseRepository } from "../../../infra/repositories/courseRepository";

export const courseCreation = (courseRepository:courseRepository)=>async(title:string,fee:number,category:string,subcategory:string[],description:string,thumbnail:string,video:string,tutId:string):Promise<Course>=>{
 console.log('title=',title);
 console.log('catgry=',category);
 
  const newCourse : Course = {
    title,
    fee,
    category,
    subcategory,
    description,
    thumbnail,
    video,
    tutId
  }
  const createdCourse = await courseRepository.createCourse(newCourse);
  console.log('created course=',createdCourse);
  
  return createdCourse;
}