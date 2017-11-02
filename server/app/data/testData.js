'use strict';

const Account = require('../models/account');
const CreditCard = require('../models/creditCard');
const DeliveryAddress = require('../models/deliveryAddress');
const Product = require('../models/product');

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

let testAccounts = [[testAccount0, testCreditCard0, testDeliveryAddress0], [testAccount1, testCreditCard1, testDeliveryAddress1]];

let testProduct0 = new Product({
  _id: '59e7ffc364b7f1faf7a3310a',
  name: 'Product 0',
  category: 'Category 1',
  size: 15,
  price: 25.00,
  image: 'product1.jpg',
  ratings: []
});

let testProduct1 = new Product({
  _id: '59e7ffc364b7f1faf7a3310b',
  name: 'Product 1',
  category: 'Category 1',
  size: 15,
  price: 25.00,
  image: 'product1.jpg',
  ratings: []
});

let testProduct2 = new Product({
  _id: '59e7ffc364b7f1faf7a3310c',
  name: 'Product 2',
  category: 'Category 1',
  size: 17,
  price: 30.25,
  image: 'product2.jpg',
  ratings: []
});

let testProduct3 = new Product({
  _id: '59e7ffc364b7f1faf7a3310d',
  name: 'Product 3',
  category: 'Category 2',
  size: 17,
  price: 30.25,
  image: 'product3.jpg',
  ratings: []
});

function init(callback) {
  dropData(function(error) {
    if(error) return callback(error);
    testAccounts.forEach(function(value) {
      createAccounts(value, function(error) {
        if(error) return callback(error);
        createProducts(function(error) {
          if(error) return callback(error);
          return callback();
        });
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
        Product.remove({}, function(error) {
          if(error) return callback(error);
          console.log('Collection Products removed');
          return callback();
        });
      });
    });
  });
}

function createAccounts(value, callback) {
  value[0].save(function(error) {
    if(error) return callback(error);
    createCreditCard(value[1], function(error) {
        if(error) return callback(error);
      createDeliveryAddress(value[2], function(error) {
        if(error) return callback(error);
        console.log('Data added to account!');
        return callback();
      });
    });
  });
}

function createProducts(callback) {
  testProduct0.save(function(error, product) {
    if(error) console.log(error);
    console.log(product);
    testProduct1.save(function(error, product) {
      if(error) console.log(error);
      console.log(product);
      testProduct2.save(function(error, product) {
        if(error) console.log(error);
        console.log(product);
        testProduct3.save(function(error, product) {
          if(error) console.log(error);
          console.log(product);
          return callback();
        });
      });
    });
  });
}

function createCreditCard(testCreditCard, callback) {
  testCreditCard.save(function(error) {
    if(error) return callback(error);
    return callback();
  });
}

function createDeliveryAddress(testDeliveryAddress, callback) {
  testDeliveryAddress.save(function(error) {
    if(error) return callback(error);
    return callback();
  });
}

module.exports = {
  init
};