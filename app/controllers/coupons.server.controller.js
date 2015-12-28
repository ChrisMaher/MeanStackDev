'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Coupon = mongoose.model('Coupon'),
	_ = require('lodash');

/**
 * Create a Coupon
 */
exports.create = function(req, res) {
	var coupon = new Coupon(req.body);
	coupon.user = req.user;

	coupon.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(coupon);
		}
	});
};

/**
 * Show the current Coupon
 */
exports.read = function(req, res) {
	res.jsonp(req.coupon);
};

/**
 * Update a Coupon
 */
exports.update = function(req, res) {
	var coupon = req.coupon ;

	coupon = _.extend(coupon , req.body);

	coupon.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(coupon);
		}
	});
};

/**
 * Delete an Coupon
 */
exports.delete = function(req, res) {
	var coupon = req.coupon ;

	coupon.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(coupon);
		}
	});
};

/**
 * List of Coupons
 */
exports.list = function(req, res) { 
	Coupon.find().sort('-created').populate('user', 'displayName').exec(function(err, coupons) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(coupons);
		}
	});
};

/**
 * Coupon middleware
 */
exports.couponByID = function(req, res, next, id) { 
	Coupon.findById(id).populate('user', 'displayName').exec(function(err, coupon) {
		if (err) return next(err);
		if (! coupon) return next(new Error('Failed to load Coupon ' + id));
		req.coupon = coupon ;
		next();
	});
};

/**
 * Coupon authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.coupon.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
