import { category } from './../../../domain/models/category';
import { UpdateResult } from '../../../domain/models/update';
import { categoryRepository } from './../../../infra/repositories/categoryRepository';

export const categoryEdit = (categoryRepository:categoryRepository)=> async (category:string,cid: string): Promise<category | UpdateResult | void> => {
    console.log('usecse id=', cid);

  const result = await categoryRepository.editCategory(category,cid)
  console.log('blkk', result);
  return result;
}