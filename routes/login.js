var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

var app = express();

var User = require('../models/user');

// Login User
app.post('/', (req, res) => {
  var body = req.body;
  User.findOne({email: body.email}, (error, user) => {

    if (error) {
      return res.status(500).json(
        {
          ok: false,
          msgs: error
        });
    }
    if (!user){
      return res.status(400).json(
        {
          ok: false,
          msgs: ["User email does not exist"]
        });
    }
    
    if(bcrypt.compareSync(body.password, user.password)) {
      user.password = null;
      var token = jwt.sign(
          {user}, 
          config.TOKEN_SEED, 
          { expiresIn:14400}
        );
      return res.status(200).json({
        ok: true,
        token,
        user,
        id: user.id
      });
    } else {
      return res.status(400).json(
        {
          ok: false,
          msgs: ["Email/ Password Incorrect"]
        });
    }
    
  });
  
});



module.exports = app;