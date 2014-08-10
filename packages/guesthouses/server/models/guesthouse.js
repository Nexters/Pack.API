'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Guesthouse Schema
 */
var GuesthouseSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    city: String,
    loc: { type: [Number], index: '2d'},
    info: String,
    address: String,
    hidden: Boolean,
    near_stations: [{ type: Schema.Types.ObjectId, ref: 'Station' }],
    comments: [{
      body: String,
      image: String,
      date:{
        type: Date,
        default: Date.now
      },
      user:{ type: Schema.ObjectId, ref: 'User'}
    }],
    price: String
});

/**
 * Validations
 */
GuesthouseSchema.path('name').validate(function(name) {
    return !!name;
}, 'Name cannot be blank');


/**
 * Statics
 */
GuesthouseSchema.statics = {

  /**
  * load is find guesthouse has same id.
  */
  load : function(id, cb) {
      this.findOne({
          _id: id
      }).populate({path: 'near_stations', select: 'name'}).exec(cb);
  },

  /**
  * 'all'is a method that finds all of guesthouses in order of creation.
  */
  all : function(cb) {
      this.find().sort('-created').exec(cb);
  }
};

/**
 * Methods
 */
GuesthouseSchema.methods = {

};

mongoose.model('Guesthouse', GuesthouseSchema);

module.exports = GuesthouseSchema;
