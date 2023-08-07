import { courseRepository } from './../../../infra/repositories/courseRepository';
export const fetchGraphData = (courseRepository:courseRepository) => async(tutId:string)=>{
    const data = await courseRepository.fetchGraphDatas(tutId)
    return data? data: null;
}