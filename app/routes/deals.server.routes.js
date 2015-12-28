'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var deals = require('../../app/controllers/deals.server.controller');
	var comments = require('../../app/controllers/comments.server.controller');



	// Deals Routes
	app.route('/deals')
		.get(deals.list)
		.post(users.requiresLogin, deals.create);

	app.route('/deals/dealCount').all()
		.get(deals.countDeals);

	app.route('/deals/dealCountToday').all()
		.get(deals.countDealsToday);

	app.route('/deals/upVote')
		.get(deals.list)
		.put(users.requiresLogin, deals.hasAuthorization, deals.voteUp);

	app.route('/deals/downVote')
		.get(deals.list)
		.put(users.requiresLogin, deals.hasAuthorization, deals.voteDown);

	app.route('/deals/:dealId')
		.get(deals.read)
		.put(users.requiresLogin, deals.hasAuthorization, deals.update)
		.delete(users.requiresLogin, deals.hasAuthorization, deals.delete);


	// Finish by binding the Deal middleware
	app.param('dealId', deals.dealByID);

	app.route('/api/deals')
		.get(deals.list);

	app.route('/api/deals/:dealId')
		.get(deals.read);

};
