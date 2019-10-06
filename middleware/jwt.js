var jwt = require('jsonwebtoken');
var config = require('../config/config');

function checkJwt() {
  return (req, res, next) => {
    var token = req.query.token;
    
    jwt.verify(token,config.TOKEN_SEED, (error, decoded) => {
      if(error) {
        return res.status(401).json({
          ok: false,
          msg: error
        });
      }
      next();
    });
  };
}

module.exports = checkJwt;