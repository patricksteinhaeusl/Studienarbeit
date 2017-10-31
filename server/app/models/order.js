'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('../models/item').itemSchema;

let orderSchema = new Schema({
  items: [itemSchema],
  status: { type: String, required: true },
  comment: { type: String, required: true },
}, {
  timestamps: {}
});

let Order = mongoose.model('Order', orderSchema);

module.exports = Order;