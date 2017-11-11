'use strict';

const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news');

router.get('/', newsController.get);

module.exports = router;
