import { Router } from "express";
import { accessChat, fetchStudentChat, fetchTutorChat } from "../controllers/chatController";

export const chatRouter = Router();

chatRouter.post('/access-chat',accessChat);
chatRouter.get('/student-chat/:studId',fetchStudentChat);
chatRouter.get('/tutor-chat/:tutId',fetchTutorChat);