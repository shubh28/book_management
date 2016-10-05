var bms = angular.module('bms',['ngRoute']);

bms.config(function($routeProvider){
	$routeProvider

		.when('/',{
			templateUrl : 'pages/home.html',
			controller : 'mainController'
		})

		.when('/books',{
			templateUrl : 'pages/all_books.html',
			controller : 'booksController'
		})

		.when('/add',{
			templateUrl : 'pages/add_book.html',
			controller : 'addController'
		})

		.when('/book/:id',{
			templateUrl : 'pages/product.html',
			controller : 'productController'
		});
});


bms.controller('mainController', ['$scope', function ($scope) {
	
}]);

bms.controller('booksController', ['$scope','$http', function ($scope,$http) {
	$http({
		method : 'GET',
		url : '//localhost:3000/api/books'
	}).then(function(res){
		$scope.books = res.data;
	},function(res){
		console.log(res);
	});
}]);

bms.controller('productController', ['$scope','$http','$routeParams', function ($scope,$http,$routeParams) {
	var id = $routeParams.id;
	$http({
		method : 'GET',
		url : '//localhost:3000/api/books/'+id
	}).then(function(res){
		$scope.product = res.data;
	},function(res){
		console.log(res);
	});
}]);

bms.controller('addController', ['$scope','$http', function ($scope,$http) {
	$scope.book = {};
	$scope.addBook = function(){
		$http({
			method : 'POST',
			url : '//localhost:3000/api/books/',
			data : $scope.book,
			headers : {'Content-Type': 'application/json'}
		}).success(function(res){
			$scope.book = {};
		});
	};
}]);