import mongoose from 'mongoose';
import { review } from '../../../domain/models/review';
import { reviewRepository } from './../../../infra/repositories/reviewRepository';
export const postReviews = (reviewRepository:reviewRepository)=>async(review:string,courseId:string,studId:mongoose.Types.ObjectId):Promise<review|null>=>{
    const newReview : review = {
        review,
        courseId,
        studId
    }
    const createdReview = await reviewRepository.addReview(newReview);
    return createdReview;
}