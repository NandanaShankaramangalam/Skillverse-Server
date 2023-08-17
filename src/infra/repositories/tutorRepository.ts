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
    addTutorProfile(profileLocation:string,bannerLocation:string,description:string,niche:string,tutId:string): Promise<tutor|UpdateResult|void>;
    findTutorProfile(tutId:string): Promise<tutorProfile | null>
    editTutorProfile(profileLocation:string,bannerLocation:string,description:string,niche:string,tutId:string):Promise<tutor|void|UpdateResult>;
    resetPassword(email:string,password:string): Promise< tutor|UpdateResult|void >;
     
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
    const addTutorProfile = async(profileLocation:string,bannerLocation:string,description:string,niche:string,tutId:string):Promise<tutor|void|UpdateResult > =>{
        const result = await tutorModel.updateOne({_id:new ObjectId(tutId)},{$set:{profileLocation:profileLocation,bannerLocation:bannerLocation,description:description,niche:niche}});
        if(result.modifiedCount>0){
            console.log('added desc and loc');
            return result
          } 
           
    }

    //Show Tutor Profile 
    const  findTutorProfile = async(tutId:string):Promise<tutorProfile | null>=>{
        const profileData = await tutorModel.aggregate([
            {$match:{_id:new ObjectId(tutId)}},
            {$project:{_id:1,username:1,bannerLocation:1,profileLocation:1,description:1,niche:1}}
        ])
        if (profileData && profileData.length > 0) {
            const profile = profileData[0] as tutorProfile;
            return profile;
          }
        
          return null;
        
    }

    //Edit Tutor Profile
    
    const editTutorProfile = async(profileLocation:string,bannerLocation:string,description:string,niche:string,tutId:string):Promise<tutor|void|UpdateResult > =>{
        console.log('editut=',tutId);
        console.log('editut=',profileLocation);
        console.log('editut=',bannerLocation);
        console.log('editut=',niche);
        
        if(profileLocation != '' && bannerLocation != ''){
            const result = await tutorModel.updateOne({_id: new ObjectId(tutId)},{$set:{profileLocation:profileLocation,bannerLocation:bannerLocation,description:description,niche:niche}})
            console.log('a');
            return result;
        }
        else if(profileLocation != '' && bannerLocation === ''){
            const result = await tutorModel.updateOne({_id: new ObjectId(tutId)},{$set:{profileLocation:profileLocation,description:description,niche:niche}})
            console.log('b');
            return result;
        }
        else if(profileLocation == '' && bannerLocation != ''){
            const result = await tutorModel.updateOne({_id: new ObjectId(tutId)},{$set:{bannerLocation:bannerLocation,description:description,niche:niche}})
            console.log('c');
            return result;
        }
        else if(profileLocation === '' && bannerLocation === ''){
            const result = await tutorModel.updateOne({_id: new ObjectId(tutId)},{$set:{description:description,niche:niche}})
            console.log('d');
            return result;
        }
        
    }

        //Reset password
        const resetPassword = async(email:string,password:string): Promise< tutor|UpdateResult|void >=>{
            const result = await tutorModel.updateOne({email:email},{$set:{password:password}});
            if(result.modifiedCount>0){
                console.log('Password reset successful');
                return result
              } 
        }
    return{
        create,
        findByEmail,   
        findTutors,
        blockTutors,
        unblockTutors,
        addTutorProfile,
        findTutorProfile,
        editTutorProfile,
        resetPassword,
    }
}