// import { student } from './../../domain/models/student';
import mongoose, { Document, Model, Schema } from 'mongoose';
import { Chat } from '../../domain/models/chat';

export type MongoDBChat=Model<Document<any,any,any>&Chat>;

const chatSchema = new Schema<Chat>({
    chatName:{
        type:'string',
        required:true
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student'
    },
    tutor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'tutor'
    },
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'message'
    }
},
{
    timestamps:true
})

export const chatModel:MongoDBChat=mongoose.connection.model<Document<any, any, any> & Chat>('chat', chatSchema);