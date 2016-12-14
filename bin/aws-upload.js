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
s3Upload(file);
