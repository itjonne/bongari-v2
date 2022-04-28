const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const config = require('../util/config');

const ObjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  nameLatin: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    enum: config.CATEGORIES,
    required: true,
  },
  subcategory: {
    type: String,
    // enum: config.CATEGORIES,
    required: true,
  },
  thumbnail: {
    type: String,
    default: '',
  },
  taxon: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 1,
  },
  observationCount: {
    type: Number,
    default: 0,
  },
  // Tänne vois survoo kaikki lisätiedot.
}, { collation: { locale: 'fi' } });

/* eslint-disable */
ObjectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

ObjectSchema.plugin(uniqueValidator);

const FindableObject = mongoose.model('Object', ObjectSchema);

module.exports = FindableObject;
