const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
require('mongoose-type-email');
const Schema = mongoose.Schema;

// schema
const districts = new Schema({
  name: {
    type: String,
    required: true
  },
  nameToDisplay: {
    type: String,
    required: true
  },
  stateId: {
    type: 'Number',
    required: true
  },
  districtId: [{
    type: 'Number',
    required: true
  }],
  email: {
    type: mongoose.SchemaTypes.Email,
    unique: true
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
districts.index({
  'status': 1
});

districts.plugin(autopopulate);

// exporting the entire module
module.exports = mongoose.model('districts', districts);