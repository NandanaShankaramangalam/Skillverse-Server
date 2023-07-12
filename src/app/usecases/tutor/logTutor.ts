import { tutorRepository } from './../../../infra/repositories/tutorRepository';
import { tutor } from "../../../domain/models/tutor";

export const loginTutor = (tutorRepository:tutorRepository)=>async(email:string,password:string):Promise<tutor | null | object>=>{
  const tut :tutor | null = await tutorRepository.findByEmail(email);
  console.log('tut=',tut);
  
  console.log('tut.status=',tut?.status);
  
  if(tut && tut.password === password){
    if(!tut.status){
      return {block : true}
    }
    
    tut.block=false
    return tut;
  }
    return null; 
}
