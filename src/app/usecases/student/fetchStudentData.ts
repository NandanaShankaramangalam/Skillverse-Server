import { studentRepository } from "../../../infra/repositories/studentRepository";

export const fetchStudentData = (studentRepository:studentRepository)=>async(id:string)=>{
    const data = await studentRepository.fetchPersonalInfo(id);
    if(data){
        return data;
    }
    return null;
}