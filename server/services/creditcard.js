'use strict';

const Creditcard = require('../models/creaditcard');
const exceptionUtil = require('../utils/exceptionUtil');

function getCreditcard(creditcardId, callback) {
  if(!creditcardId) return callback(exceptionUtil.createNotFoundException());
  Creditcard.findById(creditcardId, function(err, result) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    if(!result) return callback(exceptionUtil.createNotFoundException());
    callback(result);
  });
}

function updateCreditcard(creditcard, callback) {
  let creditcardObj = new Creditcard(creditcard);
  if(!creditcardObj) return callback(exceptionUtil.createNotFoundException());
  Creditcard.findByIdAndUpdate(creditcard._id, creditcardObj, {new: true}, function(err, result) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    if(!result) return callback(exceptionUtil.createNotFoundException());
    callback(result);
  });
}

function insertCreditcard(creditcard, callback) {
  if(!creditcard) return callback(exceptionUtil.createNotFoundException());
  Creditcard.findByIdAndUpdate(creditcard._id, creditcard, {new: true}, function(err, result) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    if(!result) return callback(exceptionUtil.createNotFoundException());
    callback(result);
  });
}

function deleteCreditcard(creditcard, callback) {
  if(!creditcard) return callback(exceptionUtil.createNotFoundException());
  Creditcard.findByIdAndRemove(creditcard._id, function(err) {
    if(err) return callback(exceptionUtil.createErrorException(err));
    callback();
  });
}

module.exports = {
  getCreditcard,
  updateCreditcard,
  insertCreditcard,
  deleteCreditcard
};