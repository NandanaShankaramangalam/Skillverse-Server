import { UpdateResult } from './../../../domain/models/update';
import { studentRepository } from './../../../infra/repositories/studentRepository';
import { student } from '../../../domain/models/student';
export const updatePersonalInfo = (studentRepository:studentRepository)=> async(fname:string,lname:string,username:string,email:string,studId:string):Promise<student | UpdateResult | void> => {
   console.log('sid=',studId);
   const info = await studentRepository.updateInfo(fname,lname,username,email,studId)
   return info
}