import { tutorRepository } from "../../../infra/repositories/tutorRepository";
import { tutor } from "../../../domain/models/tutor";
import { UpdateResult } from "../../../domain/models/update";


export const profileAdd = (tutorRepository:tutorRepository)=>async(profileLocation:string,bannerLocation:string,description:string,niche:string,tutId:string):Promise<tutor | UpdateResult | void>=>{
   const profile   = await tutorRepository.addTutorProfile(profileLocation,bannerLocation,description,niche,tutId)
   console.log('profile=',profile);
   return profile; 
}