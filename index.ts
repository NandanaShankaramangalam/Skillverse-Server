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
require('dotenv').config();

// Multer configuration
const storage = multer.memoryStorage();
export const upload = multer({ storage });


const app = express();
app.listen(3001,()=>{
    console.log('connected...');  
})

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