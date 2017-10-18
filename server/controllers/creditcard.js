'use strict';

const creditcardService = require("../services/creditcard");

function getCreditcard(req, res) {
  let accountId = req.params.accountId;
  creditcardService.getCreditcard(accountId, (result) => {
    res.json(result);
  });
}

function updateCreditcard(req, res) {
  let creditcard = req.body.creditcard;
  creditcardService.updateCreditcard(creditcard, (result) => {
    res.json(result);
  });
}

function insertCreditcard(req, res) {
  let creditcard = req.body.creditcard;
  creditcardService.insertCreditcard(creditcard, (result) => {
    res.json(result);
  });
}

module.exports = {
  getCreditcard,
  updateCreditcard,
  insertCreditcard
};