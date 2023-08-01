import { reviewRepository } from './../../../infra/repositories/reviewRepository';

export const fetchReview = (reviewRepository:reviewRepository)=>async(courseId:string)=>{
    const allReviews =await reviewRepository.fetchAllReviews(courseId);
    return allReviews ? allReviews : null;
}