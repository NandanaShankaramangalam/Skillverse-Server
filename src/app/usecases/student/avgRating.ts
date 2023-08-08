import { reviewRepository } from './../../../infra/repositories/reviewRepository';
export const avgRatings = (reviewRepository:reviewRepository) => async() =>{
    const data = await reviewRepository.findAverageRating();
    return data ? data : null;
}