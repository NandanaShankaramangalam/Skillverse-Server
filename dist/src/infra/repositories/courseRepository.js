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
exports.courseRepositoryImpl = void 0;
// import { UpdateResult } from './studentRepository';
const mongodb_1 = require("mongodb");
const courseRepositoryImpl = (courseModel) => {
    //Create Course
    const createCourse = (course) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // console.log('okeyyyy');
            // console.log('course=',course);
            const createdCourse = yield courseModel.create(course);
            // console.log('hiiii-',createdCourse);
            return createdCourse.toObject();
        }
        catch (error) {
            console.error('Error creating course:', error);
            throw error; // or handle the error appropriately
        }
    });
    //Fetch courses
    const fetchCourse = (selectedCategory) => __awaiter(void 0, void 0, void 0, function* () {
        // const course = await courseModel.find({category:selectedCategory});
        const course = yield courseModel.aggregate([{ $match: { category: selectedCategory } },
            { $addFields: {
                    tutorsId: { $toObjectId: "$tutId" }
                } },
            { $lookup: {
                    from: "tutors",
                    localField: "tutorsId",
                    foreignField: "_id",
                    as: "Details",
                    pipeline: [{ $match: { status: true } }]
                } }]);
        // const course = await courseModel.aggregate([{$match:{category:selectedCategory}}]);
        // console.log('pppppppppp=',course);
        // return course.map((obj)=>obj.toObject());
        return course;
    });
    //Fetch Course Details
    const fetchCourseData = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courseData = yield courseModel.findOne({ _id: new mongodb_1.ObjectId(id) });
            // const courseData = await courseModel.({_id:new ObjectId(id)});
            // console.log('cosdata=',courseData);
            return courseData === null || courseData === void 0 ? void 0 : courseData.toObject();
        }
        catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
        }
    });
    //Fetch Courses for Tutor
    const fetchTutorCourses = (tutId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courseData = yield courseModel.find({ tutId: tutId });
            return courseData.map((obj) => obj.toObject());
        }
        catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
        }
    });
    //Fetch Course Details for tutor
    const fetchCourseDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courseData = yield courseModel.findOne({ _id: new mongodb_1.ObjectId(id) });
            return courseData ? courseData.toObject() : null;
        }
        catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
        }
    });
    //Upload tutorial 
    const insertTutorial = (videoLocation, thumbnailLocation, title, description, courseId, id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tutorial = yield courseModel.updateOne({ _id: new mongodb_1.ObjectId(courseId) }, { $push: { tutorial: { id: id, title: title, description: description, video: videoLocation, thumbnail: thumbnailLocation } } });
            if (tutorial.modifiedCount > 0) {
                console.log('modifiedcount of add tutorial');
                return tutorial;
            }
            return null;
        }
        catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
        }
    });
    //Payment
    const coursePayment = (id, status, studId, fees) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const date = new Date();
            const month = new Date().toLocaleString('default', { month: 'long' });
            const payment = yield courseModel.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                // $set:{paymentStatus:status},
                $push: { students: studId }
            });
            const pay = yield courseModel.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $push: { stud: { id: studId, date: date, month: month, fees: fees } } });
            if (payment.modifiedCount > 0) {
                console.log('modifiedcount blk ok');
                return payment;
            }
        }
        catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
        }
    });
    //Bookmark a course
    const bookmarkCourse = (courseId, studId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookmark = yield courseModel.updateOne({ _id: new mongodb_1.ObjectId(courseId) }, { $push: { bookmarks: studId } });
            if (bookmark.modifiedCount > 0) {
                return bookmark;
            }
        }
        catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
        }
    });
    //Remove Bookmareked Courses
    const removeBookmark = (courseId, studId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookmark = yield courseModel.updateOne({ _id: new mongodb_1.ObjectId(courseId) }, { $pull: { bookmarks: studId } });
            if (bookmark.modifiedCount > 0) {
                return bookmark;
            }
        }
        catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
        }
    });
    //  Fetch all bookmarked courses
    const fetchSavedCourses = (studId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('sidddd=', studId);
            const courses = yield courseModel.aggregate([
                {
                    $match: {
                        bookmarks: { $in: [studId] }
                    }
                }
            ]);
            //  const courses = await courseModel.aggregate([
            //   {
            //     $match:{
            //       bookmarks:{$in:[studId]}
            //     },
            //     $lookup:{
            //       from:'categories',
            //       localField:'category',
            //       foreignField:'category',
            //       as:'bookmarks'
            //     }
            //   }
            //  ])
            //  console.log('hhhjjhjhbhjb=',courses);
            return courses;
        }
        catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
        }
    });
    // db.courses.aggregate([{$match:{bookmarks:{$in:['6498151b57fc3aa4b85ead1d']}}},{$lookup:{from:'categories',localField:'category',foreignField:'category',as:'datas'}}])
    //Fetch Purchased Courses
    const fetchPurchasedCourses = (studId) => __awaiter(void 0, void 0, void 0, function* () {
        const courses = yield courseModel.aggregate([
            {
                $match: {
                    students: { $in: [studId] }
                }
            }
        ]);
        return courses;
    });
    //Fetch Category Data and Course
    const fetchCateData = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield courseModel.aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }]);
        return data;
    });
    //Fetch Graph Data
    const fetchGraphDatas = (tutId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield courseModel.aggregate([{
                $match: { tutId: tutId }
            }, {
                $unwind: "$stud"
            },
            { $group: { _id: "$stud.month", total: { $sum: "$stud.fees" } } }
        ]);
        return data;
    });
    //Fetch Bar Data
    const fetchBarDatas = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield courseModel.aggregate([{
                $unwind: "$stud"
            },
            { $group: { _id: "$stud.month", total: { $sum: { $multiply: ["$stud.fees", 0.05] } } } }
        ]);
        return data;
    });
    //Edit Tutorial
    const editTutorial = (courseId, newTitle, newDescription, ImgLocation, VdoLocation, img, videoUrl, vdoId, index) => __awaiter(void 0, void 0, void 0, function* () {
        if (ImgLocation && VdoLocation) {
            // console.log('vdoooiddd=',vdoId);
            const data = yield courseModel.updateOne({ _id: new mongodb_1.ObjectId(courseId), "tutorial.id": vdoId }, { $set: { 'tutorial.$.title': newTitle, 'tutorial.$.description': newDescription, 'tutorial.$.thumbnail': ImgLocation, 'tutorial.$.video': VdoLocation } });
            console.log('scnddddddddd=', data);
            console.log('!ImgLocation && !VdoLocation');
            return data;
        }
        else if (ImgLocation && !VdoLocation) {
            // console.log('vdoooiddd=',vdoId);
            const data = yield courseModel.updateOne({ _id: new mongodb_1.ObjectId(courseId), "tutorial.id": vdoId }, { $set: { 'tutorial.$.title': newTitle, 'tutorial.$.description': newDescription, 'tutorial.$.thumbnail': ImgLocation, 'tutorial.$.video': videoUrl } });
            // console.log('scnddddddddd=',data);
            // console.log('!ImgLocation && !VdoLocation');
            return data;
        }
        else if (!ImgLocation && VdoLocation) {
            // console.log('vdoooiddd=',vdoId);
            const data = yield courseModel.updateOne({ _id: new mongodb_1.ObjectId(courseId), "tutorial.id": vdoId }, { $set: { 'tutorial.$.title': newTitle, 'tutorial.$.description': newDescription, 'tutorial.$.thumbnail': img, 'tutorial.$.video': VdoLocation } });
            // console.log('scnddddddddd=',data);
            // console.log('!ImgLocation && !VdoLocation');
            return data;
        }
        else if (!ImgLocation && !VdoLocation) {
            console.log('vdoooiddd=', vdoId);
            const data = yield courseModel.updateOne({ _id: new mongodb_1.ObjectId(courseId), "tutorial.id": vdoId }, { $set: { 'tutorial.$.title': newTitle, 'tutorial.$.description': newDescription, 'tutorial.$.thumbnail': img, 'tutorial.$.video': videoUrl } });
            // console.log('scnddddddddd=',data);
            // console.log('!ImgLocation && !VdoLocation');
            return data;
        }
        return null;
    });
    const fetchStudents = (tutId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield courseModel.aggregate([
            { $match: { tutId: tutId } },
        ]);
        return data;
    });
    return {
        createCourse,
        fetchCourse,
        fetchCourseData,
        fetchTutorCourses,
        fetchCourseDetails,
        insertTutorial,
        coursePayment,
        bookmarkCourse,
        removeBookmark,
        fetchSavedCourses,
        fetchPurchasedCourses,
        fetchCateData,
        fetchGraphDatas,
        fetchBarDatas,
        editTutorial,
        fetchStudents,
    };
};
exports.courseRepositoryImpl = courseRepositoryImpl;
