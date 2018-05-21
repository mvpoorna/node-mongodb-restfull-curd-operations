//app.js
var express = require('express');
var bodyParser = require('body-parser');
var product = require('./routes/product'); // Imports routes for the products
var user = require('./routes/user');

var app = express();

// Set up mongoose connection for database
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://someuser:abcd1234@ds025583.mlab.com:25583/productstutorial';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);
app.use('/users',user);

app.get('/', function(req, res) {
	res.send('Greetings from Developer!');
});
//This process.env for heroku deployment
var port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});