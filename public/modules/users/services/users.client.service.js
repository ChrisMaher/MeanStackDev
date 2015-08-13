'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			},
			countUsers: {
				method: 'GET',
				url: '/users/userCount',
				isArray: false
			}
			,
			countUsersToday: {
				method: 'GET',
				url: '/users/userCountToday',
				isArray: false
			}
		});
	}
]);
