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
exports.courseCreation = void 0;
const courseCreation = (courseRepository) => (title, fee, category, subcategory, description, thumbnail, video, tutId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('title=', title);
    console.log('catgry=', category);
    const newCourse = {
        title,
        fee,
        category,
        subcategory,
        description,
        thumbnail,
        video,
        tutId
    };
    const createdCourse = yield courseRepository.createCourse(newCourse);
    console.log('created course=', createdCourse);
    return createdCourse;
});
exports.courseCreation = courseCreation;
