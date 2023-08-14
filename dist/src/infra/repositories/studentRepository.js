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
exports.studentRepositoryImpl = void 0;
const mongodb_1 = require("mongodb");
const studentRepositoryImpl = (studentModel) => {
    //Create Student
    const create = (student) => __awaiter(void 0, void 0, void 0, function* () {
        const createdStudent = yield studentModel.create(student);
        console.log('hiiii-', createdStudent);
        return createdStudent.toObject();
    });
    // student login
    const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const stud = yield studentModel.findOne({ email });
        return stud ? stud.toObject() : null;
    });
    //Fetch student data
    const findStudents = () => __awaiter(void 0, void 0, void 0, function* () {
        const students = yield studentModel.find();
        return students.map((stud) => stud.toObject());
    });
    //Block student
    const blockStudents = (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('iddd=', id);
        // .then((data)=>{
        //     // console.log('block done');
        //     // console.log('data=',data);
        //     // if(data.modifiedCount>0){
        //     //     return {block:true};
        //     // }
        //     return data
        //  })
        const result = yield studentModel.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { status: false } });
        if (result.modifiedCount > 0) {
            console.log('modifiedcount blk ok');
            return result;
        }
    });
    //Unblock student
    const unblockStudents = (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('iddd=', id);
        const result = yield studentModel.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { status: true } });
        if (result.modifiedCount > 0) {
            console.log('modifiedcount unblk ok');
            return result;
        }
    });
    //Fetch Personal Info
    const fetchPersonalInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const info = yield studentModel.findOne({ _id: new mongodb_1.ObjectId(id) });
        return info ? info.toObject() : null;
    });
    //Update Personal Info
    const updateInfo = (fname, lname, username, email, id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield studentModel.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { fname: fname, lname: lname, username: username, email: email } });
        if (result.modifiedCount > 0) {
            console.log('modifiedcount blk ok');
            return result;
        }
    });
    //Course Purchased
    const coursePurchased = (courseId, status, studId) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield studentModel.updateOne({ _id: new mongodb_1.ObjectId(studId) }, { $push: { courses: { courseId: courseId, paymentStatus: status } } });
        if (result.modifiedCount > 0) {
            console.log('modifiedcount unblk ok');
            return result;
        }
    });
    //CourseId Check
    // const courseExist = async(studId:string, courseId:string): Promise<boolean|null>=>{
    //     const result = await studentModel.findOne({ _id:new ObjectId(studId), "courses.courseId": courseId })
    // }
    //Reset password
    const resetPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield studentModel.updateOne({ email: email }, { $set: { password: password } });
        if (result.modifiedCount > 0) {
            console.log('Password reset successful');
            return result;
        }
    });
    return {
        create,
        findByEmail,
        findStudents,
        blockStudents,
        unblockStudents,
        fetchPersonalInfo,
        updateInfo,
        coursePurchased,
        resetPassword,
        // courseExist,
    };
};
exports.studentRepositoryImpl = studentRepositoryImpl;
