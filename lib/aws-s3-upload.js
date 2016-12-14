'use strict';
// library part
// will be used by the API
const fs = require('fs');

const AWS = require('aws-sdk');

// invokes constructor fxn(S3) and gives us access to library
// console.log('s3 is', s3); on the prototype
const s3 = new AWS.S3();

const mime = require('mime');
const path = require('path');
const crypto = require('crypto');

// wrap everything below in a fxn which gets passed in a file
const s3Upload = function(file) {
  let contentType = mime.lookup(file.path);
  let ext = path.extname(file.path);
  // make a folder
  let folder = new Date().toISOString().split('T')[0];

  console.log("folder is", folder);
  console.log("contentType is", contentType);

  let stream = fs.createReadStream(file.path);
  let bucket = process.env.AWS_S3_BUCKET_NAME;

  return new Promise(function(resolve, reject){
    crypto.randomBytes(16, function(error, buffer){
      if(error){
        reject(error);
      } else {
        resolve(buffer.toString('hex'));
        // console.log("buffer is ", buffer);
        // console.log("buffer.toString is ", buffer.toString('hex'));
      }
    });
  })
  .then(function(filename){
    const params = {
      ACL: 'public-read',
      Bucket: bucket,
      Key: folder + '/' + filename + ext,
    // could also do `${folder}/${file.title}${ext}` = string interpolation
    // file.title to filename
      Body: stream,
      ContentType: contentType,
    };

    return new Promise(function(resolve, reject){
      s3.upload(params, function(error,data){
        if(error){
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  });
};

module.exports = s3Upload;
// module.exports = {
// s3Upload: s3Upload;
// }
// ABOVE - exporting an object containing fxns
// ABOVE_ABOVE - exporting a fxn
// where the left side is a property of the object and the right side is the value of the property
// in other file where fxn is being used can call/require b/c only one thing/function is being exported
// ui.functionName();
// functionName();
