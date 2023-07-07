import { Router } from 'express'
import { addCategory, addSubcategory, adminLogin, blockStudent, blockTutor, editCategory, listCategory, showCategory, showStudent, showTutor, unblockStudent, unblockTutor, unlistCategory } from '../controllers/adminController';
export const adminRouter = Router();

adminRouter.post('/admin-login',adminLogin);

adminRouter.get('/student-data',showStudent);   
adminRouter.post('/block-student',blockStudent);  
adminRouter.post('/unblock-student',unblockStudent); 

adminRouter.get('/tutor-data',showTutor);   
adminRouter.post('/block-tutor',blockTutor);  
adminRouter.post('/unblock-tutor',unblockTutor); 

adminRouter.post('/add-category',addCategory);  
adminRouter.get('/show-category',showCategory);  
adminRouter.post('/list-category',listCategory);  
adminRouter.post('/unlist-category',unlistCategory);  
adminRouter.post('/add-subcategory',addSubcategory);  
adminRouter.post('/edit-category',editCategory);  