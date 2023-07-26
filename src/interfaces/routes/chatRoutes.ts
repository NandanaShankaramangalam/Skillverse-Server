import { Router } from "express";
import { accessChat, fetchChat } from "../controllers/chatController";

export const chatRouter = Router();

chatRouter.post('/access-chat',accessChat);
chatRouter.get('/fetch-chat',fetchChat);