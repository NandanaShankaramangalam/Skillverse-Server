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
exports.categoryEdit = void 0;
const categoryEdit = (categoryRepository) => (category, cid) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('usecse id=', cid);
    const result = yield categoryRepository.editCategory(category, cid);
    console.log('blkk', result);
    return result;
});
exports.categoryEdit = categoryEdit;
