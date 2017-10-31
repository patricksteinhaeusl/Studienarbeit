'use strict';

const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');


router.get('/:productId', productController.get);
router.put('/:productId', productController.insertRating);

module.exports = router;
