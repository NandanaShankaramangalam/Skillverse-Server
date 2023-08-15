import { courseRepository } from './../../../infra/repositories/courseRepository';

export const fetchStud = (courseRepository:courseRepository) => async(tutId:string) =>{
  const data = await courseRepository.fetchStudents(tutId);
  return data? data :  null;
}