'use strict';

const CreditCardService = require('../services/creditCard');

function get(req, res) {
  let creditCardId = req.params.creditCardId;
  CreditCardService.get(creditCardId, (error, result) => {
    if(error) return res.send(error);
    res.json(result);
  });
}

function getByAccountId(req, res) {
  let accountId = req.params.accountId;
  CreditCardService.getByAccountId(accountId, (error, result) => {
    if(error) return res.send(error);
    res.json(result);
  });
}

function update(req, res) {
  let creditCard = req.body.creditCard;
  CreditCardService.update(creditCard, (error, result) => {
    if(error) return res.send(error);
    res.json(result);
  });
}

function insert(req, res) {
  let creditCard = req.body.creditCard;
  CreditCardService.insert(creditCard, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

function remove(req, res) {
  let creditCardId = req.params.creditCardId;
  CreditCardService.remove(creditCardId, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

module.exports = {
  get,
  getByAccountId,
  update,
  insert,
  remove
};