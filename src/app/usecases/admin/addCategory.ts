// import { addCategory } from './../../../interfaces/controllers/adminController';
import { categoryRepository } from "../../../infra/repositories/categoryRepository";
import { category } from "../../../domain/models/category";

export const createCategory = (categoryRepository:categoryRepository)=>async(category:string):Promise<category|null>=>{
    console.log('okk'); 
    const newCategory : category = {
        category,
    }
    const createdCategory = await categoryRepository.addCategory(newCategory);
    console.log('ccc=',createdCategory);
    
    return createdCategory;
}