const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const AchievementSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: '',
  },
  points: {
    type: Number,
    required: true,
  },
  badge: {
    type: String,
    required: true,
  },
  requirements: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  // Tänne vois survoo kaikki lisätiedot.
}, { collation: { locale: 'fi' }, timestamps: true });

/* eslint-disable */
AchievementSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

AchievementSchema.plugin(uniqueValidator);

const Achievement = mongoose.model('Achievement', AchievementSchema);

module.exports = Achievement;
