'use strict';

const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');


router.get('/category', productController.getCategories);
router.get('/category/:categoryId', productController.getByCategoryId);
router.post('/rating', productController.insertRating);
router.get('/', productController.get);
router.get('/:productId', productController.getById);

module.exports = router;
