//app.js
var express     = require('express');
var bodyParser  = require('body-parser');
var product     = require('./routes/product'); // Imports routes for the products
var jwt         = require('jsonwebtoken'); // used to create, sign, and verify tokens
var user        = require('./routes/user');
var config      = require('./config');

var app = express();
var apiRoutes = express.Router();

app.set('superSecret', config.secret);

// Set up mongoose connection for database
var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI || config.database;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

apiRoutes.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      // if there is no token return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
    }
});
apiRoutes.use('/product', product);
apiRoutes.use('/user',user);

apiRoutes.get('/', function(req, res) {
	res.send('Greetings from Developer!');
});

app.use('/api', apiRoutes);
//This process.env for heroku deployment
var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});