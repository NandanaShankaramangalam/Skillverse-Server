import { tutorRepository } from './../../../infra/repositories/tutorRepository';
import { tutor } from "../../../domain/models/tutor";

export const loginTutor = (tutorRepository:tutorRepository)=>async(email:string,password:string):Promise<tutor | null>=>{
  const tut :tutor | null = await tutorRepository.findByEmail(email);
  if(tut && tut.password === password){
    return tut;
  }
    return null; 
}
