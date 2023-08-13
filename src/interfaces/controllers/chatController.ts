import { chatRepository, chatRepositoryImpl } from './../../infra/repositories/chatRepository';
import { Request,Response } from "express";
import { chatModel } from "../../infra/database/chatModel";
import { chatAccess } from '../../app/usecases/chat/accessChat';
import { getChats } from '../../app/usecases/chat/getChats';
import { MsgModel } from '../../infra/database/messageModel';
import { messageRepositoryImpl } from '../../infra/repositories/messageRepository';
import { sendingMessage } from '../../app/usecases/chat/sendMessage';
import { getAllMessages } from '../../app/usecases/chat/getMessages';
import { getTutorChats } from '../../app/usecases/chat/getTutorChats';
import { tutorSendingMessage } from '../../app/usecases/chat/tutorSendingMessage';

const chatDb = chatModel;
const chatRepository = chatRepositoryImpl(chatDb);

const msgDb = MsgModel;
const messageRepository = messageRepositoryImpl(MsgModel)
//Create Chat
export const accessChat = async(req:Request,res:Response)=>{
    try{
       const {studId,tutId} = req.body;       
       if(!studId || !tutId){
        res.status(400).json({ message: "Internal server error" });
       }else{

        const isChat = await chatAccess(chatRepository)(studId,tutId);
        // console.log('isChattt=',isChat);
        res.json({message:"success",isChat})
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

//Fetch Student Chats
export const fetchStudentChat = async(req:Request,res:Response)=>{
    try{
       const studId = req.params.studId;
      //  console.log('st cntrl id=',studId);
       
      //  const tutId = req.params.tutId;
       const allChats = await getChats(chatRepository)(studId);
      //  console.log(allChats);
       res.json({message:'student chat fetch success',allChats})

    }catch (error) {   
        
        res.status(500).json({ message: "Internal server error" });
      }
}
//Fetch Tutor Chats
export const fetchTutorChat = async(req:Request,res:Response)=>{
  try{
    const tutId = req.params.tutId;
    const allChats = await getTutorChats(chatRepository)(tutId);
    // console.log(allChats);
    res.json({message:'tutor chat fetch success',allChats})
  }catch (error) {
        
        res.status(500).json({ message: "Internal server error" });
      }
}

// //Send Messages
// export const sendMessage=async(req:Request,res:Response)=>{
//   try{
//   const {content,chatId,studId,tutId}=req.body
//   const msg=await sendingMessage(messageRepository)(content,chatId,studId,tutId)
//   console.log('msgg=',msg); 
//   res.json({message:'success',msg})  
//   }catch (error) {      
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

//Send Messages
export const sendMessage=async(req:Request,res:Response)=>{
  try{
    // console.log('piiii');
    
  const {content,chatId,currentUserId,currentRole}=req.body
  // console.log('reqqqq=',req.body);
  if(currentRole === 'student'){
    const student = currentUserId;
    const msg=await sendingMessage(messageRepository)(content,chatId,student)
    // console.log('msgg=',msg); 
    res.json({message:'success',msg})
  }
  else{
    const tutor = currentUserId;
    const msg=await tutorSendingMessage(messageRepository)(content,chatId,tutor)
    // console.log('msgg=',msg); 
    res.json({message:'success',msg})
  }
    
  }catch (error) {      
    res.status(500).json({ message: "Internal server error" });
  }
}
  
//Get Messages
export const getMessagesByChatId = async(req:Request,res:Response)=>{
  try{
    // console.log('okk');
    
    const chatId=req.params.chatId;
    const messages=await getAllMessages(messageRepository)(chatId)
    res.status(201).json({message:'success',messages})
  }catch (error) {     
    console.log('err=',error);
     
    res.status(500).json({ message: "Internal server error" });
  }
}