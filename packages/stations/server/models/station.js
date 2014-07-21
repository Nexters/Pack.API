'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var validateUniqueName = function(value, callback) {
    var Station = mongoose.model('Station');
    Station.find({$and: [{name : value}, { _id: { $ne : this._id }}]}, function(err, user) {
        callback(err || user.length === 0);
    });
};
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
        trim: true,
        validate: [validateUniqueName, 'Station name is already in-use']
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
    }).populate('station', 'name username').exec(cb);
};

mongoose.model('Station', StationSchema);

module.exports = StationSchema;
