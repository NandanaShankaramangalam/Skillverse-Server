import { Router } from 'express'
import { tutorRegister } from '../controllers/tutorController';
import { tutorLogin } from '../controllers/tutorController';
export const tutorRouter = Router();

tutorRouter.post('/tutor-register',tutorRegister);
tutorRouter.post('/tutor-login',tutorLogin);