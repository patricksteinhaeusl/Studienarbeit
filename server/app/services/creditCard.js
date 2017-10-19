'use strict';

const Account = require('../models/account');
const CreditCard = require('../models/creaditCard');
const exceptionUtil = require('../utils/exceptionUtil');

function get(creditCardId, callback) {
  if(!creditCardId) return callback(exceptionUtil.createNotFoundException());
  CreditCard.findById(creditCardId, function(err, result) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    if(!result) return callback(exceptionUtil.createNotFoundException());
    result = { creditCard : result};
    callback(result);
  });
}

function getAllByAccountId(accountId, callback) {
  if(!accountId) return callback(exceptionUtil.createNotFoundException());
  CreditCard.find({ 'owner' : accountId }, function(err, result) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    if(!result) return callback(exceptionUtil.createNotFoundException());
    result = { creditCard : result};
    callback(result);
  });
}

function update(creditCard, callback) {
  let creditCardObj = new CreditCard(creditCard);
  if(!creditCardObj) return callback(exceptionUtil.createNotFoundException());
  CreditCard.findByIdAndUpdate(creditCardObj._id, creditCardObj, function(err, result) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    if(!result) return callback(exceptionUtil.createNotFoundException());
    result = { creditCard : result};
    callback(result);
  });
}

function insert(account, creditCard, callback) {
  let accountObj = new Account(account);
  let creditCardObj = new CreditCard(creditCard);
  if(!creditCardObj || !accountObj) return callback(exceptionUtil.createNotFoundException());
  Account.findById(accountObj._id, function(err, result) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    if(!result) return callback(exceptionUtil.createNotFoundException());
      creditCardObj.owner = result._id;
      creditCardObj.save(function(err, result) {
        if(err) return callback(exceptionUtil.createErrorException(err));
        if(!result) return callback(exceptionUtil.createNotFoundException());
        result = { creditCard : result};
        callback(result);
      });
  });
}

function remove(creditCardId, callback) {
  if(!creditCardId) return callback(exceptionUtil.createNotFoundException());
  CreditCard.findByIdAndRemove(creditCardId, function(err) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    callback();
  });
}

module.exports = {
  get,
  getAllByAccountId,
  update,
  insert,
  remove
};