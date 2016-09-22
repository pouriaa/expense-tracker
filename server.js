// BASE SETUP
// =============================================================================

// call the packages we need
var express         = require('express');        
var app             = express();                 
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

// configure app to use bodyParser()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 


// Routing
var router = express.Router();  // get an instance of the express Router
require('./app/routes')(app, router);   // configure our routes


// START THE SERVER
var port = process.env.PORT || 8080;
app.listen(port);
console.log('On locahost:' + port);