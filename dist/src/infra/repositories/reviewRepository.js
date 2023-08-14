"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRepositoryImpl = void 0;
const mongodb_1 = require("mongodb");
const reviewRepositoryImpl = (reviewModel) => {
    //Add Review 
    const addReview = (review) => __awaiter(void 0, void 0, void 0, function* () {
        const postedReview = yield reviewModel.create(review);
        return postedReview ? postedReview.toObject() : null;
    });
    //Fetch all reviews
    // const fetchAllReviews = async(courseId:string):Promise<review[]|null>=>{
    //     const allReviews = await reviewModel.find({courseId:courseId});
    //     return allReviews.map((obj)=>obj.toObject());
    // }
    const fetchAllReviews = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        const allReviews = yield reviewModel.find({ courseId: courseId }).populate("studId", "-password");
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
        return allReviews.map((obj) => obj.toObject());
        // return allReviews
    });
    //Rating
    const rating = (ratingValue, studId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('cciidd=', courseId);
        console.log('ssiidd=', studId);
        // const ratings = await reviewModel.updateMany({$and:[{studId:studId},{courseId:courseId}]},{$set:{rating:ratingValue}})
        const ratings = yield reviewModel.updateMany({ studId: new mongodb_1.ObjectId(studId), courseId: courseId }, { $set: { rating: ratingValue } });
        if (ratings.modifiedCount > 0) {
            console.log('rating modified');
            return ratings;
        }
        return null;
    });
    //Edit Rating
    const editReview = (reviewId, review) => __awaiter(void 0, void 0, void 0, function* () {
        const reviewData = yield reviewModel.updateOne({ _id: new mongodb_1.ObjectId(reviewId) }, { $set: { review: review } });
        if (reviewData.modifiedCount > 0) {
            return reviewData;
        }
        return null;
    });
    //Delete review
    const deleteReviews = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
        const reviewData = yield reviewModel.deleteOne({ _id: new mongodb_1.ObjectId(reviewId) });
        return reviewData;
    });
    //Average Rating
    const findAverageRating = () => __awaiter(void 0, void 0, void 0, function* () {
        // const rating = await reviewModel.aggregate([{ $group: { _id: { courseId: "$courseId" }, users: {$addToSet:"$$ROOT"}}}])
        const rating = yield reviewModel.find();
        return rating;
    });
    return {
        addReview,
        fetchAllReviews,
        rating,
        editReview,
        deleteReviews,
        findAverageRating,
    };
};
exports.reviewRepositoryImpl = reviewRepositoryImpl;
