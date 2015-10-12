'use strict';

(function() {
	// Coupons Controller Spec
	describe('Coupons Controller Tests', function() {
		// Initialize global variables
		var CouponsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Coupons controller.
			CouponsController = $controller('CouponsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Coupon object fetched from XHR', inject(function(Coupons) {
			// Create sample Coupon using the Coupons service
			var sampleCoupon = new Coupons({
				name: 'New Coupon'
			});

			// Create a sample Coupons array that includes the new Coupon
			var sampleCoupons = [sampleCoupon];

			// Set GET response
			$httpBackend.expectGET('coupons').respond(sampleCoupons);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.coupons).toEqualData(sampleCoupons);
		}));

		it('$scope.findOne() should create an array with one Coupon object fetched from XHR using a couponId URL parameter', inject(function(Coupons) {
			// Define a sample Coupon object
			var sampleCoupon = new Coupons({
				name: 'New Coupon'
			});

			// Set the URL parameter
			$stateParams.couponId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/coupons\/([0-9a-fA-F]{24})$/).respond(sampleCoupon);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.coupon).toEqualData(sampleCoupon);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Coupons) {
			// Create a sample Coupon object
			var sampleCouponPostData = new Coupons({
				name: 'New Coupon'
			});

			// Create a sample Coupon response
			var sampleCouponResponse = new Coupons({
				_id: '525cf20451979dea2c000001',
				name: 'New Coupon'
			});

			// Fixture mock form input values
			scope.name = 'New Coupon';

			// Set POST response
			$httpBackend.expectPOST('coupons', sampleCouponPostData).respond(sampleCouponResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Coupon was created
			expect($location.path()).toBe('/coupons/' + sampleCouponResponse._id);
		}));

		it('$scope.update() should update a valid Coupon', inject(function(Coupons) {
			// Define a sample Coupon put data
			var sampleCouponPutData = new Coupons({
				_id: '525cf20451979dea2c000001',
				name: 'New Coupon'
			});

			// Mock Coupon in scope
			scope.coupon = sampleCouponPutData;

			// Set PUT response
			$httpBackend.expectPUT(/coupons\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/coupons/' + sampleCouponPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid couponId and remove the Coupon from the scope', inject(function(Coupons) {
			// Create new Coupon object
			var sampleCoupon = new Coupons({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Coupons array and include the Coupon
			scope.coupons = [sampleCoupon];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/coupons\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCoupon);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.coupons.length).toBe(0);
		}));
	});
}());