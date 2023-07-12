import { Router } from 'express'
import { studentRegister, studentLogin, showCategory, showCourses, showInfo, updateInfo } from '../controllers/studentController';

export const studentRouter = Router();

studentRouter.post('/register',studentRegister);
studentRouter.post('/student-login',studentLogin);
studentRouter.get('/show-category',showCategory);
studentRouter.get('/show-courses/:selectedCategory',showCourses);
studentRouter.get('/personal-info/:studId',showInfo);
studentRouter.post('/update-info/:studId',updateInfo);

// export default studentRouter