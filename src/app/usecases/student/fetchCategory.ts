import { category } from '../../../domain/models/category';
import { categoryRepository } from './../../../infra/repositories/categoryRepository';
export const fetchCategoryData = (categoryRepository:categoryRepository)=>async()=>{
    const cateData :  category[] = await categoryRepository.findCategory();
    console.log('hggf=',cateData);
    const cateDatas = cateData.filter((obj)=>obj.status != false)
    if(cateDatas){
        return cateDatas;
    }
    return null; 
}