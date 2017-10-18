'use strict';

const express = require('express');
const router = express.Router();
const creditcardController = require('../controllers/creditcard');

router.get('/:accountId', creditcardController.getCreditcard);
router.put('/', creditcardController.updateCreditcard);
router.post('/', creditcardController.insertCreditcard);
router.delete('/', creditcardController.deleteCreditcard);

module.exports = router;
