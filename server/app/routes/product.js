'use strict';

const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

router.post('/rating', productController.insertRating);
router.get('/:productId', productController.getById);
router.get('/', productController.get);

module.exports = router;
