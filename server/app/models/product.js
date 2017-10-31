'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ratingSchema = require('../models/rating').ratingSchema;

let productSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: Number, require: true },
  price: { type: Number, require: true },
  image: { type: String, require: true },
  ratings: [ratingSchema]
}, {
  timestamps: {}
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;