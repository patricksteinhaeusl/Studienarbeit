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
  productService.getById(productId, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

function getByCategoryId(req, res, callback) {
  let categoryId = req.params.categoryId;
  productService.getByCategoryId(categoryId, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

function insertRating(req, res, callback) {
  let product = req.body.product;
  let rating = req.body.rating;
  productService.insertRating(product, rating, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

function getCategories(req, res, callback) {
  productService.getCategories((error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

module.exports = {
  get,
  getById,
  getByCategoryId,
  insertRating,
  getCategories
};