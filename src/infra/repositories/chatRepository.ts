import { student } from './../../domain/models/student';
import mongoose from 'mongoose';
import { Chat } from '../../domain/models/chat';
import { MongoDBChat, chatModel } from './../database/chatModel';

export type chatRepository = {
  createChat : (studId:string,tutId:string) => Promise<Chat | Chat[] | null>;
  getAllChats : (studId:string,tutId:string) => Promise<Chat | Chat[] | null>;
}
export const chatRepositoryImpl = (chatModel:MongoDBChat):chatRepository=>{
 
    //Create Chat
    const createChat = async(studId:string,tutId:string):Promise<Chat | Chat[] | null>=>{
      try{
        const studid=new mongoose.Types.ObjectId(studId)
        const tutid=new mongoose.Types.ObjectId(tutId)
        const isChat = await chatModel.find({
                $and:[
                    {student:studid},
                    {tutor:tutid}
                ]
            }).populate("student","-password").populate("tutor","-password").populate("latestMessage");
            console.log('ischat=',isChat);
        if(isChat){
            return isChat
        }
        else{
            const chatData:Chat={
                chatName:'sender',
                student : studid,
                tutor : tutid   
            }
            const createdChat=await chatModel.create(chatData)
            const fullChat=await chatModel.findOne({_id:createdChat._id}).populate('student','-password').populate('tutor','-password')
            return fullChat
        }
      }catch (error) {
            console.error('Error creating course:', error);
            throw error; // or handle the error appropriately
          }
    }

    //Get all chats
    const getAllChats = async(studId:string,tutId:string):Promise<Chat | Chat[] | null>=>{
        try{
            const studid= new mongoose.Types.ObjectId(studId)
            const tutid= new mongoose.Types.ObjectId(tutId)
            const chats=chatModel.find({
                $and:[
                    {student:studid},
                    {tutor:tutid}
                ]
            }).populate("student","-password").populate("tutor","-password").populate("latestMessage").sort({updatedAt:-1});
             return chats
        }catch (error) {
            console.error('Error creating course:', error);
            throw error; // or handle the error appropriately
          }
    }
    
    return{
        createChat,
        getAllChats,
    }
}
