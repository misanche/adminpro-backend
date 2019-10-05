var express = require('express');
var mongoose = require('mongoose');
// Initialize variables
var app = express();

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

// Routes
app.get('/', (req, res, next) => {
  res.status(200).json(
    {
      status: true,
      msg:'Works!'
    });
  next();
});
