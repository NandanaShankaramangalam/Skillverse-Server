import { rating } from './../../interfaces/controllers/studentController';
import { review } from "../../domain/models/review"
import { MongoDBReview, reviewModel } from "../database/reviewModel"
import { UpdateResult } from '../../domain/models/update';
import { ObjectId } from 'mongodb';
import { Delete } from '../../domain/models/delete';
export type reviewRepository = {
  addReview(review:review) : Promise<review|null>;
  fetchAllReviews(courseId:string) : Promise<review[]|null>;
  rating(ratingValue:number,studId:string,courseId:string) : Promise<review|null|UpdateResult>;
  editReview(reviewId:string,review:string) : Promise<review|null|UpdateResult>;
  deleteReviews(reviewId:string) : Promise<Delete>
  findAverageRating() : Promise<review[]|null>;
}

export const reviewRepositoryImpl = (reviewModel:MongoDBReview):reviewRepository=>{
    
    //Add Review 
    const addReview = async(review:review): Promise<review|null>=>{
        const postedReview = await reviewModel.create(review);
        return postedReview? postedReview.toObject():null;
    }
    
    //Fetch all reviews

    // const fetchAllReviews = async(courseId:string):Promise<review[]|null>=>{
    //     const allReviews = await reviewModel.find({courseId:courseId});
    //     return allReviews.map((obj)=>obj.toObject());
    // }
    const fetchAllReviews = async(courseId:string):Promise<review[]|null>=>{
        const allReviews = await reviewModel.find({courseId:courseId}).populate("studId","-password");
        // const allReviews = await reviewModel.aggregate([
        //     {
        //       $lookup: {
        //         from: "students",
        //         localField: "studId",
        //         foreignField: "_id",
        //         as: "studentDetails"
        //       }
        //     }
        //   ]);
          
        return allReviews.map((obj)=>obj.toObject());
        // return allReviews
    }

    //Rating
    const rating = async(ratingValue:number,studId:string,courseId:string): Promise<review|null|UpdateResult>=>{
      console.log('cciidd=',courseId);
      console.log('ssiidd=',studId);
      
      // const ratings = await reviewModel.updateMany({$and:[{studId:studId},{courseId:courseId}]},{$set:{rating:ratingValue}})
      const ratings = await reviewModel.updateMany({studId:new ObjectId(studId),courseId:courseId},{$set:{rating:ratingValue}})
       if(ratings.modifiedCount>0){
          console.log('rating modified');
          return ratings;
       }
       return null;
    }

    //Edit Rating
    const editReview = async(reviewId:string,review:string) : Promise<review|null|UpdateResult>=>{
      const reviewData = await reviewModel.updateOne({_id:new ObjectId(reviewId)},{$set:{review:review}})
      if(reviewData.modifiedCount>0){
        return reviewData;
     }
     return null;
    }

    //Delete review
    const deleteReviews = async(reviewId:string) : Promise<Delete>=>{
      const reviewData = await reviewModel.deleteOne({_id:new ObjectId(reviewId)});
      return reviewData;
    }

    //Average Rating
    const findAverageRating = async() : Promise<review[]|null>=>{
      // const rating = await reviewModel.aggregate([{ $group: { _id: { courseId: "$courseId" }, users: {$addToSet:"$$ROOT"}}}])
      
      const rating = await reviewModel.find();
      return rating
    }
    return{
      addReview,
      fetchAllReviews,
      rating,
      editReview,
      deleteReviews,
      findAverageRating,
    }
}