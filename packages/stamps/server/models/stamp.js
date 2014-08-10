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
    name: {
        type: String,
        required: true,
        trim: true,
        enum: ['Help me', 'Grab a beer', 'Accident', 'Dangerous']
    },
    type: {
        type: String,
        required: true,
        trim: true,
        enum: ['help_me', 'grab_a_beer', 'accident', 'dangerous']
    },
    loc: { type: [Number], index: '2d'},
    hidden: Boolean
});

/**
 * Validations
 */
StampSchema.path(['name']).validate(function(name) {
    return !!name;
}, 'Name cannot be blank');

StampSchema.path(['type']).validate(function(type) {
    return !!type;
}, 'Type cannot be blank');


/**
 * Statics
 */
StampSchema.statics ={

};
/**
 * Methods
 */
StampSchema.methods = {

};

mongoose.model('Stamp', StampSchema);

module.exports = StampSchema;
