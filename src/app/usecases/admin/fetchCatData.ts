import { courseRepository } from './../../../infra/repositories/courseRepository';
export const fetchCatData = (courseRepository:courseRepository) => async()=>{
    const data = await courseRepository.fetchCateData();
    return data ? data : null;
}