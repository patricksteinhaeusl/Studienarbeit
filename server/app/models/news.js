'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let newsSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true }
}, {
  timestamps: {}
});

let News = mongoose.model('News', newsSchema);

module.exports = News;