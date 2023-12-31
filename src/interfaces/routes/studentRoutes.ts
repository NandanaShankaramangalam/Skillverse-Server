import { Router } from 'express'
import { studentRegister, studentLogin, showCategory, showCourses, showInfo, updateInfo, fetchCourseDetails, payment, fetchStudentDetails, postReview, fetchReviews, bookmarkCourses, removeBookmarkedCourses, fetchSavedCourses, fetchPurchasedCourses, checkStudForOtp, resestPassword, rating, fetchTutors, showTutorProfile, editReviews, deleteReviews, findAvgRating } from '../controllers/studentController';
import { studentAuth } from '../middlewares/studentAuth';

export const studentRouter = Router();

studentRouter.post('/register',studentRegister);
studentRouter.post('/student-login',studentLogin);
studentRouter.get('/show-category',showCategory);
studentRouter.get('/show-courses/:selectedCategory',showCourses);
studentRouter.get('/personal-info/:studId',studentAuth,showInfo);
studentRouter.post('/update-info/:studId',studentAuth,updateInfo);
studentRouter.get('/course/:courseId',fetchCourseDetails);
studentRouter.post('/payment',payment);
studentRouter.get('/student/:studId',fetchStudentDetails);
studentRouter.post('/post-review/:courseId/:studId',postReview);
studentRouter.get('/view-reviews/:courseId',fetchReviews);
studentRouter.post('/bookmark/:courseId/:studId',studentAuth,bookmarkCourses)
studentRouter.post('/remove-bookmark/:courseId/:studId',studentAuth,removeBookmarkedCourses)
studentRouter.get('/saved-courses/:studId',studentAuth,fetchSavedCourses)
studentRouter.get('/purchased-courses/:studId',studentAuth,fetchPurchasedCourses)
studentRouter.post('/check-student',checkStudForOtp)
studentRouter.post('/reset-password',resestPassword)
studentRouter.post('/rating',rating)
studentRouter.get('/tutors-list',fetchTutors)
studentRouter.get('/view-tutor-profile/:tutId',showTutorProfile)
studentRouter.post('/edit-reviews',studentAuth,editReviews)
studentRouter.post('/delete-reviews',studentAuth,deleteReviews)
studentRouter.get('/average-rating',findAvgRating)
// export default studentRouter