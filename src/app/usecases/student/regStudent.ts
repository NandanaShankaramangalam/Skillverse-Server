import { studentRepository } from './../../../infra/repositories/studentRepository';
import { student } from "../../../domain/models/student";

export const registerStudent = (studentRepository:studentRepository)=>async(fname:string,lname:string,username:string,email:string,password:string):Promise<student>=>{

  const newStudent : student = {
    fname,
    lname,
    username,
    email,
    password
  }  
  const createdStudent = await studentRepository.create(newStudent);
  return createdStudent;
}