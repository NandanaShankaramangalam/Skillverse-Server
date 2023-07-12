import { tutor, tutorProfile } from "../../domain/models/tutor";
import { UpdateResult } from "../../domain/models/update";
import { MongoDBTutor, tutorModel } from "../database/tutorModel";
import { ObjectId } from 'mongodb';

export type tutorRepository = {
    create : (tutor : tutor) => Promise<tutor>;
    findByEmail : (email : string)  => Promise<tutor | null>
    findTutors() : Promise<tutor[]>;
    blockTutors(id:string):Promise<tutor | UpdateResult | void>;
    unblockTutors(id:string):Promise<tutor|UpdateResult|void>;
    addTutorProfile(fileLocation:string,description:string,tutId:string): Promise<tutor|UpdateResult|void>;
    findTutorProfile(tutId:string): Promise<tutorProfile | null>
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
    const blockTutors = async(id:string):Promise< tutor|void|UpdateResult > =>{
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

    //Add Profile
    const addTutorProfile = async(fileLocation:string,description:string,tutId:string):Promise<tutor|void|UpdateResult > =>{
        const result = await tutorModel.updateOne({_id:new ObjectId(tutId)},{$set:{fileLocation:fileLocation,description:description}});
        if(result.modifiedCount>0){
            console.log('added desc and loc');
            return result
          } 
           
    }

    //Show Tutor Profile 
    const  findTutorProfile = async(tutId:string):Promise<tutorProfile | null>=>{
        const profileData = await tutorModel.aggregate([
            {$match:{_id:new ObjectId(tutId)}},
            {$project:{_id:1,fileLocation:1,description:1}}
        ])
        if (profileData && profileData.length > 0) {
            const profile = profileData[0] as tutorProfile;
            return profile;
          }
        
          return null;
        
    }
    return{
        create,
        findByEmail,
        findTutors,
        blockTutors,
        unblockTutors,
        addTutorProfile,
        findTutorProfile,
    }
}