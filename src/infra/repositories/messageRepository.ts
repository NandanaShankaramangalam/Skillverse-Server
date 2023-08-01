import { student } from './../../domain/models/student';
import mongoose from "mongoose"
import { MongoDBMessage, MsgModel } from "../database/messageModel"
import {Message} from './../../domain/models/chat'
import { chatModel } from "../database/chatModel"

export type messageRepository = {
  sendMsg:(content:string,chatId:string,student:string)=>Promise<Message>
  tutorSendMsg:(content:string,chatId:string,tutor:string)=>Promise<Message>
  getMsgsByChatId:(chatId:string)=>Promise<Message[]>
}

export const messageRepositoryImpl = (MsgModel:MongoDBMessage):messageRepository=>{
    
    //Send Messages   
    const sendMsg = async(content:string,chatId:string,student:string):Promise<Message>=>{
        const newChat:Message={
            student:new mongoose.Types.ObjectId(student),
            // tutor:new mongoose.Types.ObjectId(tutId),
            content,
            chat:new mongoose.Types.ObjectId(chatId),
        }
        let message=await MsgModel.create(newChat)
        message =await message.populate("student",'_id firstname lastname username profileImg')   
        message =await message.populate("tutor",'_id firstname lastname username profileImg')   
        message=await message.populate('chat')
        message=await message.populate('chat.student')
        message=await message.populate('chat.tutor')

        await chatModel.updateOne({_id:new mongoose.Types.ObjectId(chatId)},{$set:{latestMessage:message}})

        return message
    }

    //Tutor Send Messages
    const tutorSendMsg = async(content:string,chatId:string,tutor:string):Promise<Message>=>{
        const newChat:Message={
            // currentUserId:new mongoose.Types.ObjectId(currentUserId),
            tutor:new mongoose.Types.ObjectId(tutor),
            content,
            chat:new mongoose.Types.ObjectId(chatId),
        }
        let message=await MsgModel.create(newChat)
        message =await message.populate("student",'_id firstname lastname username profileImg')   
        message =await message.populate("tutor",'_id firstname lastname username profileImg')   
        message=await message.populate('chat')
        message=await message.populate('chat.student')
        message=await message.populate('chat.tutor')    

        await chatModel.updateOne({_id:new mongoose.Types.ObjectId(chatId)},{$set:{latestMessage:message}})
    
        return message
    }

    //Get messages
    const getMsgsByChatId=async(chatId:string):Promise<Message[]>=>{
        const messages = await MsgModel.find({chat:new mongoose.Types.ObjectId(chatId)}).populate("student",'firstname lastname username profileImg').populate("tutor",'firstname lastname username profileImg')
        .populate('chat')
        return messages
    }
    return{
      sendMsg,
      tutorSendMsg,
      getMsgsByChatId,
    }
}