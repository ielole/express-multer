'use strict';
// dotenv is a module that access .env
require('dotenv').load();

const fs = require('fs');

const AWS = require('aws-sdk');

// invokes constructor fxn(S3) and gives us access to library
// console.log('s3 is', s3); on the prototype
const s3 = new AWS.S3();

const mime = require('mime');
const path = require('path');

let file = {
  path: process.argv[2],
  title: process.argv[3]
};

let contentType = mime.lookup(file.path);
let ext = path.extname(file.path);
// make a folder
let folder = new Date().toISOString().split('T')[0];

console.log("folder is", folder);
console.log("contentType is", contentType);

let stream = fs.createReadStream(file.path);
let bucket = process.env.AWS_S3_BUCKET_NAME;

const params = {
  ACL: 'public-read',
  Bucket: bucket,
  Key: folder + '/' + file.title + ext,
  // could also do `${folder}/${file.title}${ext}` = string interpolation
  Body: stream,
  ContentType: contentType,
};

s3.upload(params, function(error, data){
  if(error){
    console.log(error);
  }
  console.log(data);
});
