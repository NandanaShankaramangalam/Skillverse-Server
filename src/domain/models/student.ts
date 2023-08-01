export interface student{
    _id?:string,
    fname: string,
    lname: string,
    username: string,
    email: string,
    password: string,
    isGoogle?:boolean,
    role?: string,
    status?:boolean,
    block?:boolean,
    courses ?: [{courseId:string,paymentStatus:boolean}],
}