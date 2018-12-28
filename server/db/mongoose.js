var mongoose = require('mongoose');


//latest versions of mongoose doesn't required global promiseo
mongoose.Promise = global.Promise;


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = { mongoose }
  
