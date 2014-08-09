'use strict';

/**
  * Module dependencies.
  */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlaceSchema = new Schema({

  created: {
      type: Date,
      default: Date.now
  },
  updated: {
      type: Date,
      default: Date.now
  },
  name: {
      type: String,
      required: true,
      trim: true
  },
  type: { type: String, enum:['Sightseeing', 'Food', 'Store']},
  loc: { type: [Number], index:'2d'},
  near_station: { type: Schema.ObjectId, ref: 'Station'},
  content: String
});


// Place methods
PlaceSchema.statics.load = function(id, callback) {
  this.findOne({
    _id: id
  }).populate({ path: 'near_station', select: 'name' } ).exec(callback);
};

mongoose.model('Place', PlaceSchema);

module.exports = PlaceSchema;
