'use strict';

const config = require('../config');
const mongoose = require('mongoose');
const dummy = require('../data/dummy');

mongoose.connect(config.DB.connectionString, { useMongoClient: true }, function(err) {
  if(err) return console.error(err);
  console.log("Database connection sucessfully!");

  dummy.init();
});

mongoose.Promise = global.Promise;