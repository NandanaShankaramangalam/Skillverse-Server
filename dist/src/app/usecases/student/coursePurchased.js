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
exports.coursePurchased = void 0;
const coursePurchased = (studentRepository) => (courseId, status, studId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield studentRepository.coursePurchased(courseId, status, studId);
    if (data) {
        return data;
    }
    return null;
});
exports.coursePurchased = coursePurchased;
