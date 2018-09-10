var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

//middleware
app.use(bodyParser.json());


//route to POST
app.post('/todos',(req,res) => {
  console.log(req.body);
})



//starting server
app.listen(3000,() => {
  console.log('Server started on port 3000');
})
