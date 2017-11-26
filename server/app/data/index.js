'use strict';

const LogUtil = require('../utils/log');
const AccountData = require('./account');
const ProductData = require('./product');
const PostData = require('./post');

let data = {
  drop: function(callback) {
    AccountData.drop(function() {
      ProductData.drop(function() {
        PostData.drop(function() {
          LogUtil.writeInfo('Collections dropped');
          return callback();
        });
      });
    });
  },
  create: function(callback) {
    AccountData.create(function() {
      ProductData.create(function() {
        PostData.create(function() {
          LogUtil.writeInfo('Collections created');
          return callback();
        });
      });
    });
  }
};

module.exports = data;