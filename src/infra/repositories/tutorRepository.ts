import { tutor } from "../../domain/models/tutor";
import { UpdateResult } from "../../domain/models/update";
import { MongoDBTutor, tutorModel } from "../database/tutorModel";
import { ObjectId } from 'mongodb';

export type tutorRepository = {
    create : (tutor : tutor) => Promise<tutor>;
    findByEmail : (email : string)  => Promise<tutor | null>
    findTutors() : Promise<tutor[]>;
    blockTutors(id:string):Promise<tutor | UpdateResult | void>;
    unblockTutors(id:string):Promise<tutor|UpdateResult|void>;
}

export const tutorRepositoryImpl = (tutorModel:MongoDBTutor):tutorRepository=>{
    
    //Create Tutor
    const create = async(tutor:tutor):Promise<tutor>=>{
    
          
        const createdTutor=await tutorModel.create(tutor)
        console.log('hiiii-',createdTutor);
        
        return createdTutor.toObject();
    }

    //Tutor Login
    const findByEmail = async(email : string): Promise<tutor | null> =>{
        const tut = await tutorModel.findOne({email});
        return tut ? tut.toObject() : null;
    }

    //Fetch tutor data
    const findTutors = async():Promise<tutor[]> =>{
       const tutors = await tutorModel.find();
       return tutors.map((tut) => tut.toObject());
    }
    
    //Block Tutor
    const blockTutors = async(id:string):Promise<tutor|void|UpdateResult > =>{
        console.log('iddd=',id);
        const result = await tutorModel.updateOne({_id:new ObjectId(id)},{$set:{status:false}});
        if(result.modifiedCount>0){
          console.log('modifiedcount blk ok');
          return result
        } 
         
    }

    //Unblock Tutors 
    const unblockTutors = async(id:string):Promise<tutor|void|UpdateResult > =>{
        console.log('iddd=',id);
        const result = await  tutorModel.updateOne({_id:new ObjectId(id)},{$set:{status:true}});
        if(result.modifiedCount>0){
            console.log('modifiedcount unblk ok');
            return result
          } 
    }

    return{
        create,
        findByEmail,
        findTutors,
        blockTutors,
        unblockTutors,
    }
}