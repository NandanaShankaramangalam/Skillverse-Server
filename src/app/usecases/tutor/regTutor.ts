import { tutorRepository } from './../../../infra/repositories/tutorRepository';
import { tutor } from "../../../domain/models/tutor";
import { ObjectId } from 'mongoose';

export const registerTutor = (tutorRepository:tutorRepository)=>async(fname:string,lname:string,username:string,email:string,password:string):Promise<tutor>=>{
  
    const newTutor : tutor = {
        fname,
        lname,
        username,
        email,
        password
      }  
      const createdTutor = await tutorRepository.create(newTutor);
      
      return createdTutor;
}