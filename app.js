var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var mainRoute = require('./routes/app');
var userRoutes = require('./routes/user');
var loginRoutes = require('./routes/login');

// Initialize variables
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Connection to database
mongoose.connect('mongodb://localhost:27017/hospitalDB', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;

db.on('error', (error) => {
  if(error) throw error;
});

db.once('open', function() {
  console.log("Database Connected");
  // Listen requests
  app.listen(3000, () => {
    console.log("Express Server running on Port: \x1b[32m%s\x1b[0m",3000);
  });
});

app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use(mainRoute);

