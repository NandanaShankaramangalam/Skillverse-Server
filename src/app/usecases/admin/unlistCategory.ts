import { category } from '../../../domain/models/category';
import { UpdateResult } from '../../../domain/models/update';
import { categoryRepository } from './../../../infra/repositories/categoryRepository';

export const CategoryUnlist = (categoryRepository:categoryRepository)=> async (id: string): Promise<category | UpdateResult | void> => {
    console.log('usese cat id=', id);

    const unlistData = await categoryRepository.unlistCategory(id);
    console.log('blkk', unlistData);
    return unlistData;
}