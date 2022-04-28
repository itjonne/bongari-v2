const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validators = require('../util/validators');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: {
      validator: validators.validateEmail,
      message: 'virheellinen sähköpostiosoite',
    },
  },
  username: {
    type: String,
    trim: true,
    min: [3, 'liian lyhyt käyttäjänimi'],
    max: [16, 'liian pitkä käyttäjänimi'],
    required: true,
    unique: true,
    validate: {
      validator: validators.validateUsername,
      message: 'virheellinen käyttäjänimi',
    },
  },
  points: {
    type: Number,
    default: 0,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    enum: [0, 1, 2, 3], // 0 user, 1 admin, 2 sysadmin, 3 owner
    default: 0,
  },
  language: {
    type: String,
    enum: ['fi', 'en'],
    default: 'fi',
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

UserSchema.plugin(uniqueValidator);

/* eslint-disable */
UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.passwordHash;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;