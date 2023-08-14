"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express = require('express');
//middleware
const multer = require('multer');
const AWS = require('./awsConfig');
//middleware end
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const tutorRouter = require('./src/interfaces/routes/tutorRoutes'); 
// const adminRouter = require('./src/interfaces/routes/adminRoutes');
const tutorRoutes_1 = require("./src/interfaces/routes/tutorRoutes");
const adminRoutes_1 = require("./src/interfaces/routes/adminRoutes");
const studentRoutes_1 = require("./src/interfaces/routes/studentRoutes");
const config_1 = require("./src/infra/database/config");
const errorHandler_1 = require("./src/utils/errorHandler");
const chatRoutes_1 = require("./src/interfaces/routes/chatRoutes");
const messageRoutes_1 = require("./src/interfaces/routes/messageRoutes");
require('dotenv').config();
// Multer configuration
const storage = multer.memoryStorage();
exports.upload = multer({ storage });
const app = express();
(0, config_1.db)();
app.use(cookieParser());
app.use(express.json());
app.use(errorHandler_1.errorHandler);
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use('/', studentRoutes_1.studentRouter);
app.use('/tutor', tutorRoutes_1.tutorRouter);
app.use('/admin', adminRoutes_1.adminRouter);
app.use('/chat', chatRoutes_1.chatRouter);
app.use('/message', messageRoutes_1.messageRouter);
// io.on("connection",(socket:any)=>{    
//     console.log('connected to socket.io');
//     socket.on('setup',(userId:string)=>{
//         console.log(userId);
//         socket.join(userId)
//         socket.emit('connected')
//     })
// })
const server = app.listen(3001, () => {
    console.log('connected...');
});
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000'
    },
});
io.on("connection", (socket) => {
    console.log(`connected to socket.io`);
    socket.on("setup", (userId) => {
        socket.join(userId);
        ``;
        //  console.log("usr joined room",userId);
        socket.emit("connected");
    });
    // socket.on("disconnect", ()=> {
    //     console.log('user disconnected room');
    // })
    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("User Joined room : " + room);
    });
    socket.on('new message', (newMessageReceived) => {
        var _a, _b, _c, _d;
        console.log('newMessagereceived', newMessageReceived);
        let chat = newMessageReceived.chat;
        console.log('new message=', newMessageReceived);
        const sender = newMessageReceived.student ? newMessageReceived.student : newMessageReceived.tutor;
        console.log('sender is', sender);
        console.log('newMessageReceived.chat.student=', newMessageReceived.chat.student);
        //    if(!chat.student && !chat.tutor) return console.log("Chat.users not defiend");
        if ((sender === null || sender === void 0 ? void 0 : sender._id) === newMessageReceived.chat.student._id) {
            console.log('student is the sender');
            socket.in(chat.tutor._id).emit('message recieved', newMessageReceived);
        }
        if ((sender === null || sender === void 0 ? void 0 : sender._id) === newMessageReceived.chat.tutor._id) {
            console.log('tutor is the sender');
            socket.in(chat.student._id).emit('message recieved', newMessageReceived);
        }
        //    chat.student.forEach((user)=>{
        //        if(user._id === newMessageRecieved.sender._id) return
        //        socket.in(user._id).emit('message recieved',newMessageRecieved)
        if (chat._id === ((_a = newMessageReceived.student) === null || _a === void 0 ? void 0 : _a._id))
            return console.log('It\'s not a dump');
        socket.in((_b = chat.student) === null || _b === void 0 ? void 0 : _b._id).emit('message received', newMessageReceived);
        if (chat._id === ((_c = newMessageReceived.tutor) === null || _c === void 0 ? void 0 : _c._id))
            return console.log('It\'s a dump');
        socket.in((_d = chat.tutor) === null || _d === void 0 ? void 0 : _d._id).emit('message received', newMessageReceived);
        // if (newMessageReceived.student?._id === chat._id || newMessageReceived.tutor?._id === chat._id) {
        //     // Emit the event to the corresponding chat._id
        //     socket.in(chat._id).emit('message received', newMessageReceived);
        //   }  
    });
});
