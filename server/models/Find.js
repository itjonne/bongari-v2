const mongoose = require('mongoose');
const config = require('../util/config');

const FindSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  objectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Object',
    required: true,
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
  // https://mongoosejs.com/docs/geojson.html
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  info: {
    type: String,
    trim: true,
    max: [280, 'liian pitkä info, 280 max'], // Twitterin pituus 280
    default: '',
  },
  points: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    trim: true,
    default: '',
  },
  thumbnail: {
    type: String,
    default: '',
  },
}, { timestamps: true });

/* eslint-disable */
FindSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Find = mongoose.model('Find', FindSchema);

module.exports = Find;