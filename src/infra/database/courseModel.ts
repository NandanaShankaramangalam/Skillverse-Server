import mongoose, { Document, Model, Schema } from 'mongoose';
import { Course } from '../../domain/models/course';

export type MongoDBCourse = Model<Document & Course>;

const courseSchema = new Schema<Course>({
    title : {
        type : String,
        required : true,
    },
    fee : {
        type : Number,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    subcategory : {
        type : [String],
    },
    description : {
        type : String,
        required : true
    },
    thumbnail : {
        type : String,
        required : true,
    },
    video : {
        type : String,
        required : true,
    },
    tutId : {
        type : String,
        required : true,
    },
    status : {
        type : Boolean,
        default : true,
    },
    students : {
        type : [String],
    },
})

export const courseModel: MongoDBCourse = mongoose.connection.model<Document & Course>('course', courseSchema);