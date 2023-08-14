"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tutorAuth = (req, res, next) => {
    try {
        console.log('req.hdr=', req.headers);
        let tutToken = req.headers.tuttoken;
        let JWT_SECRET = 'your-secret-key';
        // console.log('token=',tutToken);
        // console.log('req.headers=',req.headers);
        if (tutToken) {
            // console.log('tokenn=',req.headers);
            tutToken = tutToken.toString();
            let decoded = jsonwebtoken_1.default.verify(tutToken, JWT_SECRET);
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const isTokenExpired = decoded.exp < currentTimestamp;
            if (isTokenExpired) {
                res.json({ message: 'expired' });
                console.log('expired');
            }
            else {
                next();
                console.log('next');
            }
        }
        else {
            res.json({ message: 'unauthorized' });
            console.log('unauth');
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.tutorAuth = tutorAuth;
