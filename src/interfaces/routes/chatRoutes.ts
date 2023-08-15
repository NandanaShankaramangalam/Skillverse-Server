import { Router } from "express";
import { accessChat, fetchStudentChat, fetchTutorChat } from "../controllers/chatController";
import { studentAuth } from "../middlewares/studentAuth";
import { tutorAuth } from "../middlewares/tutorAuth";

export const chatRouter = Router();

chatRouter.post('/access-chat',accessChat);
chatRouter.get('/student-chat/:studId',studentAuth,fetchStudentChat);
chatRouter.get('/tutor-chat/:tutId',tutorAuth,fetchTutorChat);