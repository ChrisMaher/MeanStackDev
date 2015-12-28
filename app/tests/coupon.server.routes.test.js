'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Coupon = mongoose.model('Coupon'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, coupon;

/**
 * Coupon routes tests
 */
describe('Coupon CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Coupon
		user.save(function() {
			coupon = {
				name: 'Coupon Name'
			};

			done();
		});
	});

	it('should be able to save Coupon instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Coupon
				agent.post('/coupons')
					.send(coupon)
					.expect(200)
					.end(function(couponSaveErr, couponSaveRes) {
						// Handle Coupon save error
						if (couponSaveErr) done(couponSaveErr);

						// Get a list of Coupons
						agent.get('/coupons')
							.end(function(couponsGetErr, couponsGetRes) {
								// Handle Coupon save error
								if (couponsGetErr) done(couponsGetErr);

								// Get Coupons list
								var coupons = couponsGetRes.body;

								// Set assertions
								(coupons[0].user._id).should.equal(userId);
								(coupons[0].name).should.match('Coupon Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Coupon instance if not logged in', function(done) {
		agent.post('/coupons')
			.send(coupon)
			.expect(401)
			.end(function(couponSaveErr, couponSaveRes) {
				// Call the assertion callback
				done(couponSaveErr);
			});
	});

	it('should not be able to save Coupon instance if no name is provided', function(done) {
		// Invalidate name field
		coupon.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Coupon
				agent.post('/coupons')
					.send(coupon)
					.expect(400)
					.end(function(couponSaveErr, couponSaveRes) {
						// Set message assertion
						(couponSaveRes.body.message).should.match('Please fill Coupon name');
						
						// Handle Coupon save error
						done(couponSaveErr);
					});
			});
	});

	it('should be able to update Coupon instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Coupon
				agent.post('/coupons')
					.send(coupon)
					.expect(200)
					.end(function(couponSaveErr, couponSaveRes) {
						// Handle Coupon save error
						if (couponSaveErr) done(couponSaveErr);

						// Update Coupon name
						coupon.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Coupon
						agent.put('/coupons/' + couponSaveRes.body._id)
							.send(coupon)
							.expect(200)
							.end(function(couponUpdateErr, couponUpdateRes) {
								// Handle Coupon update error
								if (couponUpdateErr) done(couponUpdateErr);

								// Set assertions
								(couponUpdateRes.body._id).should.equal(couponSaveRes.body._id);
								(couponUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Coupons if not signed in', function(done) {
		// Create new Coupon model instance
		var couponObj = new Coupon(coupon);

		// Save the Coupon
		couponObj.save(function() {
			// Request Coupons
			request(app).get('/coupons')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Coupon if not signed in', function(done) {
		// Create new Coupon model instance
		var couponObj = new Coupon(coupon);

		// Save the Coupon
		couponObj.save(function() {
			request(app).get('/coupons/' + couponObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', coupon.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Coupon instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Coupon
				agent.post('/coupons')
					.send(coupon)
					.expect(200)
					.end(function(couponSaveErr, couponSaveRes) {
						// Handle Coupon save error
						if (couponSaveErr) done(couponSaveErr);

						// Delete existing Coupon
						agent.delete('/coupons/' + couponSaveRes.body._id)
							.send(coupon)
							.expect(200)
							.end(function(couponDeleteErr, couponDeleteRes) {
								// Handle Coupon error error
								if (couponDeleteErr) done(couponDeleteErr);

								// Set assertions
								(couponDeleteRes.body._id).should.equal(couponSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Coupon instance if not signed in', function(done) {
		// Set Coupon user 
		coupon.user = user;

		// Create new Coupon model instance
		var couponObj = new Coupon(coupon);

		// Save the Coupon
		couponObj.save(function() {
			// Try deleting Coupon
			request(app).delete('/coupons/' + couponObj._id)
			.expect(401)
			.end(function(couponDeleteErr, couponDeleteRes) {
				// Set message assertion
				(couponDeleteRes.body.message).should.match('User is not logged in');

				// Handle Coupon error error
				done(couponDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Coupon.remove().exec();
		done();
	});
});