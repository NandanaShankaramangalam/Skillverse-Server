import { messageRepository } from './../../../infra/repositories/messageRepository';
export const getAllMessages = (messageRepository:messageRepository)=>async(chatId:string)=>{
    const messages = await messageRepository.getMsgsByChatId(chatId)
    return messages;
}