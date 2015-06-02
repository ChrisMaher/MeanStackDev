'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.alerts = [

			{

			icon : 'glyphicon-user',
			colour: 'btn-success',
			total: '20,408',
			description: 'Total Customers'

			},

            {

                icon : 'glyphicon-calendar',
                colour: 'btn-primary',
                total: '8,382',
                description: 'Upcoming Events'

            },

            {

                icon : 'glyphicon-edit',
                colour: 'btn-success',
                total: '20,527',
                description: 'New Customers in 24h'

            },

            {

                icon : 'glyphicon-record',
                colour: 'btn-info',
                total: '23,000',
                description: 'Emails Sent'

            },

            {

                icon : 'glyphicon-eye-open',
                colour: 'btn-warning',
                total: '568',
                description: 'Follow Ups Required'

            },

            {

                icon : 'glyphicon-flag',
                colour: 'btn-danger',
                total: '348',
                description: 'Referrals To Moderate'

            },

		];
	}
]);
