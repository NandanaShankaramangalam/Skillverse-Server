"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagesByChatId = exports.sendMessage = exports.fetchTutorChat = exports.fetchStudentChat = exports.accessChat = void 0;
const chatRepository_1 = require("./../../infra/repositories/chatRepository");
const chatModel_1 = require("../../infra/database/chatModel");
const accessChat_1 = require("../../app/usecases/chat/accessChat");
const getChats_1 = require("../../app/usecases/chat/getChats");
const messageModel_1 = require("../../infra/database/messageModel");
const messageRepository_1 = require("../../infra/repositories/messageRepository");
const sendMessage_1 = require("../../app/usecases/chat/sendMessage");
const getMessages_1 = require("../../app/usecases/chat/getMessages");
const getTutorChats_1 = require("../../app/usecases/chat/getTutorChats");
const tutorSendingMessage_1 = require("../../app/usecases/chat/tutorSendingMessage");
const chatDb = chatModel_1.chatModel;
const chatRepository = (0, chatRepository_1.chatRepositoryImpl)(chatDb);
const msgDb = messageModel_1.MsgModel;
const messageRepository = (0, messageRepository_1.messageRepositoryImpl)(messageModel_1.MsgModel);
//Create Chat
const accessChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studId, tutId } = req.body;
        if (!studId || !tutId) {
            res.status(400).json({ message: "Internal server error" });
        }
        else {
            const isChat = yield (0, accessChat_1.chatAccess)(chatRepository)(studId, tutId);
            // console.log('isChattt=',isChat);
            res.json({ message: "success", isChat });
            // const isChat = await chatModel.find({
            //     $and:[
            //         {student:studId},
            //         {tutor:tutId}
            //     ]
            // }).populate("student","-password").populate("tutor","-password").populate("latestMessage");
            // console.log('ischat=',isChat);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.accessChat = accessChat;
//Fetch Student Chats
const fetchStudentChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studId = req.params.studId;
        //  console.log('st cntrl id=',studId);
        //  const tutId = req.params.tutId;
        const allChats = yield (0, getChats_1.getChats)(chatRepository)(studId);
        //  console.log(allChats);
        res.json({ message: 'student chat fetch success', allChats });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.fetchStudentChat = fetchStudentChat;
//Fetch Tutor Chats
const fetchTutorChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutId = req.params.tutId;
        const allChats = yield (0, getTutorChats_1.getTutorChats)(chatRepository)(tutId);
        // console.log(allChats);
        res.json({ message: 'tutor chat fetch success', allChats });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.fetchTutorChat = fetchTutorChat;
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
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('piiii');
        const { content, chatId, currentUserId, currentRole } = req.body;
        // console.log('reqqqq=',req.body);
        if (currentRole === 'student') {
            const student = currentUserId;
            const msg = yield (0, sendMessage_1.sendingMessage)(messageRepository)(content, chatId, student);
            // console.log('msgg=',msg); 
            res.json({ message: 'success', msg });
        }
        else {
            const tutor = currentUserId;
            const msg = yield (0, tutorSendingMessage_1.tutorSendingMessage)(messageRepository)(content, chatId, tutor);
            // console.log('msgg=',msg); 
            res.json({ message: 'success', msg });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.sendMessage = sendMessage;
//Get Messages
const getMessagesByChatId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('okk');
        const chatId = req.params.chatId;
        const messages = yield (0, getMessages_1.getAllMessages)(messageRepository)(chatId);
        res.status(201).json({ message: 'success', messages });
    }
    catch (error) {
        console.log('err=', error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getMessagesByChatId = getMessagesByChatId;
