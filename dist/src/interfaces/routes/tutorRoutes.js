"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorRouter = void 0;
const express_1 = require("express");
const tutorController_1 = require("../controllers/tutorController");
const tutorController_2 = require("../controllers/tutorController");
const tutorAuth_1 = require("../middlewares/tutorAuth");
exports.tutorRouter = (0, express_1.Router)();
exports.tutorRouter.post('/tutor-register', tutorController_1.tutorRegister);
exports.tutorRouter.post('/tutor-login', tutorController_2.tutorLogin);
// tutorRouter.post('/video-upload',upload.single('video'),videoUpload);
exports.tutorRouter.post('/video-upload', tutorController_1.videoUpload);
exports.tutorRouter.post('/add-profile', tutorController_1.addProfile);
exports.tutorRouter.get('/profile/:tutId', tutorAuth_1.tutorAuth, tutorController_1.showProfile);
exports.tutorRouter.post('/edit-profile/:tutId', tutorController_1.editProfile);
exports.tutorRouter.get('/show-category', tutorController_1.showCategory);
exports.tutorRouter.get('/get-subcategory/:cat', tutorController_1.showSubcategory);
exports.tutorRouter.post('/create-course', tutorController_1.createCourse);
exports.tutorRouter.get('/course-list/:tutId', tutorController_1.showCourses);
exports.tutorRouter.get('/course-details/:courseId', tutorController_1.showCourseDetails);
exports.tutorRouter.post('/upload-class', tutorController_1.uploadClass);
exports.tutorRouter.get('/show-students', tutorController_1.fetchStudents);
exports.tutorRouter.post('/edit-tutorials', tutorController_1.editTutorial);
exports.tutorRouter.get('/dashboard-details/:tutId', tutorController_1.dashboardData);
exports.tutorRouter.post('/check-tutor', tutorController_1.checkTutorForOtp);
exports.tutorRouter.post('/reset-password', tutorController_1.resetPassword);
