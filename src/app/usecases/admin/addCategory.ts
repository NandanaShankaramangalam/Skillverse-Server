// import { addCategory } from './../../../interfaces/controllers/adminController';
import { categoryRepository } from "../../../infra/repositories/categoryRepository";
import { category } from "../../../domain/models/category";

export const createCategory = (categoryRepository:categoryRepository)=>async(category:string,subcategory:string[]):Promise<category|null>=>{
    const newCategory : category = {
        category,
        subcategory
    }
    const createdCategory : category|null = await categoryRepository.addCategory(newCategory);
    return createdCategory;
}