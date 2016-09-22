// config NeDB Database
var Datastore = require('nedb'), db = new Datastore({filename : 'storage/expenses'});
db.loadDatabase();

module.exports =  {

  // Save new expense
  post: function(values, res){
    
    // Use current date as date field
    values.date = new Date();

    // Construct the new object with appropriate fields
    var expenseObj = {  name: values.name,
                        date: values.date,
                        description: values.description,
                        amount: values.amount
                      };

    // insert new obj into database file
    db.insert(expenseObj, function (err, docs) {
      if (err) {
        res.send("Error: " + err.errorType);
      } else {
        res.json(docs);
      }
    });

  },

  // return all expenses
  getAll: function(res) {
    
    // find all expenses in db
    db.find({ }, function (err, docs) {
      if (err) {
        res.send("Error: " + err.errorType);
      } else {
        res.json(docs);
      }
    });
  },

  // get specified expense
  get: function(res, id) {
    
    // find expense by id
    db.find({ _id: id }, function (err, docs) {
      if (err) {
        res.send("Error: " + err.errorType);
      } else {
        res.json(docs);
      }
    });
  },

  // edit specified expense
  put: function(id, values, res) {

    // set id to be the same
    values.id = id;
    
    // update with new field values
    db.update({ _id: values.id }, {$set: {name: values.name, description: values.description, amount: values.amount}}, function (err, numReplaced, res) {
      if (err) {
        error(err);
      } else {
        okay();
      }
    });

    // return a response
    function okay() {
      res.json("Updated");
    }
    function error() {
      res.json("Error: " + err.errorType);
    }
  },

  // remove specified entry from db
  remove: function(id, res){

    // remove by id field
    db.remove({ _id: id }, {}, function (err, numRemoved) {
      if (err) {
        res.send("Error: " + err.errorType);
      } else {
        res.json(id);
      }
    });
  }
}