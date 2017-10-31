'use strict';

const authService = require('../services/auth');
const resultUtil = require('../utils/resultUtil');

function login(req, res, callback) {
  let {username, password} = req.body;
  authService.login(username, password, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

module.exports = {
  login
};