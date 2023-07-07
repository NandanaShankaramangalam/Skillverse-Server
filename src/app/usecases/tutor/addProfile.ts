import { tutorRepository } from "../../../infra/repositories/tutorRepository";
import { tutor } from "../../../domain/models/tutor";
import { UpdateResult } from "../../../domain/models/update";


export const profileAdd = (tutorRepository:tutorRepository)=>async(fileLocation:string,description:string,tutId:string):Promise<tutor | UpdateResult | void>=>{
   const profile   = await tutorRepository.addTutorProfile(fileLocation,description,tutId)
   console.log('profile=',profile);
   return profile  
}