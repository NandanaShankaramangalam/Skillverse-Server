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
exports.profileAdd = void 0;
const profileAdd = (tutorRepository) => (profileLocation, bannerLocation, description, niche, tutId) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield tutorRepository.addTutorProfile(profileLocation, bannerLocation, description, niche, tutId);
    console.log('profile=', profile);
    return profile;
});
exports.profileAdd = profileAdd;
