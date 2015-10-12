'use strict';

//Setting up route
angular.module('coupons').config(['$stateProvider',
	function($stateProvider) {
		// Coupons state routing
		$stateProvider.
		state('listCoupons', {
			url: '/coupons',
			templateUrl: 'modules/coupons/views/list-coupons.client.view.html'
		}).
		state('createCoupon', {
			url: '/coupons/create',
			templateUrl: 'modules/coupons/views/create-coupon.client.view.html'
		}).
		state('viewCoupon', {
			url: '/coupons/:couponId',
			templateUrl: 'modules/coupons/views/view-coupon.client.view.html'
		}).
		state('editCoupon', {
			url: '/coupons/:couponId/edit',
			templateUrl: 'modules/coupons/views/edit-coupon.client.view.html'
		});
	}
]);