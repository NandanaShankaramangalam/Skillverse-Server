import { chatRepository } from './../../../infra/repositories/chatRepository';

export const getTutorChats = (chatRepository:chatRepository)=>async(tutId:string)=>{
   const chats = await chatRepository.getAllTutorChats(tutId);
   return chats
}