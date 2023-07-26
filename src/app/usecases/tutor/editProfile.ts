import { tutor } from "../../../domain/models/tutor";
import { UpdateResult } from "../../../domain/models/update";
import { tutorRepository } from "../../../infra/repositories/tutorRepository";

export const profileEdit = (tutorRepository:tutorRepository)=>async(profileLocation:string,bannerLocation:string,description:string,niche:string,tutId:string):Promise<tutor | UpdateResult | void>=>{
  const profile = await tutorRepository.editTutorProfile(profileLocation,bannerLocation,description,niche,tutId);
  console.log('usecse pro=',profile);
  
  return profile;
}