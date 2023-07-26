import { categoryRepository } from './../../../infra/repositories/categoryRepository';
export const fetchSubcategory = (categoryRepository:categoryRepository)=>async(category:string)=>{
    const cateData = await categoryRepository.fetchSubcategories(category);
    return cateData? cateData : null;
}