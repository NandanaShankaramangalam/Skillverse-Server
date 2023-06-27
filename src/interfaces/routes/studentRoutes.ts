import { Router } from 'express'
import { studentRegister, studentLogin } from '../controllers/studentController';

export const studentRouter = Router();

studentRouter.post('/register',studentRegister);
studentRouter.post('/student-login',studentLogin);
// export default studentRouter