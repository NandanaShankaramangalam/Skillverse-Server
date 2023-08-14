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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardData = exports.editTutorial = exports.fetchStudents = exports.uploadClass = exports.showCourseDetails = exports.showCourses = exports.createCourse = exports.showSubcategory = exports.showCategory = exports.editProfile = exports.showProfile = exports.addProfile = exports.videoUpload = exports.tutorLogin = exports.tutorRegister = void 0;
const studentRepository_1 = require("./../../infra/repositories/studentRepository");
const courseRepository_1 = require("./../../infra/repositories/courseRepository");
const categoryRepository_1 = require("./../../infra/repositories/categoryRepository");
const tutorModel_1 = require("../../infra/database/tutorModel");
const tutorRepository_1 = require("../../infra/repositories/tutorRepository");
const regTutor_1 = require("../../app/usecases/tutor/regTutor");
const logTutor_1 = require("../../app/usecases/tutor/logTutor");
const addProfile_1 = require("../../app/usecases/tutor/addProfile");
const fetchProfile_1 = require("../../app/usecases/tutor/fetchProfile");
const fetchCategory_1 = require("../../app/usecases/tutor/fetchCategory");
const categoryModel_1 = require("../../infra/database/categoryModel");
const courseCreation_1 = require("../../app/usecases/tutor/courseCreation");
const courseModel_1 = require("../../infra/database/courseModel");
const showCourses_1 = require("../../app/usecases/tutor/showCourses");
const courseDetails_1 = require("../../app/usecases/tutor/courseDetails");
const classUpload_1 = require("../../app/usecases/tutor/classUpload");
const editProfile_1 = require("../../app/usecases/tutor/editProfile");
const fetchSubcategory_1 = require("../../app/usecases/tutor/fetchSubcategory");
const studentModel_1 = require("../../infra/database/studentModel");
const fetchStudent_1 = require("../../app/usecases/admin/fetchStudent");
const fetchGraphData_1 = require("../../app/usecases/tutor/fetchGraphData");
const TutorialEdit_1 = require("../../app/usecases/tutor/TutorialEdit");
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';
const db = tutorModel_1.tutorModel;
const tutorRepository = (0, tutorRepository_1.tutorRepositoryImpl)(db);
const cateDb = categoryModel_1.categoryModel;
const categoryRepository = (0, categoryRepository_1.categoryRepositoryImpl)(cateDb);
const courseDb = courseModel_1.courseModel;
const courseRepository = (0, courseRepository_1.courseRepositoryImpl)(courseDb);
const studDb = studentModel_1.studentModel;
const studentRepository = (0, studentRepository_1.studentRepositoryImpl)(studDb);
//Tutor Registration
const tutorRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('tut', req.body);
    const { fname, lname, username, email, password } = req.body;
    try {
        const tutor = yield (0, regTutor_1.registerTutor)(tutorRepository)(fname, lname, username, email, password);
        if (tutor) {
            res.status(201).json({ message: 'Registration successful', tutor });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error!' });
    }
});
exports.tutorRegister = tutorRegister;
//Tutor Login
const tutorLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('tut req=', req.body);
    try {
        const { email, password } = req.body;
        const expirationTime = Math.floor(Date.now() / 1000) + 2 * 60 * 60 * 1000;
        const payload = {
            exp: expirationTime,
        };
        const tutorExist = yield (0, logTutor_1.loginTutor)(tutorRepository)(email, password);
        if (tutorExist && 'block' in tutorExist && (tutorExist === null || tutorExist === void 0 ? void 0 : tutorExist.block) === true) {
            res.json({ block: "You are blocked!" });
        }
        else {
            if (tutorExist) {
                // const tutor = {
                //     fname: tutorExist.fname,
                //     lname: tutorExist.lname,
                //     username: tutorExist.username,
                //     email: tutorExist.email,
                // }
                // const {password,...tutor} = tutorExist;
                const tutor = __rest(tutorExist, []);
                // console.log('tootr=',tutor);
                const token = jwt.sign(payload, JWT_SECRET);
                res.json({ success: "Login successful", tutor, token });
            }
            else {
                res.json({ invalid: "Invalid email or password!" });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.tutorLogin = tutorLogin;
//Video Upload
const videoUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('uplddd=', req.body);
    // console.log('upld file',req.file);
});
exports.videoUpload = videoUpload;
// Add Profile
const addProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('profile=', req.body);
    try {
        const { profileLocation, bannerLocation, description, niche, tutId } = req.body;
        const profileData = yield (0, addProfile_1.profileAdd)(tutorRepository)(profileLocation, bannerLocation, description, niche, tutId);
        //   console.log(profileData);
        if (profileData) {
            res.json({ message: 'Tutor Profile Added', isBlocked: true });
        }
        else {
            res.json({ message: 'Tutor Profile Add Failed!' });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addProfile = addProfile;
//Show Profile
const showProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('aaa');
    console.log('tut id=', req.params.tutId);
    try {
        const tutId = req.params.tutId;
        const profileData = yield (0, fetchProfile_1.fetchProfileData)(tutorRepository)(tutId);
        console.log('prof data =', profileData);
        if (profileData) {
            res.json({ success: 'Profile data fetching successful', profileData });
        }
        else {
            res.json({ invalid: "Profile data fetching failed!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.showProfile = showProfile;
//Edit Profile
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('tut id=', req.params.tutId);
        console.log('datssssss=', req.body);
        const { profileLocation, bannerLocation, description, niche, tutId } = req.body;
        const profileData = yield (0, editProfile_1.profileEdit)(tutorRepository)(profileLocation, bannerLocation, description, niche, tutId);
        // console.log('pro=',profileData);
        if (profileData) {
            res.json({ message: 'Tutor Profile Edit Success', isBlocked: true });
        }
        else {
            res.json({ message: 'Tutor Profile Edit Failed!' });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.editProfile = editProfile;
//Show Category
const showCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('okkkkkkkkkkkkkkkkkkkkkkk');
        const cateData = yield (0, fetchCategory_1.fetchCategoryData)(categoryRepository)();
        if (cateData) {
            const newArray = cateData.map(obj => { return Object.assign({}, obj); });
            // const newArray = cateData.map(obj=>{return {...obj,subcategory:obj.subcategory}})
            // console.log('kk',newArray);
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
//Show Subcategory
const showSubcategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.params.cat;
        console.log('catt=', category);
        const subCategory = yield (0, fetchSubcategory_1.fetchSubcategory)(categoryRepository)(category);
        console.log('subb=', subCategory);
        if (subCategory) {
            res.json({ success: 'Subcategories fetch successful', subCategory });
        }
        else {
            res.json({ invalid: "Subcategories fetch failed!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.showSubcategory = showSubcategory;
//Course creation
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('rqbdy course = ', req.body);
        const { videoLocation, thumbnailLocation, title, fee, category, subcategory, description, tutId } = req.body;
        console.log('title=', title);
        console.log('subcat=', subcategory);
        console.log('tutid=', tutId);
        const course = yield (0, courseCreation_1.courseCreation)(courseRepository)(title, fee, category, subcategory, description, thumbnailLocation, videoLocation, tutId);
        console.log('course=', course);
        if (course) {
            res.json({ success: 'Course creation successful', course });
        }
        else {
            res.json({ invalid: "Course creation failed!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createCourse = createCourse;
//Show Courses
const showCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutId = req.params.tutId;
        console.log('new tutid=', tutId);
        const courseData = yield (0, showCourses_1.courseList)(courseRepository)(tutId);
        // console.log('costut=',courseData);
        if (courseData) {
            res.json({ success: 'Course fetching successful', courseData });
        }
        else {
            res.json({ invalid: "Course fetching failed!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.showCourses = showCourses;
//Show Course Details
const showCourseDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.courseId;
        console.log('ciddd=', id);
        const courseData = yield (0, courseDetails_1.fetchCourseDetails)(courseRepository)(id);
        //    console.log('hhh=',courseData);
        if (courseData) {
            res.json({ success: 'Course fetching successful', courseData });
        }
        else {
            res.json({ invalid: "Course fetching failed!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.showCourseDetails = showCourseDetails;
//Upload class
const uploadClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { videoLocation, thumbnailLocation, title, description, courseId, id } = req.body;
        console.log('title=', title);
        console.log('vdo=', videoLocation);
        const tutorial = yield (0, classUpload_1.classUpload)(courseRepository)(videoLocation, thumbnailLocation, title, description, courseId, id);
        console.log('tutorial=', tutorial);
        if (tutorial) {
            res.json({ success: 'Tutorial upload successful', tutorial });
        }
        else {
            res.json({ invalid: "Tutorial upload failed!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.uploadClass = uploadClass;
//Fetch Students
const fetchStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('controller ok');
        const students = yield (0, fetchStudent_1.fetchStudentData)(studentRepository)();
        if (students) {
            console.log('stdd=', students);
            res.json({ success: 'Student fetch successful', students });
        }
        else {
            res.json({ invalid: "Student fetch failed!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.fetchStudents = fetchStudents;
//Edit Tutorials
const editTutorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId, newTitle, newDescription, ImgLocation, VdoLocation, img, videoUrl, vdoId, index } = req.body;
        console.log('cidddddddddddddddddddddddddddddddddddddd=', courseId);
        console.log('title=', newTitle);
        console.log('Imgloc=', ImgLocation);
        console.log('Vdo=', VdoLocation);
        console.log('Desc=', newDescription);
        console.log('Img=', img);
        console.log('Vdourl=', videoUrl);
        console.log('VdoId=', vdoId);
        const editData = yield (0, TutorialEdit_1.TutorialEdit)(courseRepository)(courseId, newTitle, newDescription, ImgLocation, VdoLocation, img, videoUrl, vdoId, index);
    }
    catch (error) {
        console.log('errr=', error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.editTutorial = editTutorial;
//Dashboard Data
const dashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutId = req.params.tutId;
        console.log('tutu=', tutId);
        const dashData = yield (0, showCourses_1.courseList)(courseRepository)(tutId);
        const totalCourses = dashData === null || dashData === void 0 ? void 0 : dashData.length;
        console.log('dttd=', totalCourses);
        dashData === null || dashData === void 0 ? void 0 : dashData.map((obj) => { console.log('okk--', obj.stud); });
        //  console.log('dashhh=',dashData);
        const graphData = yield (0, fetchGraphData_1.fetchGraphData)(courseRepository)(tutId);
        console.log('graph=', graphData);
        //  const barData = await fetc
        res.json({ message: 'Data fetched successfully', graphData, dashData });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.dashboardData = dashboardData;
