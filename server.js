// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');

var port     = process.env.PORT || 8080;
var http = require('http');
var path = require('path');
var passport = require('passport');
var bodyParser = require("body-parser");
var jwt      = require("jsonwebtoken");
var flash    = require('connect-flash');
var isLogin = require('./config/common');
//var cors = require('cors');
var app      = express();
// configuration ===============================================================
// connect to our database

//require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {
	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
            next();
        });
	app.set('view engine', 'ejs'); // set up ejs for templating
        app.set('views', path.join(__dirname, 'views'));
	// required for passport
	app.use(express.session({ secret: 'vidyapathaisalwaysrunning' } )); // session secret
        
        app.use(express.session({ JWT_SECRET: 'vidyapathaisalwaysrunning' } )); // session secret
        
	//app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session
       
        app.use(express.methodOverride()); 
        app.use(cors());
        app.use(express.static(path.join(__dirname, 'public')));
        
});

// routes ======================================================================


//require('./routes/users.js')(app, passport); // load our routes and pass in our app and fully configured passport
//require('./routes/installationCompany.js')(app);
//require('./routes/laborPrice.js')(app);
//require('./routes/api.js')(app);
//require('./app/laborPrice.js')(app);
//
//app.get('/installationCompany', installationCompany.index); 

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

