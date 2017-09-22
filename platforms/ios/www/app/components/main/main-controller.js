"use strict";

angular.module("ngapp").controller("MainController", function(shared, $state, $scope, $http, $mdSidenav, $mdComponentRegistry){


    var ctrl = this;

    this.auth = shared.info.auth;

    this.toggle = angular.noop;

    this.title = $state.current.title;


    this.isOpen = function() { return false };
    $mdComponentRegistry
    .when("left")
    .then( function(sideNav){
      ctrl.isOpen = angular.bind( sideNav, sideNav.isOpen );
      ctrl.toggle = angular.bind( sideNav, sideNav.toggle );
    });

    this.toggleRight = function() {
    $mdSidenav("left").toggle()
        .then(function(){
        });
    };

    this.close = function() {
    $mdSidenav("right").close()
        .then(function(){
        });
    };
	
	//var baseURL = "http://www.liquery.com:8080/LiqueryAPI/GetProduct?search=" + search + "&postalcode=" + postalcode";
	var baseURL = "https://www.liquery.com:8443/LiqueryAPI/GetProduct?search=";

	$scope.products = []
	$scope.totalItems = 0;
	$scope.mindistance = 0.0;
	$scope.mindistanceint = 0;
	$scope.search = "";
	$scope.postalcode = "";

	$scope.getProducts = function(value) {
		var search = $scope.search;
		var postalcode = $scope.postalcode;
		var radius = $scope.radius;
		var url = baseURL + search + "&postalcode=" + postalcode + "&radius=" + radius + "&order=avgpercent desc";
		console.log(url);
		$http.get(url).then(function (response) {
			if (angular.isUndefined(response.data.products[0])) {
				console.log("No results.");
				$scope.products = [];
				$scope.totalItems = 0; 
			}
			else {
				$scope.products = response.data.products;
				$scope.mindistance = response.data.mindistance;
				$scope.mindistanceint = response.data.mindistanceint;
				//$scope.radius = response.data.mindistanceint;
				//$scope.radius = response.data.mindistance;
				$scope.totalItems = $scope.products.length;	
				console.log($scope.products.length + " results.");
			}
		});
	}
	
	$scope.getLocation = function(position) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {

					var url = "https://www.liquery.com:8443/LiqueryAPI/GetPostalCode/code?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
		  $http.get(url).then(function (response) {
					if (angular.isUndefined(response.data[0])) {
						console.log("No results.");
					}
					else {
						$scope.postalcode = response.data[0].code;	
						$scope.getProducts();
					}
				});		  
			});
		}
	}
	
	$scope.getLocation();	
	
	$scope.distances = [ 5, 10, 25, 50 ];
});
