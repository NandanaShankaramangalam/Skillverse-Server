import { chatRepository } from './../../../infra/repositories/chatRepository';
export const chatAccess = (chatRepository:chatRepository)=>async(studId:string,tutId:string)=>{
    console.log(studId,tutId);
    const chat = await chatRepository.createChat(studId,tutId);
    return chat? chat : null;
}