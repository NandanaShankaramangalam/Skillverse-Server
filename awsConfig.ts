// awsConfig.js
// const AWS = require('aws-sdk');

// AWS.config.update({
//   accessKeyId: process.env.ACCESS_KEY,
//   secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   region: process.env.REGION,
// });

// module.exports = AWS;

import AWS from 'aws-sdk'
import dotenv from "dotenv"

dotenv.config()

export const s3Config = {
    bucketName:  `${process.env.REACT_APP_S3BUCKET_BUCKET}`,
    // dirName: 'directory-name',      /* Optional */
    region: `${process.env.REACT_APP_S3BUCKET_REGION}`,
    accessKeyId: `${process.env.REACT_APP_S3BUCKET_ACCESS_KEY}`,
    secretAccessKey: `${process.env.REACT_APP_S3BUCKET_SECRET_ACCESS_KEY}`,
    // s3Url: `${process.env.REACT_APP_S3URL}`,
    // s3Url: 'https:/your-aws-s3-bucket-url/'     /* Optional */
    
}


// export const s3Config = {
//     bucketName:  process.env.BUCKET,
//     // dirName: 'directory-name',      /* Optional */
//     region: process.env.REGION,
//     accessKeyId: process.env.ACCESS_KEY,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY,
//     // s3Url: 'https:/your-aws-s3-bucket-url/'     /* Optional */
// }


const S3_BUCKET =s3Config.bucketName;
const REGION =s3Config.region;

AWS.config.update({
  accessKeyId: s3Config.accessKeyId,
  secretAccessKey: s3Config.secretAccessKey
})

export const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET},
  region: REGION,
})

export const s3URL = `https://s3.amazonaws.com/${S3_BUCKET}`
