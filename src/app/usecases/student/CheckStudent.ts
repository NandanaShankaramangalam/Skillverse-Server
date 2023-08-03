import { studentRepository } from "../../../infra/repositories/studentRepository";

export const CheckStudent = (studentRepository:studentRepository) => async(email:string) =>{
    const result = await studentRepository.findByEmail(email);
    return result? result: null;
}