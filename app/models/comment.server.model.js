'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
    userName: {
        type: String,
        default: 'TO DO',
        required: 'Please fill Comment name',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    details: {
        type: String,
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    deal: {
        type: Schema.ObjectId,
        ref: 'Deal'
    },
    dealId: {
        type: String,
        trim: true
    }

});

mongoose.model('Comment', CommentSchema);
