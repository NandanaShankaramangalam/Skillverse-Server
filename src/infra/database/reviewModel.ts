import mongoose, { Document, Model, Schema } from 'mongoose';
import { review } from "../../domain/models/review";

export type MongoDBReview = Model<Document & review>;
const reviewSchema = new Schema<review>({
 review : {
    type : String,
 },
 rating : {
    type : Number,
 },
 courseId : {
    type : String
 },
 studId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'student'
 },

})

export const  reviewModel: MongoDBReview = mongoose.connection.model<Document & review>('review', reviewSchema);