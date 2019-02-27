var gtaa= angular.module("myApp",['ngRoute']);
gtaa.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/',{
		templateUrl:'html/dashboard.html',
		controller : 'dashboardCtrl'
	})
	.when('/admin',{
		templateUrl:'html/AdminConsole.html',
		controller:'adminConsole'
	})
	.when('/operator',{
		templateUrl:'html/OperationConsole.html',
		controller:'operationConsole'
	})
	.when('/passenger_console',{
		templateUrl:'html/passenger_console.html',
		controller:'passengerConsole'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);

gtaa.factory('myURL', function($http) {
	var myURL = {
		async : function() {
			var promise = $http.get('url.txt').then(
					function(response) {
						return response.data[0].url;
					});
			
			return promise;
		}
	};
	return myURL;
});

/*$(document).on('click','.fa-noti-icon',function(){
	console.info('hi');
	$('.notification_details').toggle();
});*/