'use strict';

const express = require('express');
const router = express.Router();
const creditCardController = require('../controllers/creditCard');

router.get('/account/:accountId', creditCardController.getByAccountId);
router.get('/:creditCardId', creditCardController.get);
router.delete('/:creditCardId', creditCardController.remove);
router.put('/', creditCardController.update);
router.post('/', creditCardController.insert);

module.exports = router;
