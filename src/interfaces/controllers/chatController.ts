import { chatRepository, chatRepositoryImpl } from './../../infra/repositories/chatRepository';
import { Request,Response } from "express";
import { chatModel } from "../../infra/database/chatModel";
import { chatAccess } from '../../app/usecases/chat/accessChat';
import { getChats } from '../../app/usecases/chat/getChats';

const chatDb = chatModel;
const chatRepository = chatRepositoryImpl(chatDb);

//Create Chat
export const accessChat = async(req:Request,res:Response)=>{
    try{
       const {studId,tutId} = req.body;       
       if(!studId || !tutId){
        res.status(400).json({ message: "Internal server error" });
       }else{

        const isChat = await chatAccess(chatRepository)(studId,tutId);
        console.log('isChattt=',isChat);
        
        // const isChat = await chatModel.find({
        //     $and:[
        //         {student:studId},
        //         {tutor:tutId}
        //     ]
        // }).populate("student","-password").populate("tutor","-password").populate("latestMessage");
        // console.log('ischat=',isChat);
        
       }
    }catch (error) {
        
        res.status(500).json({ message: "Internal server error" });
      }
}

//Fetch Chats
export const fetchChat = async(req:Request,res:Response)=>{
    try{
       const studId = req.params.studId;
       const tutId = req.params.tutId;
       const allChats = await getChats(chatRepository)(studId,tutId);
       console.log(allChats);
        

    }catch (error) {
        
        res.status(500).json({ message: "Internal server error" });
      }
}