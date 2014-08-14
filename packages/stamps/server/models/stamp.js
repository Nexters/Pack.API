'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Stamp Schema
 */
var StampSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    type: {
        type: String,
        required: true,
        trim: true,
        enum: ['help_me', 'grab_a_beer', 'accident', 'dangerous']
    },
    loc: { type: [Number], index: '2d'},
    user:{ type: Schema.ObjectId, ref: 'User'},
    hidden: Boolean
});

/**
 * Validations
 */
StampSchema.path(['type']).validate(function(type) {
    return !!type;
}, 'Type cannot be blank');


/**
 * Statics
 */
StampSchema.statics ={

  /**
  * load is find stamp has same id.
  */
  load : function(id, cb) {
      this.findOne({
          _id: id
      }).exec(cb);
  },

  /**
  * 'all'is a method that finds all of stamps in order of creation.
  */
  all : function(cb) {
      this.find().sort('-created').exec(cb);
  }
};
/**
 * Methods
 */
StampSchema.methods = {

};

mongoose.model('Stamp', StampSchema);

module.exports = StampSchema;
