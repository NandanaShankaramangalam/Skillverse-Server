import { messageRepository } from './../../../infra/repositories/messageRepository';
export const sendingMessage = (messageRepository:messageRepository)=>async(content:string,chatId:string,student:string)=>{
  const message = await messageRepository.sendMsg(content,chatId,student);
  return message;
}