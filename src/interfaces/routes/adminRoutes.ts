import { Router } from 'express'
import { addCategory, adminLogin, blockStudent, blockTutor, showStudent, showTutor, unblockStudent, unblockTutor } from '../controllers/adminController';
export const adminRouter = Router();

adminRouter.post('/admin-login',adminLogin);

adminRouter.get('/student-data',showStudent);   
adminRouter.post('/block-student',blockStudent);  
adminRouter.post('/unblock-student',unblockStudent); 

adminRouter.get('/tutor-data',showTutor);   
adminRouter.post('/block-tutor',blockTutor);  
adminRouter.post('/unblock-tutor',unblockTutor); 

adminRouter.post('/add-category',addCategory);  