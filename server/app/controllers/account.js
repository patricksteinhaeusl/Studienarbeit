'use strict';

const accountService = require('../services/account');
const resultUtil = require('../utils/resultUtil');

function get(req, res, callback) {
  let accountId = req.params.accountId;
  accountService.get(accountId, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

function update(req, res, callback) {
  let account = req.body.account;
  accountService.update(account, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

function insert(req, res, callback) {
  let account = req.body.account;
  accountService.insert(account, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

module.exports = {
  get,
  update,
  insert
};