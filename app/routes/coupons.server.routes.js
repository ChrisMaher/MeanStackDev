'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var coupons = require('../../app/controllers/coupons.server.controller');

	// Coupons Routes
	app.route('/coupons')
		.get(coupons.list)
		.post(users.requiresLogin, coupons.create);

	app.route('/coupons/:couponId')
		.get(coupons.read)
		.put(users.requiresLogin, coupons.hasAuthorization, coupons.update)
		.delete(users.requiresLogin, coupons.hasAuthorization, coupons.delete);

	app.route('/api/coupons')
		.get(coupons.list);

	app.route('/api/coupons/:couponId')
		.get(coupons.read);

	// Finish by binding the Coupon middleware
	app.param('couponId', coupons.couponByID);


};
