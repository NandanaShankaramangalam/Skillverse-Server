import { tutorRepository } from "../../../infra/repositories/tutorRepository";

export const passwordReset = (tutorRepository:tutorRepository) => async(email:string,password:string)=>{
    const result = await tutorRepository.resetPassword(email,password);
    return result ? result : null;
}