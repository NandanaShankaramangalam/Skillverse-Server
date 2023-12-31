import { Router } from 'express'
import {upload} from '../../../index'
import { addProfile, checkTutorForOtp, createCourse, dashboardData, editProfile, editTutorial, fetchStudents, resetPassword, showCategory, showCourseDetails, showCourses, showProfile, showSubcategory, tutorRegister, uploadClass, videoUpload } from '../controllers/tutorController';
import { tutorLogin } from '../controllers/tutorController';
import { tutorAuth } from '../middlewares/tutorAuth';

export const tutorRouter = Router();  

tutorRouter.post('/tutor-register',tutorRegister);
tutorRouter.post('/tutor-login',tutorLogin);
// tutorRouter.post('/video-upload',upload.single('video'),videoUpload);
tutorRouter.post('/video-upload',videoUpload);
tutorRouter.post('/add-profile',addProfile);
tutorRouter.get('/profile/:tutId',tutorAuth,showProfile);
tutorRouter.post('/edit-profile/:tutId',editProfile);
tutorRouter.get('/show-category',showCategory);
tutorRouter.get('/get-subcategory/:cat',showSubcategory);
tutorRouter.post('/create-course',createCourse);
tutorRouter.get('/course-list/:tutId',showCourses);
tutorRouter.get('/course-details/:courseId',showCourseDetails);
tutorRouter.post('/upload-class',uploadClass);  
tutorRouter.get('/show-students',fetchStudents);  
tutorRouter.post('/edit-tutorials',editTutorial);  
tutorRouter.get('/dashboard-details/:tutId',dashboardData);
tutorRouter.post('/check-tutor',checkTutorForOtp);
tutorRouter.post('/reset-password',resetPassword);
