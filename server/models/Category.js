const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnail: {
    type: String,
    default: '',
  },
  objects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Object',
  },
  achievements: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Achievement',
  },
  // Tänne vois survoo kaikki lisätiedot.
}, { collation: { locale: 'fi' } });

/* eslint-disable */
CategorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

CategorySchema.plugin(uniqueValidator);

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
