import { Router } from 'express'
import { studentRegister, studentLogin, showCategory, showCourses, showInfo, updateInfo, fetchCourseDetails, payment, fetchStudentDetails, postReview, fetchReviews, bookmarkCourses, removeBookmarkedCourses } from '../controllers/studentController';
import { studentAuth } from '../middlewares/studentAuth';

export const studentRouter = Router();

studentRouter.post('/register',studentRegister);
studentRouter.post('/student-login',studentLogin);
studentRouter.get('/show-category',showCategory);
studentRouter.get('/show-courses/:selectedCategory',showCourses);
studentRouter.get('/personal-info/:studId',showInfo);
studentRouter.post('/update-info/:studId',updateInfo);
studentRouter.get('/course/:courseId',fetchCourseDetails);
studentRouter.post('/payment',payment);
studentRouter.get('/student/:studId',fetchStudentDetails);
studentRouter.post('/post-review/:courseId/:studId',postReview);
studentRouter.get('/view-reviews/:courseId',fetchReviews);
studentRouter.post('/bookmark/:courseId/:studId',bookmarkCourses)
studentRouter.post('/remove-bookmark/:courseId/:studId',removeBookmarkedCourses)
// studentRouter.post('/saved-courses/:studId',fetchSavedCourses)
// export default studentRouter