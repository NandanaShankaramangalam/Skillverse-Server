import mongoose, { Document, Model, Schema } from 'mongoose';
import { admin } from "../../domain/models/admin";

export type MongoDAdmin = Model<Document<any, any, any> & admin>;

const adminSchema = new Schema<admin>({
    username: {
        type : 'string',
        required : true,
    },
    password: {
        type : 'string',
        required : true,
    },
})

export const adminModel: MongoDAdmin = mongoose.connection.model<Document<any, any, any> & admin>('admin', adminSchema);

