'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let deliveryAddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: Number, required: true },
  country: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'Account'}
}, {
  timestamps: {}
});

let DeliveryAddress = mongoose.model('DeliveryAddress', deliveryAddressSchema);

module.exports = DeliveryAddress;