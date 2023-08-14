"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const studentAuth = (req, res, next) => {
    try {
        console.log('req hdr stud=', req.headers);
        let studToken = req.headers.studtoken;
        console.log('stud tokn=', studToken);
        let JWT_SECRET = 'your-secret-key';
        if (studToken) {
            studToken = studToken.toString();
            // studToken=JSON.parse(studToken).token as string
            let decoded = jsonwebtoken_1.default.verify(studToken, JWT_SECRET);
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const isTokenExpired = decoded.exp < currentTimestamp;
            if (isTokenExpired) {
                res.json({ message: 'expired' });
            }
            else {
                next();
            }
        }
        else {
            res.json({ message: 'unauthorized' });
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.studentAuth = studentAuth;
