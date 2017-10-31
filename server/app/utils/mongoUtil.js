'use strict';

const config = require('../config');
const mongoose = require('mongoose');

mongoose.connect(config.DB.connectionString, { useMongoClient: true }, function(error) {
  if(!error) console.log('Database connection successfully!');
});

mongoose.Promise = global.Promise;