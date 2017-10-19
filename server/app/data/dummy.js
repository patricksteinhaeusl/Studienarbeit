'use strict';

const Account = require('../models/account');
const Creditcard = require('../models/creaditCard');
const DeliveryAddress = require('../models/deliveryAddress');

function init() {
  dropData(function() {
    createData(function() {
      console.log('Dummy Data created!');
    });
  });
}

function dropData(callback) {
  Account.remove({}, function(err) {
    if(err) return console.error(err);
    console.log('Collection Account removed');
  });

  Creditcard.remove({}, function(err) {
    if(err) return console.error(err);
    console.log('Collection CreditCard removed');
    callback();
  });

  DeliveryAddress.remove({}, function(err) {
    if(err) return console.error(err);
    console.log('Collection DeliveryAddress removed');
    callback();
  });
}

function createData(callback) {
  let account = new Account({
    username: 'customer2',
    password: '234234',
    firstname: 'Hans',
    lastname: 'Muster',
    email: 'hans.muster@gmail.com'
  });

  account.save(function(err, account) {
    if (err) return console.error(err);
    createCreditCard(account, function(err) {
      if(err) return console.error(err);
      createDeliveryAddress(account, function(err) {
        if(err) return console.error(err);
        console.log('Data added to account!');
        callback();
      });
    });
  });
}

function createCreditCard(account, callback) {
  let creditcard = new Creditcard({
    number: '234-234234-23423-223323',
    owner: account._id
  });

  creditcard.save(function (err) {
    if (err) return callback(err);
    callback();
  });
}

function createDeliveryAddress(account, callback) {
  let deliveryAddress = new DeliveryAddress({
    street: 'Bahnhofstrasse 33',
    zip:  234324,
    city: 'Triesen',
    country: 'Liechtenstein',
    owner: account._id
  });

  deliveryAddress.save(function (err) {
    if (err) return callback(err);
    callback();
  });
}

module.exports = {
  init
};