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
exports.categoryRepositoryImpl = void 0;
const mongodb_1 = require("mongodb");
const categoryRepositoryImpl = (categoryModel) => {
    //Add Category
    const addCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
        const cat = yield categoryModel.find({ category: category.category });
        // console.log('catrep=',cat);
        if (cat.length === 0) {
            const createdCategory = yield categoryModel.create(category);
            console.log('hiiii-', createdCategory);
            return createdCategory.toObject();
        }
        return null;
    });
    //Fetch category data
    const findCategory = () => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield categoryModel.find();
        // console.log('catttttttttttt=',category); 
        return category.map((cate) => cate.toObject());
    });
    //Fetch Subcategory
    const fetchSubcategories = (category) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield categoryModel.findOne({ category: category });
            return result ? result : null;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
    //List Category
    const listCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log('iddd=',id);
        const result = yield categoryModel.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { status: false } });
        if (result.modifiedCount > 0) {
            console.log('modifiedcount blk ok');
            return result;
        }
    });
    //Unlist Category
    const unlistCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log('iddd=',id);
        const result = yield categoryModel.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { status: true } });
        if (result.modifiedCount > 0) {
            console.log('modifiedcount blk ok');
            return result;
        }
    });
    // Add Subcategory
    const addSubcategory = (subcategory, cid) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log('iddd=',subcategory);
        const result = yield categoryModel.updateOne({ _id: new mongodb_1.ObjectId(cid) }, { $addToSet: { subcategory: subcategory } });
        if (result.modifiedCount > 0) {
            console.log('modifiedcount of add subcategory');
            return result;
        }
    });
    const editCategory = (category, cid) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log('iddd=',category);
        const result = yield categoryModel.updateOne({ _id: new mongodb_1.ObjectId(cid) }, { $set: { category: category } });
        if (result.modifiedCount > 0) {
            console.log('modifiedcount of add subcategory');
            return result;
        }
    });
    //Fetch tutor category data
    const findTutCategory = () => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield categoryModel.find({ status: true });
        return category.map((cate) => cate.toObject());
    });
    return {
        addCategory,
        findCategory,
        listCategory,
        unlistCategory,
        addSubcategory,
        editCategory,
        findTutCategory,
        fetchSubcategories,
    };
};
exports.categoryRepositoryImpl = categoryRepositoryImpl;
