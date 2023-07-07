import { category } from '../../../domain/models/category';
import { categoryRepository } from './../../../infra/repositories/categoryRepository';
export const fetchCategoryData = (categoryRepository:categoryRepository)=>async()=>{
    const cateData :  category[] = await categoryRepository.findCategory();
    if(cateData){
        return cateData;
    }
    return null; 
}