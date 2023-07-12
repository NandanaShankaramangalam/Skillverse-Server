import { ObjectId } from 'mongodb';
export interface tutor{
    fname: string,
    lname: string,
    username: string,
    email: string,
    password: string,
    role ?: string,
    status?:boolean,
    fileLocation?:string,
    description?:string,
    block?:boolean
}

export interface tutorProfile{
    _id : string,
    fileLocation?:string,
    description?:string,
}