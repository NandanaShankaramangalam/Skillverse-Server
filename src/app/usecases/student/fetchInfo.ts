import { student } from '../../../domain/models/student';
import { studentRepository } from './../../../infra/repositories/studentRepository';
export const fetchInfo = (studentRepository:studentRepository)=>async(studId:string)=>{
    const info : student|null = await studentRepository.fetchPersonalInfo(studId);
    if(info){
        return info;
    }
    return null;
}