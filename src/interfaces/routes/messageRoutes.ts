import { Router } from "express";
import { getMessagesByChatId, sendMessage } from "../controllers/chatController";

export const messageRouter = Router();
 messageRouter.post('/send',sendMessage);
 messageRouter.get('/:chatId',getMessagesByChatId);   