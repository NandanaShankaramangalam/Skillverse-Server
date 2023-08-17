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
exports.tutorRepositoryImpl = void 0;
const mongodb_1 = require("mongodb");
const tutorRepositoryImpl = (tutorModel) => {
    //Create Tutor
    const create = (tutor) => __awaiter(void 0, void 0, void 0, function* () {
        const createdTutor = yield tutorModel.create(tutor);
        console.log('hiiii-', createdTutor);
        return createdTutor.toObject();
    });
    //Tutor Login
    const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const tut = yield tutorModel.findOne({ email });
        return tut ? tut.toObject() : null;
    });
    //Fetch tutor data
    const findTutors = () => __awaiter(void 0, void 0, void 0, function* () {
        const tutors = yield tutorModel.find();
        return tutors.map((tut) => tut.toObject());
    });
    //Block Tutor
    const blockTutors = (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('iddd=', id);
        const result = yield tutorModel.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { status: false } });
        if (result.modifiedCount > 0) {
            console.log('modifiedcount blk ok');
            return result;
        }
    });
    //Unblock Tutors 
    const unblockTutors = (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('iddd=', id);
        const result = yield tutorModel.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { status: true } });
        if (result.modifiedCount > 0) {
            console.log('modifiedcount unblk ok');
            return result;
        }
    });
    //Add Profile
    const addTutorProfile = (profileLocation, bannerLocation, description, niche, tutId) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield tutorModel.updateOne({ _id: new mongodb_1.ObjectId(tutId) }, { $set: { profileLocation: profileLocation, bannerLocation: bannerLocation, description: description, niche: niche } });
        if (result.modifiedCount > 0) {
            console.log('added desc and loc');
            return result;
        }
    });
    //Show Tutor Profile 
    const findTutorProfile = (tutId) => __awaiter(void 0, void 0, void 0, function* () {
        const profileData = yield tutorModel.aggregate([
            { $match: { _id: new mongodb_1.ObjectId(tutId) } },
            { $project: { _id: 1, username: 1, bannerLocation: 1, profileLocation: 1, description: 1, niche: 1 } }
        ]);
        if (profileData && profileData.length > 0) {
            const profile = profileData[0];
            return profile;
        }
        return null;
    });
    //Edit Tutor Profile
    const editTutorProfile = (profileLocation, bannerLocation, description, niche, tutId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('editut=', tutId);
        console.log('editut=', profileLocation);
        console.log('editut=', bannerLocation);
        console.log('editut=', niche);
        if (profileLocation != '' && bannerLocation != '') {
            const result = yield tutorModel.updateOne({ _id: new mongodb_1.ObjectId(tutId) }, { $set: { profileLocation: profileLocation, bannerLocation: bannerLocation, description: description, niche: niche } });
            console.log('a');
            return result;
        }
        else if (profileLocation != '' && bannerLocation === '') {
            const result = yield tutorModel.updateOne({ _id: new mongodb_1.ObjectId(tutId) }, { $set: { profileLocation: profileLocation, description: description, niche: niche } });
            console.log('b');
            return result;
        }
        else if (profileLocation == '' && bannerLocation != '') {
            const result = yield tutorModel.updateOne({ _id: new mongodb_1.ObjectId(tutId) }, { $set: { bannerLocation: bannerLocation, description: description, niche: niche } });
            console.log('c');
            return result;
        }
        else if (profileLocation === '' && bannerLocation === '') {
            const result = yield tutorModel.updateOne({ _id: new mongodb_1.ObjectId(tutId) }, { $set: { description: description, niche: niche } });
            console.log('d');
            return result;
        }
    });
    //Reset password
    const resetPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield tutorModel.updateOne({ email: email }, { $set: { password: password } });
        if (result.modifiedCount > 0) {
            console.log('Password reset successful');
            return result;
        }
    });
    return {
        create,
        findByEmail,
        findTutors,
        blockTutors,
        unblockTutors,
        addTutorProfile,
        findTutorProfile,
        editTutorProfile,
        resetPassword,
    };
};
exports.tutorRepositoryImpl = tutorRepositoryImpl;
