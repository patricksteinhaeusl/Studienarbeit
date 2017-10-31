'use strict';

const Account = require('../models/account');
const CreditCard = require('../models/creditCard');
const DeliveryAddress = require('../models/deliveryAddress');

let testAccount0 = new Account({
  _id: '59e7ffc364b7f1faf7a3348e',
  username: 'customer0',
  password: '234234',
  firstname: 'Hans',
  lastname: 'Muster',
  email: 'customer0@gmail.com'
});

let testCreditCard0 = new CreditCard({
  number: '0000-0000-0000-0000',
  _account: testAccount0._id
});

let testDeliveryAddress0 = new DeliveryAddress({
  street: 'Bahnhofstrasse 33',
  zip:  234324,
  city: 'Triesen',
  country: 'Liechtenstein',
  _account: testAccount0._id
});

let testAccount1 = new Account({
  _id: '59e7ffc364b7f1faf7a3348f',
  username: 'customer1',
  password: '234234',
  firstname: 'Hans',
  lastname: 'Muster',
  email: 'customer1@gmail.com'
});

let testCreditCard1 = new CreditCard({
  number: '1111-1111-1111-1111',
  _account: testAccount1._id
});

let testDeliveryAddress1 = new DeliveryAddress({
  street: 'Bahnhofstrasse 33',
  zip:  234324,
  city: 'Triesen',
  country: 'Liechtenstein',
  _account: testAccount1._id
});

let testData = [[testAccount0, testCreditCard0, testDeliveryAddress0], [testAccount1, testCreditCard1, testDeliveryAddress1]];

function init(callback) {
  dropData(function(error) {
    if(error) return callback(error);
    testData.forEach(function(test) {
      createData(test, function(error) {
        if(error) return callback(error);
        callback();
      });
    });
  });
}

function dropData(callback) {
  Account.remove({}, function(error) {
    if(error) return callback(error);
    console.log('Collection Account removed');
    CreditCard.remove({}, function(error) {
      if(error) return callback(error);
      console.log('Collection CreditCard removed');
      DeliveryAddress.remove({}, function(error) {
        if(error) return callback(error);
        console.log('Collection DeliveryAddress removed');
        callback();
      });
    });
  });
}

function createData(testValue, callback) {
  testValue[0].save(function(error) {
    if(error) return callback(error);
    createCreditCard(testValue[1], function(error) {
        if(error) return callback(error);
      createDeliveryAddress(testValue[2], function(error) {
        if(error) return callback(error);
        console.log('Data added to account!');
        callback();
      });
    });
  });
}

function createCreditCard(testCreditCard, callback) {
  testCreditCard.save(function(error) {
    if(error) return callback(error);
    callback();
  });
}

function createDeliveryAddress(testDeliveryAddress, callback) {
  testDeliveryAddress.save(function(error) {
    if(error) return callback(error);
    callback();
  });
}

module.exports = {
  init
};