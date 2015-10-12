'use strict';

//Deals service used to communicate Deals REST endpoints
angular.module('deals').factory('Deals', ['$resource',
	function($resource) {
		return $resource('deals/:dealId', { dealId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},
			countDeals: {
				method: 'GET',
				url: '/deals/dealCount',
				isArray: false
			},
			countDealsToday: {
				method: 'GET',
				url: '/deals/dealCountToday',
				isArray: false
			},
			voteUp: {
				method: 'PUT',
                url: '/deals/upVote'
			},
			voteDown: {
				method: 'PUT',
                url: '/deals/downVote'
			}
		});
	}
]);

