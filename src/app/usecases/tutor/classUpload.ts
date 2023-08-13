import { Course } from "../../../domain/models/course";
import { UpdateResult } from "../../../domain/models/update";
import { courseRepository } from "../../../infra/repositories/courseRepository";

export const classUpload = (courseRepository:courseRepository)=>async(videoLocation:string,thumbnailLocation:string,title:string,description:string,courseId:string,id:Date):Promise<Course | null | UpdateResult>=>{
    const tutorial = await courseRepository.insertTutorial(videoLocation,thumbnailLocation,title,description,courseId,id)
    return tutorial ? tutorial : null;
}