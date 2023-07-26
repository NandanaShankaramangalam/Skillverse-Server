
import { student } from "../../domain/models/student";
import { MongoDBUser, studentModel } from "../database/studentModel";
import { ObjectId } from 'mongodb';
import { UpdateResult } from '../../domain/models/update';

// export interface UpdateResult {
//     acknowledged: boolean;
//     modifiedCount: number;
//     upsertedId: ObjectId | null;
//     upsertedCount: number;
//     matchedCount: number;
//   }
  
export type studentRepository = {
    create : (student : student)=> Promise<student>; 
    findByEmail : (email : string)  => Promise<student | null>;
    findStudents(): Promise<student[]>;
    blockStudents(id:string):Promise<student|UpdateResult|void>;
    unblockStudents(id:string):Promise<student|UpdateResult|void>;
    fetchPersonalInfo(id:string):Promise<student|null>;
    updateInfo(fname:string,lname:string,username:string,email:string,id:string):Promise<student|UpdateResult|void>;
    coursePurchased(courseId:string,status:boolean,studId:string): Promise< student|void|UpdateResult >;
    // courseExist(studId:string,courseId:string): Promise<boolean|null>;
}

export const studentRepositoryImpl = (studentModel:MongoDBUser):studentRepository=>{
    //Create Student
    const create = async(student:student):Promise<student>=>{
       
        const createdStudent=await studentModel.create(student)
        console.log('hiiii-',createdStudent);
        
        return createdStudent.toObject();
    }

    // student login
    const findByEmail = async(email : string): Promise<student | null> =>{
        const stud = await studentModel.findOne({email});
        return stud ? stud.toObject() : null;
    }
    
    //Fetch student data
    const findStudents = async():Promise<student[]> =>{
        const students = await studentModel.find();
        return students.map((stud) => stud.toObject());
    }

    //Block student
    const blockStudents = async(id:string):Promise<student|void|UpdateResult > =>{
        console.log('iddd=',id);
        // .then((data)=>{
        //     // console.log('block done');
        //     // console.log('data=',data);
        //     // if(data.modifiedCount>0){
        //     //     return {block:true};
        //     // }
        //     return data
        //  })
        const result = await studentModel.updateOne({_id:new ObjectId(id)},{$set:{status:false}});
        if(result.modifiedCount>0){
          console.log('modifiedcount blk ok');
          return result
        } 
         
    }
    
    //Unblock student
    const unblockStudents = async(id:string):Promise<student|void|UpdateResult > =>{
        console.log('iddd=',id);
        const result = await studentModel.updateOne({_id:new ObjectId(id)},{$set:{status:true}});
        if(result.modifiedCount>0){
          console.log('modifiedcount unblk ok');
          return result
        } 
    }

    //Fetch Personal Info
    const fetchPersonalInfo = async(id:string):Promise<student | null>=>{
       const info = await studentModel.findOne({_id : new ObjectId(id)});
       return info ? info.toObject() : null;
    }

    //Update Personal Info
    const updateInfo = async(fname:string,lname:string,username:string,email:string,id:string):Promise<student|void|UpdateResult>=>{
       const result = await studentModel.updateOne({_id:new ObjectId(id)},{$set:{fname:fname,lname:lname,username:username,email:email}});
       if(result.modifiedCount>0){
        console.log('modifiedcount blk ok');
        return result
      } 
    }    

    //Course Purchased
    const coursePurchased = async(courseId:string,status:boolean,studId:string): Promise<student|void|UpdateResult > =>{
        const result = await studentModel.updateOne({_id : new ObjectId(studId)},{$push:{courses:{courseId:courseId,paymentStatus:status}}})
        if(result.modifiedCount>0){
            console.log('modifiedcount unblk ok');
            return result
          } 
    }

    //CourseId Check
    // const courseExist = async(studId:string, courseId:string): Promise<boolean|null>=>{
    //     const result = await studentModel.findOne({ _id:new ObjectId(studId), "courses.courseId": courseId })
        
    // }
    
    return{
        create,
        findByEmail,
        findStudents,
        blockStudents,
        unblockStudents,
        fetchPersonalInfo,
        updateInfo,
        coursePurchased,
        // courseExist,
    }
}