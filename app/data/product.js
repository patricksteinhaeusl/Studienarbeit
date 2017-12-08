'use strict';

const LogUtil = require('../utils/log');
const Product = require('../models/product').Product;

let data = {
  drop: function(callback) {
    Product.remove({}, function(err) {
      if(err) LogUtil.writeError(err);
      LogUtil.writeInfo('Product removed');
      return callback();
    });
  },
  create: function(callback) {

    let product0 = new Product({
      _id: '59e7ffc364b7f1faf7a3310a',
      name: 'Product 0',
      category: {
          _id: '5a01b5d5802bd61d4547f5b1',
          name: 'Category 1'
      },
      size: 15,
      price: 25.00,
      image: 'default.png',
      ratings: []
    })
    .save(function(err) {
      if(err) LogUtil.writeError(err);
      LogUtil.writeInfo('Product saved');

      let product1 = new Product({
        _id: '59e7ffc364b7f1faf7a3310b',
        name: 'Product 1',
        category: {
          _id: '5a01b5d5802bd61d4547f5b1',
          name: 'Category 1'
        },
        size: 100,
        price: 5.00,
        image: 'default.png',
        ratings: []
      })
      .save(function(err) {
        if(err) LogUtil.writeError(err);
        LogUtil.writeInfo('Product saved');

        let product2 = new Product({
          _id: '59e7ffc364b7f1faf7a3310c',
          name: 'Product 2',
          category: {
            _id: '5a01b5d5802bd61d4547f5b2',
            name: 'Category 2'
          },
          size: 25,
          price: 10.25,
          image: 'default.png',
          ratings: []
        })
        .save(function(err) {
          if(err) LogUtil.writeError(err);
          LogUtil.writeInfo('Product saved');

          let product3 = new Product({
            _id: '59e7ffc364b7f1faf7a3310d',
            name: 'Product 3',
            category: {
              _id: '5a01b5d5802bd61d4547f5b3',
              name: 'Category 3'
            },
            size: 40,
            price: 30.25,
            image: 'default.png',
            ratings: []
          })
          .save(function(err) {
            if(err) LogUtil.writeError(err);
            LogUtil.writeInfo('Product saved');
            return callback();
          });
        });
      });
    });
  }
};

module.exports = data;