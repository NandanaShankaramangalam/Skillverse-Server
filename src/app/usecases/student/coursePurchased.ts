import { studentRepository } from './../../../infra/repositories/studentRepository';
export const coursePurchased = (studentRepository:studentRepository)=>async(courseId:string, status:boolean, studId:string)=>{
    const data = await studentRepository.coursePurchased(courseId ,status , studId);
    if(data){
        return data;
    }
    return null; 
}