'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Customer Schema
 */
var CustomerSchema = new Schema({
	firstName: {
		type: String,
		default: '',
		required: 'Please fill Customer first name',
		trim: true
	},
	surname: {
		type: String,
		default: '',
		required: 'Please fill Customer surname',
		trim: true
	},
	country: {
		type: String,
		default: '',
		required: 'Please fill Customer country',
		trim: true
	},
	industry: {
		type: String,
		default: '',
		trim: true
	},
	email: {
		type: String,
		default: '',
		required: 'Please fill Customer email',
		trim: true
	},
	phone: {
		type: String,
		default: '',
		required: 'Please fill Customer email',
		trim: true
	},
	referred: {
		type: Boolean
	},
	channel: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Customer', CustomerSchema);
