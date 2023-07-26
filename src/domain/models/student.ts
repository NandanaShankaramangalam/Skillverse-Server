export interface student{
    fname: string,
    lname: string,
    username: string,
    email: string,
    password: string,
    role?: string,
    status?:boolean,
    block?:boolean,
    courses ?: [{courseId:string,paymentStatus:boolean}]
}