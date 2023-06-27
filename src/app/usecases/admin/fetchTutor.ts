import { tutor } from './../../../domain/models/tutor';
import { tutorRepository } from './../../../infra/repositories/tutorRepository';

export const fetchTutorData = (tutorRepository:tutorRepository)=>async()=>{
    const tutData : tutor [] = await tutorRepository.findTutors();
    if(tutData){
        return tutData;
    }
    return null;
}