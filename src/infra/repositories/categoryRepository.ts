import { addCategory, listCategory, addSubcategory } from './../../interfaces/controllers/adminController';
import { MongoDBCategory } from '../database/categoryModel';
import { category } from './../../domain/models/category';
import { UpdateResult } from '../../domain/models/update';
import { ObjectId } from 'mongodb';

export type categoryRepository = {
    addCategory(category:category):Promise<category|null>;
    findCategory(): Promise<category[]>;
    listCategory(id:string):Promise<category|UpdateResult|void>;
    unlistCategory(id:string):Promise<category|UpdateResult|void>;
    addSubcategory(subcategory:string,cid:string):Promise<category|UpdateResult|void>;
    editCategory(category:string,cid:string):Promise<category|UpdateResult|void>;
    findTutCategory(): Promise<category[]>;
}


export const categoryRepositoryImpl = (categoryModel:MongoDBCategory):categoryRepository=>{
 //Add Category
const addCategory = async(category:category):Promise<category | null>=>{
    const cat = await categoryModel.find({category:category});
    if(!cat){
    const createdCategory = await categoryModel.create(category);
    console.log('hiiii-',createdCategory);
    return createdCategory.toObject(); 
    }
    return null
    
}

//Fetch category data
const findCategory = async():Promise<category[]> =>{
    const category = await categoryModel.find();
    return category.map((cate) => cate.toObject());
}

//List Category
const listCategory = async(id:string):Promise<category|void|UpdateResult > =>{
    console.log('iddd=',id);
    const result = await categoryModel.updateOne({_id:new ObjectId(id)},{$set:{status:false}});
    if(result.modifiedCount>0){
      console.log('modifiedcount blk ok');
      return result
    } 
}

//Unlist Category
const unlistCategory = async(id:string):Promise<category|void|UpdateResult > =>{
    console.log('iddd=',id);
    const result = await categoryModel.updateOne({_id:new ObjectId(id)},{$set:{status:true}});
    if(result.modifiedCount>0){
      console.log('modifiedcount blk ok');
      return result
    } 
}

// Add Subcategory
const addSubcategory = async(subcategory:string,cid:string):Promise<category|void|UpdateResult > =>{
    console.log('iddd=',subcategory);
    const result = await categoryModel.updateOne({_id:new ObjectId(cid)},{$addToSet:{subcategory:subcategory}})
    if(result.modifiedCount>0){
        console.log('modifiedcount of add subcategory');
        return result
      } 
}

const editCategory = async(category:string,cid:string):Promise<category|void|UpdateResult > =>{
    console.log('iddd=',category);
    const result = await categoryModel.updateOne({_id:new ObjectId(cid)},{$set:{category:category}})
    if(result.modifiedCount>0){
        console.log('modifiedcount of add subcategory');
        return result
      } 
}

//Fetch tutor category data
const findTutCategory = async():Promise<category[]> =>{
    const category = await categoryModel.find({status:true});
    return category.map((cate) => cate.toObject());
}
    return{
        addCategory,
        findCategory,
        listCategory,
        unlistCategory,
        addSubcategory,
        editCategory,
        findTutCategory,
    }
}