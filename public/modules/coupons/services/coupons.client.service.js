'use strict';

//Coupons service used to communicate Coupons REST endpoints
angular.module('coupons').factory('Coupons', ['$resource',
	function($resource) {
		return $resource('coupons/:couponId', { couponId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);