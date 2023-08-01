import { review } from "../../domain/models/review"
import { MongoDBReview, reviewModel } from "../database/reviewModel"

export type reviewRepository = {
  addReview(review:review) : Promise<review|null>;
  fetchAllReviews(courseId:string) : Promise<review[]|null>;
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

    return{
      addReview,
      fetchAllReviews
    }
}