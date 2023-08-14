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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAvgRating = exports.deleteReviews = exports.editReviews = exports.showTutorProfile = exports.fetchTutors = exports.rating = exports.resestPassword = exports.checkStudForOtp = exports.fetchPurchasedCourses = exports.fetchSavedCourses = exports.removeBookmarkedCourses = exports.bookmarkCourses = exports.fetchReviews = exports.postReview = exports.fetchStudentDetails = exports.payment = exports.fetchCourseDetails = exports.updateInfo = exports.showInfo = exports.showCourses = exports.showCategory = exports.studentLogin = exports.studentRegister = void 0;
const reviewRepository_1 = require("./../../infra/repositories/reviewRepository");
const courseRepository_1 = require("./../../infra/repositories/courseRepository");
const categoryRepository_1 = require("./../../infra/repositories/categoryRepository");
const logStudent_1 = require("./../../app/usecases/student/logStudent");
const studentModel_1 = require("../../infra/database/studentModel");
const studentRepository_1 = require("../../infra/repositories/studentRepository");
const regStudent_1 = require("../../app/usecases/student/regStudent");
const categoryModel_1 = require("../../infra/database/categoryModel");
const fetchCategory_1 = require("../../app/usecases/student/fetchCategory");
const courseModel_1 = require("../../infra/database/courseModel");
const fetchCourses_1 = require("../../app/usecases/student/fetchCourses");
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const fetchInfo_1 = require("../../app/usecases/student/fetchInfo");
const updateInfo_1 = require("../../app/usecases/student/updateInfo");
const fetchCourseDetails_1 = require("../../app/usecases/student/fetchCourseDetails");
const payment_1 = require("../../app/usecases/student/payment");
const coursePurchased_1 = require("../../app/usecases/student/coursePurchased");
const fetchStudentData_1 = require("../../app/usecases/student/fetchStudentData");
const reviewModel_1 = require("../../infra/database/reviewModel");
const postReviews_1 = require("../../app/usecases/student/postReviews");
const fetchReviews_1 = require("../../app/usecases/student/fetchReviews");
const mongoose_1 = __importDefault(require("mongoose"));
const courseBookmark_1 = require("../../app/usecases/student/courseBookmark");
const removeBookmark_1 = require("../../app/usecases/student/removeBookmark");
const fetchBookmarkedCourses_1 = require("../../app/usecases/student/fetchBookmarkedCourses");
const fetchPurchasedCourses_1 = require("../../app/usecases/student/fetchPurchasedCourses");
const CheckStudent_1 = require("../../app/usecases/student/CheckStudent");
const passwordReset_1 = require("../../app/usecases/student/passwordReset");
const rating_1 = require("../../app/usecases/student/rating");
const tutorModel_1 = require("../../infra/database/tutorModel");
const tutorRepository_1 = require("../../infra/repositories/tutorRepository");
const fetchTutors_1 = require("../../app/usecases/student/fetchTutors");
const fetchProfile_1 = require("../../app/usecases/tutor/fetchProfile");
const editReviews_1 = require("../../app/usecases/student/editReviews");
const deleteReviews_1 = require("../../app/usecases/student/deleteReviews");
const avgRating_1 = require("../../app/usecases/student/avgRating");
const otpSender = require('node-otp-sender');
// const JWT_SECRET="sdfghjlkj345678()fgjhkjhyftr[];dfghjhdfhggddfghghfdf3456";
const JWT_SECRET = 'your-secret-key';
const db = studentModel_1.studentModel;
const studentRepository = (0, studentRepository_1.studentRepositoryImpl)(db);
const catDb = categoryModel_1.categoryModel;
const categoryRepository = (0, categoryRepository_1.categoryRepositoryImpl)(catDb);
const courseDb = courseModel_1.courseModel;
const courseRepository = (0, courseRepository_1.courseRepositoryImpl)(courseDb);
const reviewDb = reviewModel_1.reviewModel;
const reviewRepository = (0, reviewRepository_1.reviewRepositoryImpl)(reviewDb);
const tutorDb = tutorModel_1.tutorModel;
const tutorRepository = (0, tutorRepository_1.tutorRepositoryImpl)(tutorDb);
//Student Registration
const studentRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('hii', req.body);
    const { fname, lname, username, email, password, isGoogle } = req.body;
    try {
        const student = yield (0, regStudent_1.registerStudent)(studentRepository)(fname, lname, username, email, password, isGoogle);
        if (student) {
            res.status(201).json({ message: 'Registration successful', student });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    catch (err) {
        // console.log(JSON.parse(JSON.stringify(err)).code);
        // if(JSON.parse(JSON.stringify(err)).code == 11000){
        //     res.status(403).json({message:'Email already exist!'});
        // }
        // else{
        //     res.status(500).json({message:'Internal server error!'});
        // }
        res.status(500).json({ message: 'Internal server error!' });
    }
});
exports.studentRegister = studentRegister;
//Student Login
const studentLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('req--', req.body);
    const { email, password } = req.body;
    console.log('email=', email);
    console.log('password=', password);
    const expirationTime = Math.floor(Date.now() / 1000) + 2 * 60 * 60 * 1000;
    const payload = {
        exp: expirationTime,
    };
    try {
        console.log('kkkk');
        const studentExist = yield (0, logStudent_1.loginStudent)(studentRepository)(email, password);
        console.log('studexrt=', studentExist);
        if (studentExist && 'block' in studentExist && (studentExist === null || studentExist === void 0 ? void 0 : studentExist.block) === true) {
            res.json({ block: "You are blocked!" });
        }
        else {
            if (studentExist) {
                // console.log('stu',student);
                //     const student = {
                //     fname: studentExist.fname,
                //     lname: studentExist.lname,
                //     username: studentExist.username,
                //     email: studentExist.email,
                // }
                const student = __rest(studentExist, []);
                console.log('kk=', student);
                const token = jwt.sign(payload, JWT_SECRET);
                // res.status(200).json({ success: "Login successful", student , token});
                res.json({ success: "Login successful", student, token });
            }
            else {
                // res.status(401).json({ invalid: "Invalid email or password" });
                res.json({ invalid: "Invalid email or password!" });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.studentLogin = studentLogin;
//Show Category
const showCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cateData = yield (0, fetchCategory_1.fetchCategoryData)(categoryRepository)();
        if (cateData) {
            // const newArray = cateData.map(obj=>{return {...obj,subcategory:obj.subcategory}})
            const newArray = cateData.map(obj => { return Object.assign({}, obj); });
            // console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',newArray);
            res.json({ success: 'Category data fetching successful', newArray });
        }
        else {
            res.json({ invalid: "No category data available!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.showCategory = showCategory;
//Show courses 
const showCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('okkkkkk');
        const selectedCategory = req.params.selectedCategory;
        // console.log('sel ctgry=',selectedCategory);
        const course = yield (0, fetchCourses_1.fetchCourses)(courseRepository)(selectedCategory);
        const courses = course === null || course === void 0 ? void 0 : course.filter((obj) => { var _a; return (_a = obj.tutorial) === null || _a === void 0 ? void 0 : _a.length; });
        console.log('cossssssssssss=', courses);
        // const s3 = new AWS.S3({
        //     accessKeyId: `${s3Config.accessKeyId}`,
        //     secretAccessKey: `${s3Config.secretAccessKey}`,
        //     region: `${s3Config.region}`,
        //   });
        //   const filteredCourses = courses?.map(course=>{
        //     // const url =  s3.getSignedUrlPromise('getObject', params);
        //     const videoUrl = generateS3SignedUrl(course.video);
        //     const thumbnailUrl = generateS3SignedUrl(course.thumbnail);
        // // const url = URL.createObjectURL(new Blob([body.Body as ArrayBuffer]));
        //     return { ...course, videoUrl, thumbnailUrl };
        //   })
        //    function generateS3SignedUrl(key:string) {
        //     console.log('key=',key);
        //     const params = {
        //       Bucket: `${s3Config.bucketName}`,
        //       Key: key,
        //     //   Expires: 3600, // URL expiration time in seconds
        //     };
        //   console.log("this ", params);
        //     // return s3.getSignedUrl('getObject', params);
        //     return s3.getSignedUrl('getObject', params)
        //   }
        if (courses) {
            res.json({ success: 'Course data fetching successful', courses });
        }
        else {
            res.json({ invalid: "Course data not available!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.showCourses = showCourses;
//Fetch Personal Info
const showInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studId = req.params.studId;
        console.log('stud id=', studId);
        const info = yield (0, fetchInfo_1.fetchInfo)(studentRepository)(studId);
        //    console.log('inn=',info);
        if (info) {
            res.json({ success: 'Personal Info fetching successful', info });
        }
        else {
            res.json({ invalid: "Personal Info not available!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.showInfo = showInfo;
//Update personal info
const updateInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studId = req.params.studId;
        const { fname, lname, username, email } = req.body;
        console.log('stud id=', studId);
        console.log('fname=', fname);
        const info = yield (0, updateInfo_1.updatePersonalInfo)(studentRepository)(fname, lname, username, email, studId);
        // console.log('upp=',info);
        if (info) {
            res.json({ success: 'Personal Info updating successful', info });
        }
        else {
            res.json({ invalid: "Personal Info updation failed!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateInfo = updateInfo;
//Fetch Course Details
const fetchCourseDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        console.log('cid=', courseId);
        const result = yield (0, fetchCourseDetails_1.fetchCourse)(courseRepository)(courseId);
        console.log('res==', result);
        if (result) {
            res.json({ success: 'Course data fetching successful', result });
        }
        else {
            res.json({ invalid: "Course data fetching failed!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.fetchCourseDetails = fetchCourseDetails;
//Payment
const payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, courseId, studId, fee } = req.body;
        const fees = parseInt(fee);
        console.log('status payment=', status, courseId, fees);
        const result = yield (0, payment_1.coursePayment)(courseRepository)(courseId, status, studId, fees);
        const resultData = yield (0, coursePurchased_1.coursePurchased)(studentRepository)(courseId, status, studId);
        console.log('res==', result);
        if (result) {
            res.json({ success: 'Payment successful', result });
        }
        else {
            res.json({ invalid: "Payment failed!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.payment = payment;
//Fetch Student Details
const fetchStudentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studId = req.params.studId;
        console.log('sid=', studId);
        const studentData = yield (0, fetchStudentData_1.fetchStudentData)(studentRepository)(studId);
        console.log('stuudddatta=', studentData);
        if (studentData) {
            res.json({ success: 'Student data fetching successful', studentData });
        }
        else {
            res.json({ invalid: "Student data fetching failed!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.fetchStudentDetails = fetchStudentDetails;
//Post Review
const postReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('rev body=', req.body);
        const { review } = req.body;
        const courseId = req.params.courseId;
        const studId = req.params.studId;
        const studid = new mongoose_1.default.Types.ObjectId(studId);
        const postedReview = yield (0, postReviews_1.postReviews)(reviewRepository)(review, courseId, studid);
        if (postedReview) {
            res.status(201).json({ message: 'Review added succesfully', postedReview });
        }
        else {
            res.status(401).json({ message: 'Invalid datas' });
        }
    }
    catch (error) {
        console.log('err=', error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.postReview = postReview;
//Fetch Reviews
const fetchReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        const postedReviews = yield (0, fetchReviews_1.fetchReview)(reviewRepository)(courseId);
        if (postedReviews) {
            res.status(201).json({ message: 'Review fetched succesfully', postedReviews });
        }
        else {
            res.status(401).json({ message: 'Invalid datas' });
        }
    }
    catch (error) {
        console.log("err=", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.fetchReviews = fetchReviews;
//Bookmark courses
const bookmarkCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        const studId = req.params.studId;
        const bookmark = yield (0, courseBookmark_1.courseBookmark)(courseRepository)(courseId, studId);
        if (bookmark) {
            res.status(201).json({ message: 'Course bookmarked succesfully', bookmark });
        }
        else {
            res.status(401).json({ message: 'Invalid datas' });
        }
    }
    catch (error) {
        console.log("err=", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.bookmarkCourses = bookmarkCourses;
//Remove Bookmarked Courses
const removeBookmarkedCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        const studId = req.params.studId;
        const bookmark = yield (0, removeBookmark_1.removeCourseBookmark)(courseRepository)(courseId, studId);
        if (bookmark) {
            res.status(201).json({ message: 'Course bookmark removed succesfully', bookmark });
        }
        else {
            res.status(401).json({ message: 'Invalid datas' });
        }
    }
    catch (error) {
        console.log("err=", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.removeBookmarkedCourses = removeBookmarkedCourses;
//Fetch BookmarkedCourses
const fetchSavedCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studId = req.params.studId;
        const bookmarkedCourses = yield (0, fetchBookmarkedCourses_1.getSavedCourses)(courseRepository)(studId);
        console.log('jjjjjjjjjjjj=', bookmarkedCourses);
        if (bookmarkedCourses) {
            res.status(201).json({ message: 'Fetch all bookmarked courses succesfully', bookmarkedCourses });
        }
        else {
            res.status(401).json({ message: 'Invalid datas' });
        }
    }
    catch (error) {
        console.log("err=", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.fetchSavedCourses = fetchSavedCourses;
//Fetch Purchased Courses
const fetchPurchasedCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studId = req.params.studId;
        const purchasedCourses = yield (0, fetchPurchasedCourses_1.getPurchasedCourses)(courseRepository)(studId);
        //  console.log('pur=',purchasedCourses);
        if (purchasedCourses) {
            res.status(201).json({ message: 'Fetch all bookmarked courses succesfully', purchasedCourses });
        }
        else {
            res.status(401).json({ message: 'Invalid datas' });
        }
    }
    catch (error) {
        console.log("err=", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.fetchPurchasedCourses = fetchPurchasedCourses;
//Student Check To Send OTP
const checkStudForOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        console.log('em=', email);
        const emailCheck = yield (0, CheckStudent_1.CheckStudent)(studentRepository)(email);
        if (emailCheck) {
            const senderEmail = `${process.env.REACT_APP_SENDER_EMAIL}`;
            const senderPassword = `${process.env.REACT_APP_SENDER_PASSWORD}`;
            const recipientEmail = email;
            const subject = 'OTP Verification';
            otpSender(senderEmail, senderPassword, recipientEmail, subject)
                .then((response) => {
                console.log(response);
                res.status(201).json({ message: 'Email exist', emailExist: true, otp: response.otp });
            })
                .catch((error) => {
                console.error('Error:', error);
            });
        }
        else {
            res.json({ message: 'Email doesnot exist!', emaiExist: false });
        }
    }
    catch (error) {
        console.log("err=", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.checkStudForOtp = checkStudForOtp;
//Reset Password
const resestPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log('email=', email);
        console.log('password=', password);
        const result = yield (0, passwordReset_1.passwordReset)(studentRepository)(email, password);
        if (result) {
            res.status(201).json({ message: 'Password reset successfull', result });
        }
        else {
            res.json({ message: 'Invalid datas' });
        }
    }
    catch (error) {
        console.log("err=", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.resestPassword = resestPassword;
//Rating
const rating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { selectedValue, studId, courseId } = req.body;
        console.log('sele=', selectedValue);
        console.log('cid=', courseId);
        console.log('cid=', studId);
        const ratingValue = parseInt(selectedValue);
        const result = yield (0, rating_1.courseRating)(reviewRepository)(ratingValue, studId, courseId);
        console.log('res rat=', result);
        if (result) {
            res.status(201).json({ message: 'Rating done', result });
        }
        else {
            res.json({ message: 'Invalid datas' });
        }
    }
    catch (error) {
        console.log("err=", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.rating = rating;
//Fetch Tutors
const fetchTutors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorsData = yield (0, fetchTutors_1.getTutorsList)(tutorRepository)();
        console.log('tu=', tutorsData);
        if (tutorsData) {
            res.status(201).json({ message: 'Tutors fetch successful', tutorsData });
        }
        else {
            res.json({ message: 'Invalid datas' });
        }
    }
    catch (error) {
        console.log("err=", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.fetchTutors = fetchTutors;
// Show Tutor Profile
const showTutorProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutId = req.params.tutId;
        const tutorData = yield (0, fetchProfile_1.fetchProfileData)(tutorRepository)(tutId);
        if (tutorData) {
            res.status(201).json({ message: 'Tutor Profile Fetch Successful', tutorData });
        }
        else {
            res.json({ message: 'Invalid datas' });
        }
    }
    catch (error) {
        console.log("err=", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.showTutorProfile = showTutorProfile;
//Edit Reviews
const editReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reviewId, newReview } = req.body;
        console.log('revid=', reviewId);
        console.log('revv=', newReview);
        const reviewData = yield (0, editReviews_1.editReview)(reviewRepository)(reviewId, newReview);
        console.log('revv=', reviewData);
        res.json({ message: 'Review updated successfully', reviewData });
    }
    catch (error) {
        console.log("err=", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.editReviews = editReviews;
//Delete Reviews 
const deleteReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reviewId } = req.body;
        const reviewData = yield (0, deleteReviews_1.deleteReview)(reviewRepository)(reviewId);
        res.json({ message: 'Review updated successfully', reviewData });
    }
    catch (error) {
        console.log("err=", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteReviews = deleteReviews;
//Find Average Rating
const findAvgRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const avgRating = yield (0, avgRating_1.avgRatings)(reviewRepository)();
        console.log('avg=', avgRating);
        //  console.log('avgg=',avgRating[0].users);
        // const obj: any = {};
        // avgRating?.forEach((item:any)=> {
        //     const unique:any = []
        //     item.users.forEach((element:any) => {
        //         console.log('elem=',element);
        //         if(!unique.includes(element.studId)){
        //             if(isNaN( obj[element.courseId])){
        //                 obj[element.courseId] = 0
        //             }
        //             unique.push(element.studId) 
        //             obj[element.courseId] += element.rating
        //         }
        //         console.log('uniq=',unique);
        //     });
        // });
        //  console.log('obj=',obj);
        //     const obj: any = {};
        // const unique: any = []; // Initialize the unique array outside both loops
        // avgRating?.forEach((item: any) => {
        //   item.users.forEach((element: any) => {
        //     if (!unique.includes(element.studId)) {
        //       unique.push(element.studId);
        //     }
        //   });
        //   console.log('uniq',unique);
        // });
        // const unique = new Map();
        // const filteredData = avgRating.filter((item:any)=>{
        //     if(unique.get(item.courseId))
        // })
    }
    catch (error) {
        console.log("err=", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.findAvgRating = findAvgRating;
