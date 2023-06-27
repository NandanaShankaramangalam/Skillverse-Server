import { blockStudent } from './../../interfaces/controllers/adminController';
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
    return{
        create,
        findByEmail,
        findStudents,
        blockStudents,
        unblockStudents,
    }
}