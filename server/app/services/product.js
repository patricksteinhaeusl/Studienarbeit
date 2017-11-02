'use strict';

const Product = require('../models/product');
const Rating = require('../models/rating');
const resultUtil = require('../utils/resultUtil');

function get(callback) {
  Product.find({}, function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { 'products' : result };
    return callback(null, result);
  });
}

function getById(productId, callback) {
  if(!productId) return callback(resultUtil.createNotFoundException());
  Product.findById(productId, function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { 'product' : result };
    return callback(null, result);
  });
}

function insertRating(product, ratingValue, user, callback) {
  if(!product || !ratingValue || !user) return callback(resultUtil.createNotFoundException());

  Product.find(product, function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());

    result = { 'product' : result };
    return callback(null, result);
  });
}

module.exports = {
  get,
  getById,
  insertRating
};