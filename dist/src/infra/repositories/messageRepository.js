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
exports.messageRepositoryImpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chatModel_1 = require("../database/chatModel");
const messageRepositoryImpl = (MsgModel) => {
    //Send Messages   
    const sendMsg = (content, chatId, student) => __awaiter(void 0, void 0, void 0, function* () {
        const newChat = {
            student: new mongoose_1.default.Types.ObjectId(student),
            // tutor:new mongoose.Types.ObjectId(tutId),
            content,
            chat: new mongoose_1.default.Types.ObjectId(chatId),
        };
        let message = yield MsgModel.create(newChat);
        message = yield message.populate("student", '_id firstname lastname username profileImg');
        message = yield message.populate("tutor", '_id firstname lastname username profileImg');
        message = yield message.populate('chat');
        message = yield message.populate('chat.student');
        message = yield message.populate('chat.tutor');
        yield chatModel_1.chatModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(chatId) }, { $set: { latestMessage: message } });
        return message;
    });
    //Tutor Send Messages
    const tutorSendMsg = (content, chatId, tutor) => __awaiter(void 0, void 0, void 0, function* () {
        const newChat = {
            // currentUserId:new mongoose.Types.ObjectId(currentUserId),
            tutor: new mongoose_1.default.Types.ObjectId(tutor),
            content,
            chat: new mongoose_1.default.Types.ObjectId(chatId),
        };
        let message = yield MsgModel.create(newChat);
        message = yield message.populate("student", '_id firstname lastname username profileImg');
        message = yield message.populate("tutor", '_id firstname lastname username profileImg');
        message = yield message.populate('chat');
        message = yield message.populate('chat.student');
        message = yield message.populate('chat.tutor');
        yield chatModel_1.chatModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(chatId) }, { $set: { latestMessage: message } });
        return message;
    });
    //Get messages
    const getMsgsByChatId = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        const messages = yield MsgModel.find({ chat: new mongoose_1.default.Types.ObjectId(chatId) }).populate("student", 'firstname lastname username profileImg').populate("tutor", 'firstname lastname username profileImg')
            .populate('chat');
        return messages;
    });
    return {
        sendMsg,
        tutorSendMsg,
        getMsgsByChatId,
    };
};
exports.messageRepositoryImpl = messageRepositoryImpl;
