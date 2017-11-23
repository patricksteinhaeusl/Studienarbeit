'use strict';

let LogUtil = require('../utils/log');
let Product = require('../models/product').Product;

let data = {
  drop: function () {
    Product.remove({}, function(err) {
      if(err) return LogUtil.writeError(err);
      return LogUtil.writeInfo('Product removed');
    });
  },
  create: function() {

    let product0 = new Product({
      _id: '59e7ffc364b7f1faf7a3310a',
      name: 'Product 0',
      category: {
          _id: '5a01b5d5802bd61d4547f5b1',
          name: 'Category 1'
      },
      size: 15,
      price: 25.00,
      image: 'product-image1.jpg',
      ratings: []
    })
    .save(function(err) {
      if(err) return LogUtil.writeError(err);
      return LogUtil.writeInfo('Product saved');
    });

    let product1 = new Product({
      _id: '59e7ffc364b7f1faf7a3310b',
      name: 'Product 1',
      category: {
          _id: '5a01b5d5802bd61d4547f5b1',
          name: 'Category 1'
      },
      size: 15,
      price: 25.00,
      image: 'product-image1.jpg',
      ratings: []
    })
    .save(function(err) {
      if(err) return LogUtil.writeError(err);
      return LogUtil.writeInfo('Product saved');
    });

    let product2 = new Product({
      _id: '59e7ffc364b7f1faf7a3310c',
      name: 'Product 2',
      category: {
          _id: '5a01b5d5802bd61d4547f5b2',
          name: 'Category 2'
      },
      size: 17,
      price: 30.25,
      image: 'product-image1.jpg',
      ratings: []
    })
    .save(function(err) {
      if(err) return LogUtil.writeError(err);
      return LogUtil.writeInfo('Product saved');
    });

    let product3 = new Product({
      _id: '59e7ffc364b7f1faf7a3310d',
      name: 'Product 3',
      category: {
          _id: '5a01b5d5802bd61d4547f5b3',
          name: 'Category 3'
      },
      size: 17,
      price: 30.25,
      image: 'product-image1.jpg',
      ratings: []
    })
    .save(function(err) {
      if(err) return LogUtil.writeError(err);
      return LogUtil.writeInfo('Product saved');
    });
  }
};

module.exports = data;