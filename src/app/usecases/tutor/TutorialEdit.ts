import { courseRepository } from './../../../infra/repositories/courseRepository';
export const TutorialEdit = (courseRepository:courseRepository) => async(courseId:string,newTitle:string,newDescription:string,ImgLocation:string,VdoLocation:string,img:string,videoUrl:string,vdoId:string,index:number)=>{
    const data = await courseRepository.editTutorial(courseId,newTitle,newDescription,ImgLocation,VdoLocation,img,videoUrl,vdoId,index);
    return data ? data : null;
}