'use strict';

const creditCardService = require("../services/creditCard");

function get(req, res) {
  let creditCardId = req.params.creditCardId;
  creditCardService.get(creditCardId, (result) => {
    res.json(result);
  });
}

function getAllByAccountId(req, res) {
  let accountId = req.params.accountId;
  creditCardService.getAllByAccountId(accountId, (result) => {
    res.json(result);
  });
}

function update(req, res) {
  let creditCard = req.body.creditCard;
  creditCardService.update(creditCard, (result) => {
    res.json(result);
  });
}

function insert(req, res) {
  let account = req.body.account;
  let creditCard = req.body.creditCard;
  creditCardService.insert(account, creditCard, (result) => {
    res.json(result);
  });
}

function remove(req, res) {
  let creditCardId = req.params.creditCardId;
  creditCardService.remove(creditCardId, (result) => {
    res.json(result);
  });
}

module.exports = {
  get,
  getAllByAccountId,
  update,
  insert,
  remove
};