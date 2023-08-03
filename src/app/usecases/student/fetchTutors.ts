import { tutorRepository } from "../../../infra/repositories/tutorRepository"

export const getTutorsList = (tutorRepository:tutorRepository) => async() =>{
    const result = await tutorRepository.findTutors();
    return result ? result : null;
}