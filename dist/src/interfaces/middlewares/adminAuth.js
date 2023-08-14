"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminAuth = (req, res, next) => {
    try {
        console.log("haaaiii");
        console.log('req hdr admin tkn=', req.headers.token);
        let token = req.headers.token;
        console.log('token admin=', token);
        // let JWT_SECRET=process.env.JWT_SECRET as string
        let JWT_SECRET = 'your-secret-key';
        if (token) {
            token = token.toString();
            // token=JSON.parse(token).token as string
            let decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
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
exports.adminAuth = adminAuth;
