'use strict';

const Product = require('../models/product');
const Rating = require('../models/rating');
const resultUtil = require('../utils/resultUtil');

function get(productId, callback) {
  if(!productId) return callback(resultUtil.createNotFoundException());
  Product.findById(productId, function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { product : result };
    return callback(null, result);
  });
}

function insertRating(productId, rating, callback) {
  let ratingObj = new Rating(rating);
  if(!ratingObj) return callback(resultUtil.createNotFoundException());
  Product.findById(productId, function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { deliveryAddress : result};
    callback(null, result);
  });
}

module.exports = {
  get,
  insertRating
};