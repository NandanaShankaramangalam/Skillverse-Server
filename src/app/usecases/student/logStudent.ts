import { studentRepository } from './../../../infra/repositories/studentRepository';
import { student } from "../../../domain/models/student";

export const loginStudent = (studentRepository:studentRepository)=>async(email:string,password:string):Promise<student | null>=>{

  const stud :student | null = await studentRepository.findByEmail(email);
  if(stud && stud.password === password){
    return stud;
  }
    return null; 
  }  
  