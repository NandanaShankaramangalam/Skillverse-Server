"use strict";
// awsConfig.js
// const AWS = require('aws-sdk');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3URL = exports.myBucket = exports.s3Config = void 0;
// AWS.config.update({
//   accessKeyId: process.env.ACCESS_KEY,
//   secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   region: process.env.REGION,
// });
// module.exports = AWS;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.s3Config = {
    bucketName: `${process.env.REACT_APP_S3BUCKET_BUCKET}`,
    // dirName: 'directory-name',      /* Optional */
    region: `${process.env.REACT_APP_S3BUCKET_REGION}`,
    accessKeyId: `${process.env.REACT_APP_S3BUCKET_ACCESS_KEY}`,
    secretAccessKey: `${process.env.REACT_APP_S3BUCKET_SECRET_ACCESS_KEY}`,
    // s3Url: `${process.env.REACT_APP_S3URL}`,
    // s3Url: 'https:/your-aws-s3-bucket-url/'     /* Optional */
};
// export const s3Config = {
//     bucketName:  process.env.BUCKET,
//     // dirName: 'directory-name',      /* Optional */
//     region: process.env.REGION,
//     accessKeyId: process.env.ACCESS_KEY,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY,
//     // s3Url: 'https:/your-aws-s3-bucket-url/'     /* Optional */
// }
const S3_BUCKET = exports.s3Config.bucketName;
const REGION = exports.s3Config.region;
aws_sdk_1.default.config.update({
    accessKeyId: exports.s3Config.accessKeyId,
    secretAccessKey: exports.s3Config.secretAccessKey
});
exports.myBucket = new aws_sdk_1.default.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});
exports.s3URL = `https://s3.amazonaws.com/${S3_BUCKET}`;
