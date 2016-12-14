'use strict';
// script part
// dotenv is a module that access .env
require('dotenv').load();

const s3Upload = require('../lib/aws-s3-upload');
const mongoose = require('../app/middleware/mongoose');
const Upload = require('../app/models/upload');
let file = {
  path: process.argv[2],
  title: process.argv[3]
};



// function defined in lib/aws-s3-upload.js
s3Upload(file)
  // response from resolve(data) in s3.Upload in aws-s3-upload.js
  .then(function(response) {
    console.log("inside then block");
    console.log("data is", response);
    console.log("url is", response.Location);
    return Upload.create({
      url: response.Location,
      title: file.title
    });
  })
  // if above return is missing, below upload will return undefined
  .then(function(upload){
    console.log("mongo create was successful");
    console.log("upload is ", upload);
  })
  .catch(console.error)
  .then(function(){
    mongoose.connection.close();
  });
