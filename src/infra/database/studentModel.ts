import mongoose, { Document, Model, Schema } from 'mongoose';
import { student } from '../../domain/models/student';

export type MongoDBUser = Model<Document<any, any, any> & student>;

const studentSchema = new Schema<student>({
    fname: {
        type : 'string',
        required : true,
    },
    lname: {
        type : 'string',
        required : true,
    },
    username: {
        type : 'string',
        required : true,
    },
    email: {
        type : 'string',
        required : true,
        unique : true
    },
    password: {
        type : 'string',
        required : true,
    },
    role : {
        type : 'string',
        default : 'student'
    },
    status: {
        type : 'boolean',
        default : true
    },
})

export const studentModel: MongoDBUser = mongoose.connection.model<Document<any, any, any> & student>('student', studentSchema);