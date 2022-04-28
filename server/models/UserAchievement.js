const mongoose = require('mongoose');
const config = require('../util/config');

const UserAchievementSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  achievementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement',
    required: true,
  },
  category: {
    type: String,
    enum: config.CATEGORIES,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  badge: {
    type: String,
    required: true,
  },
}, { timestamps: true });

/* eslint-disable */
UserAchievementSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const UserAchievement = mongoose.model('UserFind', UserAchievementSchema);

module.exports = UserAchievement;