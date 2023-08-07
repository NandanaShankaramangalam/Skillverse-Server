import { Router } from 'express'
import { addCategory, addSubcategory, adminLogin, blockStudent, blockTutor, dashboardData, editCategory, listCategory, showCategory, showStudent, showTutor, unblockStudent, unblockTutor, unlistCategory } from '../controllers/adminController';
import { adminAuth } from '../middlewares/adminAuth';
export const adminRouter = Router();

adminRouter.post('/admin-login',adminLogin);

adminRouter.get('/student-data',adminAuth,showStudent);   
adminRouter.post('/block-student',adminAuth,blockStudent);  
adminRouter.post('/unblock-student',adminAuth,unblockStudent); 

adminRouter.get('/tutor-data',adminAuth,showTutor);      
adminRouter.post('/block-tutor',adminAuth,blockTutor);  
adminRouter.post('/unblock-tutor',unblockTutor); 

adminRouter.post('/add-category',adminAuth,addCategory);  ``
adminRouter.get('/show-category',adminAuth,showCategory);  
adminRouter.post('/list-category',adminAuth,listCategory);  
adminRouter.post('/unlist-category',adminAuth,unlistCategory);  
adminRouter.post('/add-subcategory',adminAuth,addSubcategory);  
adminRouter.post('/edit-category',adminAuth,editCategory);
adminRouter.get('/dashboard-details',dashboardData);  