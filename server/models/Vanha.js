const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/*
const findableObjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  name_latin: {
    type: String,
    required: true,
    unique: true,
  },
  family: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: '',
  },
  info: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    required: true,
  },
  times_found: {
    type: Number,
    default: 0
  }
}, { collation: { locale: 'fi' }});
*/

/* Näitä ei oo vielä lisätty
  name_latin: {
    type: String,
    required: true,
    unique: true,
  },
  family: {
    type: String,
    required: true,
  },
    category: {
    type: String,
    required: true,
  },
*/

const findableObjectSchema = mongoose.Schema({
  name: {
    type: String,
    min: [3, 'liian lyhyt nimi'],
    max: [36, 'liian pitkä nimi'],
    required: true,
    unique: true,
  },
  multimedia: {
    type: [mongoose.Schema.Types.Mixed],
  },
  descriptions: {
    type: [mongoose.Schema.Types.Mixed],
  },
  taxon: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 1,
  },
  thumbnail: {
    type: String,
    default: '',
  },
  observationCount: {
    type: Number,
    default: 0,
  },
  // Tänne vois survoo kaikki lisätiedot.
  extra: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  times_found: {
    type: Number,
    default: 0,
  },
}, { collation: { locale: 'fi' } });

/* eslint-disable */
findableObjectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

findableObjectSchema.plugin(uniqueValidator);

const FindableObject = mongoose.model('FindableObject', findableObjectSchema);

module.exports = FindableObject;
