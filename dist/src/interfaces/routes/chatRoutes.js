"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
const express_1 = require("express");
const chatController_1 = require("../controllers/chatController");
const studentAuth_1 = require("../middlewares/studentAuth");
const tutorAuth_1 = require("../middlewares/tutorAuth");
exports.chatRouter = (0, express_1.Router)();
exports.chatRouter.post('/access-chat', chatController_1.accessChat);
exports.chatRouter.get('/student-chat/:studId', studentAuth_1.studentAuth, chatController_1.fetchStudentChat);
exports.chatRouter.get('/tutor-chat/:tutId', tutorAuth_1.tutorAuth, chatController_1.fetchTutorChat);
