import { tutor } from "../../../domain/models/tutor";
import { tutorRepository } from "../../../infra/repositories/tutorRepository";

export const fetchProfileData = (tutorRepository:tutorRepository)=>async(tutId:string)=>{
    const profileData = await tutorRepository.findTutorProfile(tutId)
    return  profileData ? profileData : null;
}