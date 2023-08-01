import { chatRepository } from "../../../infra/repositories/chatRepository"

export const getChats=(chatRepository:chatRepository)=>async(studId:string)=>{
    const chats=await chatRepository.getAllStudentChats(studId)
    return chats
}