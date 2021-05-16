const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
require('mongoose-type-email');
const Schema = mongoose.Schema;

// schema
const states = new Schema({
  stateId: {
    type: 'Number',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  nameToDisplay: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    default: 1,
    enum: [0, 1]
  },
  isDeleted: {
    type: Number,
    default: 0,
    enum: [0, 1]
  },
}, {
  timestamps: true
});

// creating indexes
states.index({
  'stateId': 1
});

states.plugin(autopopulate);

// exporting the entire module
module.exports = mongoose.model('states', states);