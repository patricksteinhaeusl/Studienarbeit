'use strict';

const express = require('express');
const router = express.Router();
const deliveryAddressController = require('../controllers/deliveryAddress');

router.get('/:deliveryAddressId', deliveryAddressController.get);
router.get('/account/:accountId', deliveryAddressController.getAllByAccountId);
router.put('/', deliveryAddressController.update);
router.post('/', deliveryAddressController.insert);
router.delete('/:deliveryAddressId', deliveryAddressController.remove);

module.exports = router;
