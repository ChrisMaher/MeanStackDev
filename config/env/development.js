'use strict';

module.exports = {
	db: 'mongodb://mongo:mongo@ds031339.mongolab.com:31339/deals',
	app: {
		title: 'MeanApp - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '100240200318144',
		clientSecret: process.env.FACEBOOK_SECRET || 'ae7c8731d6944df9dc234a35a56f1f9c',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '291598201748-7n9e527blim3si6jdqsmopreebbd2j3b.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'c5CHGDaphJ6ZB6xNtY7MTZzO',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
