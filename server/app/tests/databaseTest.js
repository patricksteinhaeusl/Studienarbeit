'use strict';

const config = require('../config');
const testData = require('../data/testData');
const mongoose = require('mongoose');
const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.AssertionError;
const should = chai.should();

chai.use(chaiHttp);

describe('Database', function() {
  describe('Connect to database', function() {
    it('it should connect to database', function(callback) {
      mongoose.connect(config.DB.connectionString, { useMongoClient: true }, function(error) {
        assert(error !== null, 'Failed to create data!');
        callback();
      });
    });
  });

  describe('Init database data', function() {
    it('it should create the database', function(callback) {
      testData.init(function(error) {
        assert(error !== null, 'Failed to create data!');
        return callback();
      })
    });
  });
});