'use strict';

const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');

router.get('/:accountId', accountController.getAccount);
router.put('/', accountController.updateAccount);

module.exports = router;
