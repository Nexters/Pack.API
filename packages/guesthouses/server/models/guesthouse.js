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
    price: String
});

/**
 * Validations
 */
GuesthouseSchema.path('name').validate(function(name) {
    return !!name;
}, 'Title cannot be blank');


/**
 * Statics
 */
GuesthouseSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate({ type: 'near_stations', select: 'name' }).exec(cb);
};

GuesthouseSchema.statics.all = function(cb) {
    this.find().sort('-created').exec(cb);
};
/**
 * Methods
 */
GuesthouseSchema.methods = {

};

mongoose.model('Guesthouse', GuesthouseSchema);

module.exports = GuesthouseSchema;
