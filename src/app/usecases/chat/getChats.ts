import { chatRepository } from "../../../infra/repositories/chatRepository"

export const getChats=(chatRepository:chatRepository)=>async(studId:string,tutId:string)=>{
    const chats=await chatRepository.getAllChats(studId,tutId)
    return chats
}