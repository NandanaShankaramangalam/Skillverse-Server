import { reviewRepository } from './../../../infra/repositories/reviewRepository';
export const deleteReview = (reviewRepository:reviewRepository) => async(reviewId:string) =>{
    const data = await reviewRepository.deleteReviews(reviewId);
    return data ? data : null;
}