import { courseRepository } from './../../../infra/repositories/courseRepository';
export const fetchBarData = (courseRepository:courseRepository) => async() =>{
    const data = await courseRepository.fetchBarDatas();
    return data ? data : null;
}