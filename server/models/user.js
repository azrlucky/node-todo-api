var mongoose = require('mongoose');

var User = mongoose.model('user', {
  email: {
    type: String,
    minlength: 1,
    require: true,
    trim: true
  }
});

module.exports = {
  User
};
