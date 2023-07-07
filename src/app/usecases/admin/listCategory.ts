import { category } from '../../../domain/models/category';
import { UpdateResult } from '../../../domain/models/update';
import { categoryRepository } from './../../../infra/repositories/categoryRepository';

export const CategoryList = (categoryRepository:categoryRepository)=> async (id: string): Promise<category | UpdateResult | void> => {
    console.log('usese cat id=', id);

    const listData = await categoryRepository.listCategory(id);
    console.log('blkk', listData);
    return listData;
}