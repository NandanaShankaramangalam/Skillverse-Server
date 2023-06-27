import { studentRepository } from './../../../infra/repositories/studentRepository';
import { student } from './../../../domain/models/student';

export const fetchStudentData = (studentRepository:studentRepository)=>async()=>{
    const studData : student[] = await studentRepository.findStudents();
    if(studData){
        return studData;
    }
    return null;
}