'use strict';

const config = require('../config');
const mongoose = require('mongoose');

mongoose.connect(config.DB.connectionString, { useMongoClient: true }, function(err) {
  if(err) throw err;
  console.log("Database connection sucessfully!");
});

mongoose.Promise = global.Promise;