import mongoose, { Document, Model, Schema } from 'mongoose';
import { category } from '../../domain/models/category';

export type MongoDBCategory = Model<Document & category>;

const categorySchema = new Schema<category>({
    category: {
        type : String,
        required : true,
    },
    subcategory: {
        type : [String],
        required : true,
    },
    status: {
        type : Boolean,
        default : true
    },
   
})

export const categoryModel: MongoDBCategory = mongoose.connection.model<Document & category>('category', categorySchema);

