//app.js
var express = require('express');
var bodyParser = require('body-parser');
var product = require('./routes/product'); // Imports routes for the products
var app = express();

// Set up mongoose connection
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

app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.send('Greetings from the Poorna Rao!');
});
var port = 5000;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});