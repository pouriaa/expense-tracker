var expenseController = require('./ExpenseController');

module.exports = function(app, router) {
  // RESTful API routes
  // Unspecified resource routes
  router.route('/expense')
    .post(function(req,res) {
      expenseController.post(req.body, res);
    })
    .get(function(req, res) {
      expenseController.getAll(res);    
    });

  // Specified resource routes
  router.route('/expense/:expense_id')
    .get(function(req, res) {
      expenseController.get(res, req.params.expense_id);    
    })
    .put(function(req, res) {
      expenseController.put(req.params.expense_id, req.body, res);    
    })
    .delete(function(req, res) {
      expenseController.remove(req.params.expense_id, res);          
    });

  // all of our routes will be prefixed with /api
  app.use('/api', router);	
}