angular.module('ExpenseCtrl', []).controller('ExpenseCtrl', function($scope, $http) {

  $http.get('/api/expense').then(function(items) {
    // Get initial list of expenses
    $scope.expenses = items.data;
  });
  
  $scope.save = function(expense) {
    // Send expense to API for processing
    $http.post('/api/expense', expense).then(addExpense);
  }

  $scope.remove = function(expense, id) {
    // path to send to api
    var path = '/api/expense/'+id;

    // make delete request to api
    $http.delete(path);

    //remove from view
    removeExpense(expense);
  }

  function addExpense(expense) {
    // Add expense to view
    $scope.expenses.push(expense.data);
    
    // Clear addition form
    $scope.expense = null;
  }

  function removeExpense(expense) {
    // remove expense from view
    $scope.expenses.splice($scope.expenses.indexOf(expense), 1);
  }

});