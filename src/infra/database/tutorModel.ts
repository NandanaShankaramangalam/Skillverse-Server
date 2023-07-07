import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, Schema } from 'mongoose';
import { tutor } from '../../domain/models/tutor';

export type MongoDBTutor = Model<Document<any, any, any> & tutor>;

const tutorSchema = new Schema<tutor>({
   
    fname: {
        type : 'string',
        required : true,
    },
    lname: {
        type : 'string',
        required : true,
    },
    username: {
        type : 'string',
        required : true,
    },
    email: {
        type : 'string',
        required : true,
        unique : true
    },
    password: {
        type : 'string',
        required : true,
    },
    role: {
        type : 'string',
        default: 'tutor',
    },
    status: {
        type : 'boolean',
        default : true
    },
    fileLocation: {
        type : 'string',
    },
    description:{
        type : 'string',
    }
})

export const tutorModel: MongoDBTutor = mongoose.connection.model<Document<any, any, any> & tutor>('tutor', tutorSchema);