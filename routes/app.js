var express = require('express');
var app = express();

// Routes
app.get('/', (req, res, next) => {
  res.status(200).json(
    {
      status: true,
      msg:'Works!'
    });
  next();
});

module.exports = app;