import { reviewRepository } from './../../../infra/repositories/reviewRepository';
export const editReview = (reviewRepository:reviewRepository) => async(reviewId:string,review:string) =>{
    const data = await reviewRepository.editReview(reviewId,review);
    return data ? data : null;
}