'use strict';

// Deals controller
angular.module('deals').controller('DealsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Deals',
	function($scope, $stateParams, $location, Authentication, Deals) {
		$scope.authentication = Authentication;

		// Create new Deal
		this.create = function() {
			// Create new Deal object
			var deal = new Deals ({

				title: this.title,
				details: this.details,
				retailer: this.retailer,
				price: this.price,
				image: this.image,
				urlimage: this.urlimage,
				tags: this.tags,
				startdate: this.startdate,
				enddate: this.enddate

			});

			// Redirect after save
			deal.$save(function(response) {
				$location.path('deals/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Deal
		$scope.remove = function(deal) {
			if ( deal ) {
				deal.$remove();

				for (var i in $scope.deals) {
					if ($scope.deals [i] === deal) {
						$scope.deals.splice(i, 1);
					}
				}
			} else {
				$scope.deal.$remove(function() {
					$location.path('deals');
				});
			}
		};

		// Update existing Deal
		$scope.update = function() {
			var deal = $scope.deal;

			deal.$update(function() {
				$location.path('deals/' + deal._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Deals
		$scope.find = function() {
			$scope.deals = Deals.query();
		};

		// Find existing Deal
		$scope.findOne = function() {
			$scope.deal = Deals.get({
				dealId: $stateParams.dealId
			});
		};
	}
]);
