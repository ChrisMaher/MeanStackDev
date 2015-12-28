'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CouponSchema = new Schema({
	couponURL: {
		type: String,
		default: '',
		required: 'Please fill Coupon URL',
		trim: true
	},
	title: {
		type: String,
		required: 'Please fill Coupon Title.'
	},
	discount: {
		type: Number,
		default: Date.now
	},
	code: {
		type: String

	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Coupon', CouponSchema);
