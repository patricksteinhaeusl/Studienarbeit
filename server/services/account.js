'use strict';

const Account = require('../models/account');
const exceptionUtil = require('../utils/exceptionUtil');

function getAccount(accountId, callback) {
  if(!accountId) return callback(exceptionUtil.createNotFoundException());
  Account.findById(accountId, function(err, result) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    if(!result) return callback(exceptionUtil.createNotFoundException());
    callback(result);
  });
}

function updateAccount(account, callback) {
  let accountObj = new Account(account);
  if(!accountObj) return callback(exceptionUtil.createNotFoundException());
  Account.findByIdAndUpdate(accountObj._id, accountObj, {new: true}, function(err, result) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    if(!result) return callback(exceptionUtil.createNotFoundException());
    callback(result);
  });
}

module.exports = {
  getAccount,
  updateAccount
};