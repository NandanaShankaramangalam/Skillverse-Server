import { Router } from 'express'
import {upload} from '../../../index'
import { addProfile, showProfile, tutorRegister, videoUpload } from '../controllers/tutorController';
import { tutorLogin } from '../controllers/tutorController';
export const tutorRouter = Router();

tutorRouter.post('/tutor-register',tutorRegister);
tutorRouter.post('/tutor-login',tutorLogin);
// tutorRouter.post('/video-upload',upload.single('video'),videoUpload);
tutorRouter.post('/video-upload',videoUpload);
tutorRouter.post('/add-profile',addProfile);
tutorRouter.get('/profile/:tutId',showProfile);