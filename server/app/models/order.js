'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('../models/item').itemSchema;
const deliveryAddressSchema = require('../models/deliveryAddress').deliveryAddressSchema;
const creditCardSchema = require('../models/creditCard').creditCardSchema;

let orderSchema = new Schema({
  items: [itemSchema],
  deliveryAddress: deliveryAddressSchema,
  creditCard: creditCardSchema,
  status: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  _account: { type: Schema.Types.ObjectId, ref: 'Account'}
}, {
  timestamps: {}
});

let Order = mongoose.model('Order', orderSchema);

module.exports = Order;