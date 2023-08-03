import { studentRepository } from "../../../infra/repositories/studentRepository";

export const passwordReset = (studentRepository:studentRepository) => async(email:string,password:string)=>{
    const result = await studentRepository.resetPassword(email,password);
    return result ? result : null;
}