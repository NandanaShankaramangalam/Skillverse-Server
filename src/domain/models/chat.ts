import mongoose from "mongoose";
import { student } from "./student";
import { tutor } from "./tutor";

export interface Chat{
    chatName:string,
    student:mongoose.Types.ObjectId,
    tutor:mongoose.Types.ObjectId,
    latestMessage?:mongoose.Types.ObjectId,
    
}

export interface Message{
    student:mongoose.Types.ObjectId
    tutor:mongoose.Types.ObjectId
    content:string
    chat:mongoose.Types.ObjectId,
}

export interface newMessageRecieved{
    _id:string,
    sender:Sender,
    content:string,
    chat:ChatInMsg

}
interface Sender{
    _id:string,
    username: string,
    firstname: string,
    lastname: string,
    profileIm:string
}
interface ChatInMsg{
    _id:string,
    student:student,
    tutor:tutor
}