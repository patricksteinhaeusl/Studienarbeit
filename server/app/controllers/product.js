'use strict';

const productService = require('../services/product');
const resultUtil = require('../utils/resultUtil');

function get(req, res, callback) {
  let productId = req.params.productId;
  productService.get(productId, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

function insertRating(req, res, callback) {
  let productId = req.params.productId;
  let rating = req.body.rating;
  productService.get(productId, rating, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

module.exports = {
  get,
  insertRating,
};