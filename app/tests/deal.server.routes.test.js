'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Deal = mongoose.model('Deal'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, deal;

/**
 * Deal routes tests
 */
describe('Deal CRUD tests', function() {
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

		// Save a user to the test db and create new Deal
		user.save(function() {
			deal = {
				name: 'Deal Name'
			};

			done();
		});
	});

	it('should be able to save Deal instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Deal
				agent.post('/deals')
					.send(deal)
					.expect(200)
					.end(function(dealSaveErr, dealSaveRes) {
						// Handle Deal save error
						if (dealSaveErr) done(dealSaveErr);

						// Get a list of Deals
						agent.get('/deals')
							.end(function(dealsGetErr, dealsGetRes) {
								// Handle Deal save error
								if (dealsGetErr) done(dealsGetErr);

								// Get Deals list
								var deals = dealsGetRes.body;

								// Set assertions
								(deals[0].user._id).should.equal(userId);
								(deals[0].name).should.match('Deal Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Deal instance if not logged in', function(done) {
		agent.post('/deals')
			.send(deal)
			.expect(401)
			.end(function(dealSaveErr, dealSaveRes) {
				// Call the assertion callback
				done(dealSaveErr);
			});
	});

	it('should not be able to save Deal instance if no name is provided', function(done) {
		// Invalidate name field
		deal.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Deal
				agent.post('/deals')
					.send(deal)
					.expect(400)
					.end(function(dealSaveErr, dealSaveRes) {
						// Set message assertion
						(dealSaveRes.body.message).should.match('Please fill Deal name');
						
						// Handle Deal save error
						done(dealSaveErr);
					});
			});
	});

	it('should be able to update Deal instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Deal
				agent.post('/deals')
					.send(deal)
					.expect(200)
					.end(function(dealSaveErr, dealSaveRes) {
						// Handle Deal save error
						if (dealSaveErr) done(dealSaveErr);

						// Update Deal name
						deal.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Deal
						agent.put('/deals/' + dealSaveRes.body._id)
							.send(deal)
							.expect(200)
							.end(function(dealUpdateErr, dealUpdateRes) {
								// Handle Deal update error
								if (dealUpdateErr) done(dealUpdateErr);

								// Set assertions
								(dealUpdateRes.body._id).should.equal(dealSaveRes.body._id);
								(dealUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Deals if not signed in', function(done) {
		// Create new Deal model instance
		var dealObj = new Deal(deal);

		// Save the Deal
		dealObj.save(function() {
			// Request Deals
			request(app).get('/deals')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Deal if not signed in', function(done) {
		// Create new Deal model instance
		var dealObj = new Deal(deal);

		// Save the Deal
		dealObj.save(function() {
			request(app).get('/deals/' + dealObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', deal.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Deal instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Deal
				agent.post('/deals')
					.send(deal)
					.expect(200)
					.end(function(dealSaveErr, dealSaveRes) {
						// Handle Deal save error
						if (dealSaveErr) done(dealSaveErr);

						// Delete existing Deal
						agent.delete('/deals/' + dealSaveRes.body._id)
							.send(deal)
							.expect(200)
							.end(function(dealDeleteErr, dealDeleteRes) {
								// Handle Deal error error
								if (dealDeleteErr) done(dealDeleteErr);

								// Set assertions
								(dealDeleteRes.body._id).should.equal(dealSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Deal instance if not signed in', function(done) {
		// Set Deal user 
		deal.user = user;

		// Create new Deal model instance
		var dealObj = new Deal(deal);

		// Save the Deal
		dealObj.save(function() {
			// Try deleting Deal
			request(app).delete('/deals/' + dealObj._id)
			.expect(401)
			.end(function(dealDeleteErr, dealDeleteRes) {
				// Set message assertion
				(dealDeleteRes.body.message).should.match('User is not logged in');

				// Handle Deal error error
				done(dealDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Deal.remove().exec();
		done();
	});
});