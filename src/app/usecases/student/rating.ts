import { reviewRepository } from "../../../infra/repositories/reviewRepository";

export const courseRating = (reviewRepository:reviewRepository) => async(ratingValue:number,studId:string,courseId:string) =>{
  const result = await reviewRepository.rating(ratingValue,studId,courseId);
  return result ? result : null;
}