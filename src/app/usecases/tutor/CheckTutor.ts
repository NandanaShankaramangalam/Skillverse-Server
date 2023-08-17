import { tutorRepository } from "../../../infra/repositories/tutorRepository";

export const CheckTutor = (tutorRepository:tutorRepository) => async(email:string) =>{
    const result = await tutorRepository.findByEmail(email);
    return result? result: null;
}