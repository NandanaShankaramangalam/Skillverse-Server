import { admin } from './../../domain/models/admin';
import { MongoDAdmin } from '../database/adminModel';

export type adminRepository = {
    findByUsername : (username : string) => Promise<admin | null>
}

export const adminRepositoryImpl = (adminModel:MongoDAdmin):adminRepository=>{

     //Admin Login
    const findByUsername = async(username:string): Promise<admin | null> =>{
        const adm = await adminModel.findOne({username});
        return adm ? adm.toObject() : null;
    }
    
    return{  
        findByUsername
    }
}