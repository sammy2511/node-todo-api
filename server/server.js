var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
const port = process.env.PORT || 3000;
var app = express();

//middleware
app.use(bodyParser.json());


//route to POST
app.post('/todos',(req,res) => {
  console.log(req.body);
  var todo = new Todo({
    text:req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  },(err) => {
    res.status(400).send(err);
  });
});


//route to GET todos
app.get('/todos',(req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  },(err) => {
    res.status(400).send(err);
  });
});

//route to GET todos by ID
app.get('/todos/:id',(req,res) => {
  var id = req.params.id;

  //if not Valid ID
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  //find by ID
  Todo.findById(id).then((todo) => {
    if (todo) {
      res.send(todo);
    }
    else{
      res.status(404).send();
    }
  },(e) => {
    res.status(400).send();
  });
});


//route to DELETE todo by ID
app.delete('/todos/:id',(req,res) => {
  var id = req.params.id;

  //if not Valid ID
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  //find by ID and DELETE
  Todo.findByIdAndRemove(id).then((todo) => {
    if(todo){
      res.send(todo);
    }
    else {
        return res.status(404).send();
    }
  }).catch((e) => {
    res.status(400).send();
  });
});


//starting server
app.listen(port,() => {
  console.log(`Started on port ${port}`);
})
