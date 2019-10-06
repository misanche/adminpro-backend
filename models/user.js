var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var validRoles = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} is not an allowed role'
};

var userSchema = new Schema({
  name: { type: String, required: [true, 'The name is required']},
  email: { type: String, unique: true, required: [true, 'The email is required']},
  password: { type: String, required: [true, 'The password is required']},
  img:  { type: String, required: false },
  role: { type: String, required: true, default: 'USER_ROLE', enum: validRoles }
});

userSchema.plugin(uniqueValidator, { message: '{PATH} needs to be unique'});
module.exports = mongoose.model('User', userSchema);