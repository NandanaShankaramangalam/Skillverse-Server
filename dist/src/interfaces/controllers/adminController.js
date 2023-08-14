"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardData = exports.editCategory = exports.addSubcategory = exports.unlistCategory = exports.listCategory = exports.showCategory = exports.addCategory = exports.unblockTutor = exports.blockTutor = exports.showTutor = exports.unblockStudent = exports.blockStudent = exports.showStudent = exports.adminLogin = void 0;
const courseRepository_1 = require("./../../infra/repositories/courseRepository");
const categoryRepository_1 = require("./../../infra/repositories/categoryRepository");
const tutorRepository_1 = require("./../../infra/repositories/tutorRepository");
const studentRepository_1 = require("./../../infra/repositories/studentRepository");
const adminRepository_1 = require("./../../infra/repositories/adminRepository");
const adminModel_1 = require("../../infra/database/adminModel");
const logAdmin_1 = require("../../app/usecases/admin/logAdmin");
const fetchStudent_1 = require("../../app/usecases/admin/fetchStudent");
const studentModel_1 = require("../../infra/database/studentModel");
const blockStudent_1 = require("../../app/usecases/student/blockStudent");
const unblockStudent_1 = require("../../app/usecases/student/unblockStudent");
const tutorModel_1 = require("../../infra/database/tutorModel");
const fetchTutor_1 = require("../../app/usecases/admin/fetchTutor");
const blockTutor_1 = require("../../app/usecases/tutor/blockTutor");
const unblockTutor_1 = require("../../app/usecases/tutor/unblockTutor");
const addCategory_1 = require("../../app/usecases/admin/addCategory");
const categoryModel_1 = require("../../infra/database/categoryModel");
const fetchCategory_1 = require("../../app/usecases/admin/fetchCategory");
const listCategory_1 = require("../../app/usecases/admin/listCategory");
const unlistCategory_1 = require("../../app/usecases/admin/unlistCategory");
const addSubcategory_1 = require("../../app/usecases/admin/addSubcategory");
const editCategory_1 = require("../../app/usecases/admin/editCategory");
const courseModel_1 = require("../../infra/database/courseModel");
const fetchCatData_1 = require("../../app/usecases/admin/fetchCatData");
const fetchBarData_1 = require("../../app/usecases/admin/fetchBarData");
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';
const db = adminModel_1.adminModel;
const adminRepository = (0, adminRepository_1.adminRepositoryImpl)(db);
const studDb = studentModel_1.studentModel;
const studentRepository = (0, studentRepository_1.studentRepositoryImpl)(studDb);
const tutDb = tutorModel_1.tutorModel;
const tutorRepository = (0, tutorRepository_1.tutorRepositoryImpl)(tutDb);
const cateDb = categoryModel_1.categoryModel;
const categoryRepository = (0, categoryRepository_1.categoryRepositoryImpl)(cateDb);
const courseDb = courseModel_1.courseModel;
const courseRepository = (0, courseRepository_1.courseRepositoryImpl)(courseDb);
//Admin Login
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('reqst=', req.body);
    const { username, password } = req.body;
    const expirationTime = Math.floor(Date.now() / 1000) + 2 * 60 * 60 * 1000;
    const payload = {
        exp: expirationTime,
    };
    try {
        const adminExist = yield (0, logAdmin_1.loginAdmin)(adminRepository)(username, password);
        console.log('adexist', adminExist);
        if (adminExist) {
            const admin = {
                username: adminExist.username
            };
            const token = jwt.sign(payload, JWT_SECRET);
            res.json({ success: "Login successful", admin, token });
        }
        else {
            res.json({ invalid: "Invalid email or password!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.adminLogin = adminLogin;
//Fetch Student Data
const showStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentData = yield (0, fetchStudent_1.fetchStudentData)(studentRepository)();
        //   console.log('okkkkkkkkkkkkk',studentData);
        if (studentData) {
            res.json({ success: 'data fetching successful', studentData });
        }
        else {
            res.json({ invalid: "no student data available!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.showStudent = showStudent;
//Block Student
const blockStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('blkuesr', req.body);
    // console.log('cntrl id=',id);
    // const blocked =  blockStudent(studentRepository)(id);
    try {
        const { id } = req.body;
        const blocked = yield (0, blockStudent_1.blockStud)(studentRepository)(id);
        console.log('blocked in cntrl', blocked);
        if (blocked) {
            res.json({ message: 'blocked student', isBlocked: true });
        }
        else {
            res.json({ message: 'block failed' });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.blockStudent = blockStudent;
//Unblock student
const unblockStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('unblk id', req.body);
    const { id } = req.body;
    try {
        const unblocked = yield (0, unblockStudent_1.unblockStud)(studentRepository)(id);
        console.log('unblocked in cntrl', unblocked);
        if (unblocked) {
            res.json({ message: 'unblocked student', isUnblocked: true });
        }
        else {
            res.json({ message: 'unblock failed' });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.unblockStudent = unblockStudent;
//Fetch Tutor Data
const showTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorData = yield (0, fetchTutor_1.fetchTutorData)(tutorRepository)();
        //   console.log('okkkkkkkkkkkkk',studentData);
        if (tutorData) {
            res.json({ success: 'data fetching successful', tutorData });
        }
        else {
            res.json({ invalid: "no student data available!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.showTutor = showTutor;
//Block Tutor 
const blockTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('blkuesr', req.body);
    const { id } = req.body;
    console.log('cntrl blk id=', id);
    try {
        const blocked = yield (0, blockTutor_1.blockTut)(tutorRepository)(id);
        console.log('blocked in cntrl', blocked);
        if (blocked) {
            res.json({ message: 'blocked tutor', isBlocked: true });
        }
        else {
            res.json({ message: 'block failed' });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.blockTutor = blockTutor;
//Unblock Tutor
const unblockTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('unblk id', req.body);
    const { id } = req.body;
    try {
        const unblocked = yield (0, unblockTutor_1.unblockTut)(tutorRepository)(id);
        console.log('unblocked in cntrl', unblocked);
        if (unblocked) {
            res.json({ message: 'unblocked tutor', isUnblocked: true });
        }
        else {
            res.json({ message: 'unblock failed' });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.unblockTutor = unblockTutor;
//Add Category
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Add cate rqbdy = ', req.body);
    // const subcate = req.body.subcategory;
    // const subcateArray = subcate.split(',');
    try {
        const category = req.body.category;
        const cateData = yield (0, addCategory_1.createCategory)(categoryRepository)(category);
        if (cateData) {
            res.status(201).json({ message: 'Category added succesfully', cateData });
        }
        else {
            res.status(401).json({ message: 'Invalid datas' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error!' });
    }
});
exports.addCategory = addCategory;
//Fetch Category Data
const showCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('okkkkkkkkkkkkkkkkkkkkkkk');
        const cateData = yield (0, fetchCategory_1.fetchCategoryData)(categoryRepository)();
        if (cateData) {
            // const newArray = cateData.map(obj=>{return {...obj,subcategory:obj.subcategory.join()}})
            const newArray = cateData.map(obj => { return Object.assign({}, obj); });
            console.log('kk', newArray);
            res.json({ success: 'Category data fetching successful', newArray });
        }
        else {
            res.json({ invalid: "No category data available!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.showCategory = showCategory;
//List Category
const listCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('list cat = ', req.body);
    const { id } = req.body;
    console.log('cntrl list cat id=', id);
    try {
        const listData = yield (0, listCategory_1.CategoryList)(categoryRepository)(id);
        console.log('listdata', listData);
        if (listData) {
            res.json({ message: 'category listed', isListed: true });
        }
        else {
            res.json({ message: 'category list failed' });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.listCategory = listCategory;
//Unlist Category
const unlistCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('unlist cat = ', req.body);
    const { id } = req.body;
    console.log('cntrl unlist cat id=', id);
    try {
        const unlistData = yield (0, unlistCategory_1.CategoryUnlist)(categoryRepository)(id);
        console.log('unlist in cntrl', unlistData);
        if (unlistData) {
            res.json({ message: 'Category unlisted', isUnlist: true });
        }
        else {
            res.json({ message: 'Category unlist failed' });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.unlistCategory = unlistCategory;
//Add Subcategory
const addSubcategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('subctgry=', req.body);
    const { subcategory, cid } = req.body;
    try {
        const subCategoryData = yield (0, addSubcategory_1.subCategoryAdd)(categoryRepository)(subcategory, cid);
        console.log('subcat in cntrl', subCategoryData);
        if (subCategoryData) {
            res.json({ message: 'Subcategory added successfully' });
        }
        else {
            res.json({ message: 'Subcategory add failed' });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.addSubcategory = addSubcategory;
//Edit Category
const editCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('catgry=', req.body);
    const { category, cid } = req.body;
    try {
        const editCategoryData = yield (0, editCategory_1.categoryEdit)(categoryRepository)(category, cid);
        console.log('edit cat', editCategoryData);
        if (editCategoryData) {
            res.json({ message: 'Category edited successfully' });
        }
        else {
            res.json({ message: 'Category edit failed' });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.editCategory = editCategory;
//Dashboard Data
const dashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studData = yield (0, fetchStudent_1.fetchStudentData)(studentRepository)();
        const studCount = studData === null || studData === void 0 ? void 0 : studData.length;
        //  console.log('stcnt=',studData);
        const tutData = yield (0, fetchTutor_1.fetchTutorData)(tutorRepository)();
        console.log('tutdta=', tutData);
        const tutCount = tutData === null || tutData === void 0 ? void 0 : tutData.length;
        const tutBlockCount = tutData === null || tutData === void 0 ? void 0 : tutData.filter((obj) => obj.status === false).length;
        console.log('tutblco=', tutBlockCount);
        const catData = yield (0, fetchCategory_1.fetchCategoryData)(categoryRepository)();
        // console.log('catData=',catData);
        const catCount = catData === null || catData === void 0 ? void 0 : catData.length;
        // console.log('catcnt=',catCount);
        const pieChartData = yield (0, fetchCatData_1.fetchCatData)(courseRepository)();
        console.log('hhggb=', pieChartData);
        const barData = yield (0, fetchBarData_1.fetchBarData)(courseRepository)();
        console.log('baaarr=', barData);
        res.json({ message: 'Data fetched successfully', studCount, tutCount, catCount, tutBlockCount, pieChartData, barData });
    }
    catch (err) {
        console.log(err);
    }
});
exports.dashboardData = dashboardData;
