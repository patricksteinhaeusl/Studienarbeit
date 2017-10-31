'use strict';

const express = require('express');
const router = express.Router();
const creditCardController = require('../controllers/creditCard');


router.get('/:creditCardId', creditCardController.get);
router.get('/account/:accountId', creditCardController.getByAccountId);
router.put('/', creditCardController.update);
router.post('/', creditCardController.insert);
router.delete('/:creditCardId', creditCardController.remove);

module.exports = router;
