'use strict';

const creditCardService = require('../services/creditCard');
const resultUtil = require('../utils/resultUtil');

function get(req, res, callback) {
  let creditCardId = req.params.creditCardId;
  creditCardService.get(creditCardId, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

function getByAccountId(req, res, callback) {
  let accountId = req.params.accountId;
  creditCardService.getByAccountId(accountId, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

function update(req, res, callback) {
  let creditCard = req.body.creditCard;
  creditCardService.update(creditCard, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

function insert(req, res, callback) {
  let creditCard = req.body.creditCard;
  creditCardService.insert(creditCard, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

function remove(req, res, callback) {
  let creditCardId = req.params.creditCardId;
  creditCardService.remove(creditCardId, (error, result) => {
    if(error) return callback(error);
    res.json(resultUtil.createResult(result));
  });
}

module.exports = {
  get,
  getByAccountId,
  update,
  insert,
  remove
};