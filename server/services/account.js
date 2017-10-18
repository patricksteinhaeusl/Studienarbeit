'use strict';

const Account = require('../models/account');
const exceptionUtil = require('../utils/exceptionUtil');

function getAccount(accountId, callback) {
  if(!accountId) return callback(exceptionUtil.createNotFoundException());
  Account.findById(accountId, function(err, account) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    if(!account) return callback(exceptionUtil.createNotFoundException());
    callback(account);
  });
}

function updateAccount(account, callback) {
  if(!account) return callback(exceptionUtil.createNotFoundException());
  Account.findByIdAndUpdate(account._id, account, {new: true}, function(err, account) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    if(!account) return callback(exceptionUtil.createNotFoundException());
    callback(account);
  });
}

module.exports = {
  getAccount,
  updateAccount
};