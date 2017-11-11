'use strict';

const News = require('../models/news');
const resultUtil = require('../utils/resultUtil');

function get(callback) {
  News.find({}, function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { 'news' : result };
    return callback(null, result);
  });
}

module.exports = {
  get
};