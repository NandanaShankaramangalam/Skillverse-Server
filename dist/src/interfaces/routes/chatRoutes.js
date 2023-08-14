"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
const express_1 = require("express");
const chatController_1 = require("../controllers/chatController");
exports.chatRouter = (0, express_1.Router)();
exports.chatRouter.post('/access-chat', chatController_1.accessChat);
exports.chatRouter.get('/student-chat/:studId', chatController_1.fetchStudentChat);
exports.chatRouter.get('/tutor-chat/:tutId', chatController_1.fetchTutorChat);
