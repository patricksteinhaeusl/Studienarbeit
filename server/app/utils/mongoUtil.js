'use strict';

const config = require('../config');
const mongoose = require('mongoose');
const testData = require('../data/testData');

mongoose.connect(config.DB.connectionString, { useMongoClient: true }, function(error) {
  if(!error) console.log('Database connection successfully!');
  testData.init(function() {
    console.log("Test Data created");
  });
});

mongoose.Promise = global.Promise;