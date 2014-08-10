'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Event Schema
 */
var EventSchema = new Schema({
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
    type: {
        type: String,
        required: true,
        trim: true
    },
    loc: { type: [Number], index: '2d'},
    hidden: Boolean
});

/**
 * Validations
 */
EventSchema.path(['name']).validate(function(name) {
    return !!name;
}, 'Name cannot be blank');

EventSchema.path(['type']).validate(function(type) {
    return !!type;
}, 'Type cannot be blank');


/**
 * Statics
 */
EventSchema.statics ={

};
/**
 * Methods
 */
EventSchema.methods = {

};

mongoose.model('Event', EventSchema);

module.exports = EventSchema;
