const express = require('express');
//middleware
const multer = require('multer');
const AWS = require('./awsConfig');
//middleware end
const mongoose = require('mongoose')
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const tutorRouter = require('./src/interfaces/routes/tutorRoutes'); 
// const adminRouter = require('./src/interfaces/routes/adminRoutes');
import { tutorRouter } from './src/interfaces/routes/tutorRoutes';
import { adminRouter } from './src/interfaces/routes/adminRoutes';
import {studentRouter} from './src/interfaces/routes/studentRoutes';

import { db } from './src/infra/database/config';
import { errorHandler} from './src/utils/errorHandler';
import { chatRouter } from './src/interfaces/routes/chatRoutes';
import { messageRouter } from './src/interfaces/routes/messageRoutes';
import {newMessageReceived} from './src/domain/models/chat'
require('dotenv').config();

// Multer configuration
const storage = multer.memoryStorage();
export const upload = multer({ storage });


const app = express();

db();

app.use(cookieParser());
app.use(express.json())
app.use(errorHandler);
app.use(cors({
    origin : ['http://localhost:3000'],
    methods : ['GET','POST'],
    credentials : true
}))

app.use('/',studentRouter);
app.use('/tutor',tutorRouter);
app.use('/admin',adminRouter);
app.use('/chat',chatRouter);
app.use('/message',messageRouter);
// io.on("connection",(socket:any)=>{    
    //     console.log('connected to socket.io');
    //     socket.on('setup',(userId:string)=>{
        //         console.log(userId);
        //         socket.join(userId)
        //         socket.emit('connected')
        //     })
        
        // })
        const server = app.listen(3001,()=>{
            console.log('connected...');  
        })
        const io=require('socket.io')(server , {
            pingTimeout:60000,
            cors:{
                origin:'http://localhost:3000'
            },
        })

io.on("connection", (socket:any) => {
     console.log(`connected to socket.io`);
     socket.on("setup", (userId:string) => {
     socket.join(userId);``
    //  console.log("usr joined room",userId);
     socket.emit("connected");
    })

    // socket.on("disconnect", ()=> {
    //     console.log('user disconnected room');
        
    // })

    socket.on('join chat',(room:string)=>{
        socket.join(room)
        console.log("User Joined room : " + room);  
    })

    socket.on('new message',(newMessageReceived:newMessageReceived)=>{
        console.log('newMessagereceived',newMessageReceived);
        
       let chat = newMessageReceived.chat
       console.log('new message=',newMessageReceived);
       const sender=newMessageReceived.student ? newMessageReceived.student : newMessageReceived.tutor
       console.log('sender is',sender);
       console.log('newMessageReceived.chat.student=',newMessageReceived.chat.student);
       
    //    if(!chat.student && !chat.tutor) return console.log("Chat.users not defiend");
    if(sender?._id===newMessageReceived.chat.student._id){
        console.log('student is the sender'); 
        socket.in(chat.tutor._id).emit('message recieved',newMessageReceived)
    }
    if(sender?._id===newMessageReceived.chat.tutor._id){
        console.log('tutor is the sender');
        socket.in(chat.student._id).emit('message recieved',newMessageReceived)
    }
    //    chat.student.forEach((user)=>{
    //        if(user._id === newMessageRecieved.sender._id) return
    //        socket.in(user._id).emit('message recieved',newMessageRecieved)
        
    
       if(chat._id === newMessageReceived.student?._id) return console.log('It\'s not a dump'); 
       socket.in(chat.student?._id).emit('message received',newMessageReceived);

       if(chat._id === newMessageReceived.tutor?._id)return console.log('It\'s a dump') ;
       socket.in(chat.tutor?._id).emit('message received',newMessageReceived);
    
    

    // if (newMessageReceived.student?._id === chat._id || newMessageReceived.tutor?._id === chat._id) {
    //     // Emit the event to the corresponding chat._id
    //     socket.in(chat._id).emit('message received', newMessageReceived);
    //   }  
    })
})



