"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const URL = process.env.REACT_APP_MONGO_URL;
const db = () => {
    mongoose_1.default.connect(URL)
        .then(() => {
        console.log("Database connected successfully", URL);
    })
        .catch((error) => {
        console.log(error.message);
    });
};
exports.db = db;
