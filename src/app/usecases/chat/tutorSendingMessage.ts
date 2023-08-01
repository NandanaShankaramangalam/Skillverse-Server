import { messageRepository } from './../../../infra/repositories/messageRepository';
export const tutorSendingMessage = (messageRepository:messageRepository)=>async(content:string,chatId:string,tutor:string)=>{
  const message = await messageRepository.tutorSendMsg(content,chatId,tutor);
  return message;
}