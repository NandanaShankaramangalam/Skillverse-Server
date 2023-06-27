import { adminRepository } from './../../../infra/repositories/adminRepository';
import { admin } from "../../../domain/models/admin";

export const loginAdmin = (adminRepository:adminRepository)=>async(username:string,password:string):Promise<admin | null>=>{
    
    
    const adm : admin | null  = await adminRepository.findByUsername(username)
    
    
    if(adm && adm.password === password){
        return adm;
    }
    return null;
}