'use strict';

const Product = require('../models/product').Product;
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

function getByCategoryId(categoryId, callback) {
  if(!categoryId) return callback(resultUtil.createNotFoundException());
  Product.find({ 'category._id': categoryId }, function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { 'products' : result };
    return callback(null, result);
  });
}

function getBySearchValue(searchValue, callback) {
  if(!searchValue) return callback(resultUtil.createNotFoundException());
  Product.find({ $or: [
      { name: new RegExp(searchValue, "i") },
      { 'category.name' : new RegExp(searchValue, "i") }
    ]}, function(error, result) {
    console.log(result);
      if(error) return callback(resultUtil.createErrorException(error));
      if(!result) return callback(resultUtil.createNotFoundException());
      result = { 'products' : result };
      return callback(null, result);
  });
}

function insertRating(product, rating, callback) {
  if(!product || !rating) return callback(resultUtil.createNotFoundException());

  Product.findOneAndUpdate(
    { _id: product._id, 'ratings._account': rating._account },
    { $set: { 'ratings.$.comment': rating.comment, 'ratings.$.value': rating.value }},
    { new: true },
  function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(result) {
      result = { 'product': result };
      return callback(null, result);
    } else {
      Product.findOneAndUpdate(
        {_id: product._id},
        {
          $push: { ratings: rating }
        }, function (error, result) {
          if (error) return callback(resultUtil.createErrorException(error));
          if (!result) return callback(resultUtil.createNotFoundException());
          result = { 'product': result };
          return callback(null, result);
        });
    }
  });
}

function getCategories(callback) {
  Product.aggregate(
    [{
      $group: {
        _id: '$category._id',
        name: { $first: '$category.name' }
      }
    }, {
      $sort: {
        'name': 1
      }
    }], function(error, result) {
      if(error) return callback(resultUtil.createErrorException(error));
      if(!result) return callback(resultUtil.createNotFoundException());
      result = { 'categories' : result };
      return callback(null, result);
  });
}

module.exports = {
  get,
  getById,
  getByCategoryId,
  getBySearchValue,
  insertRating,
  getCategories
};