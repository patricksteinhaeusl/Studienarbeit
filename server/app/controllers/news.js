'use strict';

const newsService = require('../services/news');
const resultUtil = require('../utils/resultUtil');

function get(req, res, callback) {
  newsService.get((error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

module.exports = {
  get
};