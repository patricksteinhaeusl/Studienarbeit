'use strict';

const productService = require('../services/product');
const resultUtil = require('../utils/resultUtil');

function get(req, res, callback) {
  productService.get((error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

function getById(req, res, callback) {
  let productId = req.params.productId;
  productService.get(productId, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

function insertRating(req, res, callback) {
  let productId = req.params.productId;
  let ratingValue = req.body.ratingValue;
  let user = req.body.user;
  productService.get(productId, ratingValue, user, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

module.exports = {
  get,
  getById,
  insertRating,
};