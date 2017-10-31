'use strict';

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');


router.get('/:orderId', orderController.get);
router.put('/', orderController.update);
router.post('/', orderController.insert);
router.delete('/:orderId', orderController.remove);

module.exports = router;
