'use strict';

//Comments service used to communicate Comments REST endpoints
angular.module('comments').factory('Comments', ['$resource',
	function($resource) {
		return $resource('comments/:commentId', { commentId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},
			countComments: {
				method: 'GET',
				url: '/comments/commentCount',
				isArray: false
			},
			countCommentsToday: {
				method: 'GET',
				url: '/comments/commentCountToday',
				isArray: false
			}
		});
	}
]);
