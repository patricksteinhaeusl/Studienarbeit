'use strict';

const AccountData = require('./account');
const ProductData = require('./product');
const PostData = require('./post');

let data = {
  drop: function() {
    AccountData.drop();
    ProductData.drop();
    PostData.drop();
  },
  create: function() {
    AccountData.create();
    ProductData.create();
    PostData.create();
  }
};

module.exports = data;