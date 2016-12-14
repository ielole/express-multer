'use strict';
// script part
// dotenv is a module that access .env
require('dotenv').load();

const s3Upload = require('../lib/aws-s3-upload');

let file = {
  path: process.argv[2],
  title: process.argv[3]
};

// function defined in lib/aws-s3-upload.js
s3Upload(file)
  .then(function(data) {
    console.log("inside then block");
    console.log("data is", data);
  })
  .catch(console.log);
