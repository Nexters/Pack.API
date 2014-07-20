'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Station Schema
 */
var StationSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: { type: String, enum: ['Airport', 'Bus', 'Train']},
    loc: { type: {
      lat: Number,
      lng: Number
    }, index: '2d'},
    address: String,
    hidden: Boolean,
    comments: [{ body: String, date: Date }],
    near_stations: [Schema.Types.ObjectId]
});

/**
 * Validations
 */
StationSchema.path('name').validate(function(name) {
    return !!name;
}, 'Title cannot be blank');


/**
 * Statics
 */
StationSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Station', StationSchema);
