'use strict';

const Account = require('../models/account');
const CreditCard = require('../models/creditCard').CreditCard;
const resultUtil = require('../utils/resultUtil');

function get(creditCardId, callback) {
  if(!creditCardId) return callback(resultUtil.createNotFoundException());
  CreditCard.findById(creditCardId, function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { 'creditCard' : result};
    callback(null, result);
  });
}

function getByAccountId(accountId, callback) {
  if(!accountId) return callback(resultUtil.createNotFoundException());
  CreditCard.find({ '_account' : accountId }, function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { 'creditCards' : result};
    return callback(null, result);
  });
}

function update(creditCard, callback) {
  let creditCardObj = new CreditCard(creditCard);
  if(!creditCardObj) return callback(resultUtil.createNotFoundException());
  CreditCard.findByIdAndUpdate(creditCardObj._id, creditCardObj, { new: true }, function(error, result) {
    if(error) return callback(resultUtil.createErrorException(error));
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { 'creditCard' : result};
    return callback(null, result);
  });
}

function insert(creditCard, callback) {
  let creditCardObj = new CreditCard(creditCard);
  if(!creditCardObj) return callback(resultUtil.createNotFoundException());
  creditCardObj.save(function(error, result) {
    if(error) return callback(error);
    if(!result) return callback(resultUtil.createNotFoundException());
    result = { 'creditCard' : result};
    return callback(null, result);
  });
}

function insertByAccount(account, creditCard, callback) {
  let accountObj = new Account(account);
  let creditCardObj = new CreditCard(creditCard);
  if(!creditCardObj || !accountObj) return callback(resultUtil.createNotFoundException());
  Account.findById(accountObj._id, function(error, result) {
    if(error) return callback(error);
    if(!result) return callback(resultUtil.createNotFoundException());
      creditCardObj.owner = result._id;
      creditCardObj.save(function(error, result) {
        if(error) return callback(error);
        if(!result) return callback(resultUtil.createNotFoundException());
        result = { 'creditCard' : result};
        return callback(null, result);
      });
  });
}

function remove(creditCardId, callback) {
  if(!creditCardId) return callback(resultUtil.createNotFoundException());
  CreditCard.findByIdAndRemove(creditCardId, function(error) {
    if(error) return callback(error);
    return callback(null);
  });
}

module.exports = {
  get,
  getByAccountId,
  update,
  insert,
  insertByAccount,
  remove
};