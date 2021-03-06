'use strict';

const Account = require('../models/account');
const CreditCard = require('../models/creditCard').CreditCard;
const ResponseUtil = require('../utils/response');

function get(creditCardId, callback) {
  if(!creditCardId) return callback(ResponseUtil.createNotFoundResponse());
  CreditCard.findById(creditCardId, function(error, result) {
    if(error) return callback(ResponseUtil.createNotFoundResponse(error));
    if(!result) return callback(ResponseUtil.createNotFoundResponse());
    result = { 'creditCard' : result};
    return callback(null, ResponseUtil.createSuccessResponse(result));
  });
}

function getByAccountId(accountId, callback) {
  if(!accountId) return callback(ResponseUtil.createNotFoundResponse());
  CreditCard.find({ '_account' : accountId }, function(error, result) {
    if(error) return callback(ResponseUtil.createNotFoundResponse(error));
    if(!result) return callback(ResponseUtil.createNotFoundResponse());
    result = { 'creditCards' : result};
    return callback(null, ResponseUtil.createSuccessResponse(result));
  });
}

function update(creditCard, callback) {
  let creditCardObj = new CreditCard(creditCard);
  if(!creditCardObj) return callback(ResponseUtil.createNotFoundResponse());
  CreditCard.findByIdAndUpdate(creditCardObj._id, creditCardObj, { new: true }, function(error, result) {
    if(error) return callback(ResponseUtil.createNotFoundResponse(error));
    if(!result) return callback(ResponseUtil.createNotFoundResponse());
    result = { 'creditCard' : result};
    return callback(null, ResponseUtil.createSuccessResponse(result));
  });
}

function insert(creditCard, callback) {
  let creditCardObj = new CreditCard(creditCard);
  if(!creditCardObj) return callback(ResponseUtil.createNotFoundResponse());
  creditCardObj.save(function(error, result) {
    if(error) return callback(ResponseUtil.createNotFoundResponse(error));
    if(!result) return callback(ResponseUtil.createNotFoundResponse());
    result = { 'creditCard' : result};
    return callback(null, ResponseUtil.createSuccessResponse(result));
  });
}

function insertByAccount(account, creditCard, callback) {
  let accountObj = new Account(account);
  let creditCardObj = new CreditCard(creditCard);
  if(!creditCardObj || !accountObj) return callback(ResponseUtil.createNotFoundResponse());
  Account.findById(accountObj._id, function(error, result) {
    if(error) return callback(ResponseUtil.createErrorResponse(error));
    if(!result) return callback(ResponseUtil.createNotFoundResponse());
      creditCardObj.owner = result._id;
      creditCardObj.save(function(error, result) {
        if(error) return callback(ResponseUtil.createNotFoundResponse(error));
        if(!result) return callback(ResponseUtil.createNotFoundResponse());
        result = { 'creditCard' : result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
      });
  });
}

function remove(creditCardId, callback) {
  if(!creditCardId) return callback(ResponseUtil.createNotFoundResponse());
  CreditCard.findByIdAndRemove(creditCardId, function(error) {
    if(error) return callback(error);
    return callback(null, ResponseUtil.createSuccessResponse({}));
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