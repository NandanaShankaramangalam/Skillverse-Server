import { ObjectId } from 'mongodb';
export interface tutor{
    fname: string,
    lname: string,
    username: string,
    email: string,
    password: string,
    role ?: string,
    status?:boolean,
    niche?:string,
    profileLocation?:string,
    bannerLocation?:string,
    description?:string,
    block?:boolean
}

export interface tutorProfile{
    _id : string,
    bannerLocation?:string,
    profileLocation?:string,
    description?:string,
}