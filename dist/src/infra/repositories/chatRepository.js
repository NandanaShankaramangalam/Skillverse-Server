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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRepositoryImpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chatRepositoryImpl = (chatModel) => {
    //Create Chat
    const createChat = (studId, tutId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const studid = new mongoose_1.default.Types.ObjectId(studId);
            const tutid = new mongoose_1.default.Types.ObjectId(tutId);
            const isChat = yield chatModel.find({
                $and: [
                    { student: studid },
                    { tutor: tutid }
                ]
            }).populate("student", "-password").populate("tutor", "-password").populate("latestMessage");
            // console.log('ischat=',isChat);
            if (isChat.length > 0) {
                return isChat;
            }
            else {
                const chatData = {
                    chatName: 'sender',
                    student: studid,
                    tutor: tutid
                };
                const createdChat = yield chatModel.create(chatData);
                const fullChat = yield chatModel.findOne({ _id: createdChat._id }).populate('student', '-password').populate('tutor', '-password');
                return fullChat;
            }
        }
        catch (error) {
            console.error('Error creating course:', error);
            throw error; // or handle the error appropriately
        }
    });
    //Get all student chats
    const getAllStudentChats = (studId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const studid = new mongoose_1.default.Types.ObjectId(studId);
            // console.log('sid=',studid);
            // const tutid= new mongoose.Types.ObjectId(tutId)
            const chats = chatModel.find(
            // $and:[
            { student: studid }
            // {tutor:tutid}
            // ]
            ).populate("tutor", "-password").populate("latestMessage").sort({ updatedAt: -1 });
            return chats;
        }
        catch (error) {
            console.error('Error creating course:', error);
            throw error; // or handle the error appropriately
        }
    });
    //Get all tutor chats
    const getAllTutorChats = (tutId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tutid = new mongoose_1.default.Types.ObjectId(tutId);
            // console.log('sid=',tutid);
            // const tutid= new mongoose.Types.ObjectId(tutId)
            const chats = chatModel.find({ tutor: tutid }).populate("student", "-password").populate("latestMessage").sort({ updatedAt: -1 });
            return chats;
        }
        catch (error) {
            console.error('Error creating course:', error);
            throw error; // or handle the error appropriately
        }
    });
    return {
        createChat,
        getAllStudentChats,
        getAllTutorChats,
    };
};
exports.chatRepositoryImpl = chatRepositoryImpl;
