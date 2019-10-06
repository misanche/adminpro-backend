var express = require('express');
var bcrypt = require('bcryptjs');

var app = express();

var User = require('../models/user');
var checkJwt = require('../middleware/jwt');

// List Users
app.get('/', (req, res, next) => {
  var users = User.find({},
    'name, email img role')
    .exec(
      (error, users) => {
        if (error) {
          return res.status(500).json(
            {
              ok: false,
              msgs: error
            });
        }

        return res.status(200).json(
          {
            ok: true,
            users: users
          });
      }
    );
});

// Update User
app.put('/:id', checkJwt(), (req, res, next) => {
  var id = req.params.id;
  var body = req.body;

  User.findById(id,(error, user) => {
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
          msgs: ["User does not exist"]
        });
    }

    user.name = body.name;
    user.email = body.email;
    user.role = user.role;

    user.save((error, userSaved) => {
      if (error) {
        return res.status(400).json(
          {
            ok: false,
            msgs: error
          });
      }
      return res.status(201).json({
        ok: true,
        user: userSaved
      });
    });

  });
  
  

});

// Delete user
app.delete('/:id', checkJwt(), (req,res,next) => {
  var id = req.params.id;
  User.findByIdAndRemove(id, (error, userDeleted) => {
    if (error) {
      return res.status(500).json(
        {
          ok: false,
          msgs: error
        });
    }
    if (!userDeleted) {
      return res.status(400).json(
        {
          ok: false,
          msgs: ['User does not exists']
        });
    }
    return res.status(200).json({
      ok: true,
      user: userDeleted
    });
  });
});

// Create User
app.post('/', checkJwt(), (req, res, next) => {

  var body = req.body;
  var user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    img: body.img,
    role: body.role
  });
  user.save((error, userCreated) => {
    if (error) {
      return res.status(400).json(
        {
          ok: false,
          msgs: error
        });
    }
    return res.status(201).json({
      ok: true,
      user: userCreated
    });
  });

});

module.exports = app;