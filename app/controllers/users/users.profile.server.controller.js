'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.json(user);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};


/**
 * Count of Users
 */
exports.countUsers = function (req, res) {
    User.count({},

        function (err, usersCount) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                var data = {};
                data.count =  usersCount;
                res.jsonp(data);
            }
        });
};

/**
 * Count of Users Today
 */
exports.countUsersToday = function (req, res) {
    User.count({

            $where: function ()
            { return Date.now() - this._id.getTimestamp() < (24 * 60 * 60 * 1000);  }

        },

        function (err, usersCount) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                var data = {};
                data.count =  usersCount;
                res.jsonp(data);
            }
        });
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};
