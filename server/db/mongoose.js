var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var connectionString = process.env.PORT? 'mongodb://azr:test123@ds141232.mlab.com:41232/todo-app' : 'mongodb://localhost:27017/TodoApp'
mongoose.connect(connectionString);

module.exports = {
  mongoose
}
