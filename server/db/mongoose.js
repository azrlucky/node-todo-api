var mongoose = require('mongoose');
var connectionString = 'mongodb://azr:test123@ds141232.mlab.com:41232/todo-app';
var env = process.env.NODE_ENV || 'development';

if (env === 'developmet') {
  connectionString = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  connectionString = 'mongodb://localhost:27017/TodoAppTest';
}
mongoose.Promise = global.Promise;
mongoose.connect(connectionString);

module.exports = {
  mongoose
}
