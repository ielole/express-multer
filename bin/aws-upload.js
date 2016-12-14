'use strict';
// dotenv is a module that access .env
require('dotenv').load();

const fs = require('fs');

const AWS = require('aws-sdk');

// invokes constructor fxn(S3) and gives us access to library
// console.log('s3 is', s3); on the prototype
const s3 = new AWS.S3();

let file = {
  path: process.argv[2],
  title: process.argv[3]
};

console.log("file is ", file);

let stream = fs.createReadStream(file.path);
let bucket = process.env.AWS_S3_BUCKET_NAME;

const params = {
  ACL: 'public-read',
  Bucket: bucket,
  Key: file.title,
  Body: stream,
};

s3.upload(params, function(error, data){
  if(error){
    console.log(error);
  }
  console.log(data);
});
