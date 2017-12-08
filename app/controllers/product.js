'use strict';

const ProductService = require('../services/product');

function get(req, res) {
  ProductService.get((error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

function getById(req, res) {
  let productId = req.params.productId;
  ProductService.getById(productId, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

function getTopRated(req, res) {
  ProductService.getTopRated((error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

function getLatest(req, res) {
  ProductService.getLatest((error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

function getByCategoryId(req, res) {
  let categoryId = req.params.categoryId;
  ProductService.getByCategoryId(categoryId, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

function getBySearchValue(req, res) {
  let searchValue = req.params.searchValue;
  ProductService.getBySearchValue(searchValue, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

function insertRating(req, res) {
  let product = req.body.product;
  let rating = req.body.rating;
  ProductService.insertRating(product, rating, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

function getCategories(req, res) {
  ProductService.getCategories((error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

module.exports = {
  get,
  getById,
  getByCategoryId,
  getBySearchValue,
  getTopRated,
  getLatest,
  insertRating,
  getCategories
};