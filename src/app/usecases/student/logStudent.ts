import { studentRepository } from './../../../infra/repositories/studentRepository';
import { student } from "../../../domain/models/student";

export const loginStudent = (studentRepository:studentRepository)=>async(email:string,password:string):Promise<student | null | object>=>{

  const stud :student | null = await studentRepository.findByEmail(email);
  if(stud && stud.password === password){
    if(!stud.status){
      return {block : true}
    }
    stud.block = false;
    return stud;
  }
    return null; 
  }  
  