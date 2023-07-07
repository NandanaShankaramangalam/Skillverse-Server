import { category } from "../../../domain/models/category"
import { UpdateResult } from "../../../domain/models/update";
import { categoryRepository } from "../../../infra/repositories/categoryRepository"

export const subCategoryAdd = (categoryRepository:categoryRepository)=>async(subcategory:string,cid:string):Promise<category | UpdateResult | void>=>{
   const newSubcat = await categoryRepository.addSubcategory(subcategory,cid);
   console.log(newSubcat);
   return newSubcat
}