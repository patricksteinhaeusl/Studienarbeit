'use strict';

const Product = require('../models/product');
const Rating = require('../models/rating').Rating;
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

  Product.findOneAndUpdate(
    { _id: product._id, 'ratings._account': user._id },
    { $set: { 'ratings.$.value': ratingValue } },
    { new: true },
  function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) {
      Product.findOneAndUpdate(
        {_id: product._id},
        {
          $push: {
            'ratings': {
              'value': ratingValue,
              'comment': 'Nothing',
              '_account': user._id
            }
          }
        }, function (error, result) {
          if (error) return callback(resultUtil.createErrorException(error));
          if (!result) return callback(resultUtil.createNotFoundException());
          result = {'product': result};
          return callback(null, result);
        });
    }
  });
}

module.exports = {
  get,
  getById,
  insertRating
};