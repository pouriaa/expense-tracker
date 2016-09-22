// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
    // Single page app
    .when('/', {
        templateUrl: 'view/expense_table.html',
        controller: 'ExpenseCtrl'
    })

  $locationProvider.html5Mode(true);

}]);