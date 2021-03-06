require('./config/config');

var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var {authenticate} = require('./middleware/authenticate')
const lodash = require('lodash');
const port = process.env.PORT || 3000;
var app = express();

//middleware
app.use(bodyParser.json());


//route to POST
app.post('/todos',authenticate,(req,res) => {
  var todo = new Todo({
    text:req.body.text,
    createdBy: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  },(err) => {
    res.status(400).send(err);
  });
});


//route to GET todos
app.get('/todos',authenticate,(req,res) => {
  Todo.find({
    createdBy : req.user._id
  }).then((todos) => {
    res.send({todos});
  },(err) => {
    res.status(400).send(err);
  });
});

//route to GET todos by ID
app.get('/todos/:id',authenticate,(req,res) => {
  var id = req.params.id;

  //if not Valid ID
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  //find by ID
  Todo.findOne({
    _id:id,
    createdBy:req.user._id
  }).then((todo) => {
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
app.delete('/todos/:id',authenticate,(req,res) => {
  var id = req.params.id;

  //if not Valid ID
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  //find by ID and DELETE
  Todo.findOneAndRemove({
    _id:id,
    createdBy:req.user._id
  }).then((todo) => {
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

//Update todo
app.patch('/todos/:id',authenticate,(req,res) => {
  var id = req.params.id;
  var body = lodash.pick(req.body,['text','completed']);

  //if not Valid ID
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(lodash.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate(
    {_id:id,
    createdBy:req.user._id},
    {$set:body},
    {new:true}
  ).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch(() => {
    res.status(400).send();
  });

});

//Route to Insert user
app.post('/users',(req,res) =>{
  var body = lodash.pick(req.body,['email','password']);
  var user = new User(body);

  user.save().then((doc) =>{
    return user.generateAuthToken();
  }).then( (token) => {
    res.header('x-auth',token).send(user.toJSON());
  }).catch((e) => {
    res.status(400).send();
  });


});



app.get('/users/me',authenticate,(req,res) => {
  res.send(req.user);
});

//Route to Login UserSchema
app.post('/users/login',(req,res) => {
  var body = lodash.pick(req.body,['email','password']);

  User.Login (body.email,body.password).then((user) => {
    //verify password
    return user.generateAuthToken().then((token) => {
      res.header('x-auth',token).send(user);
    })
  }).catch((e) => {
    //no user found
    res.status(401).send();
  });

});

//Route to remove token
app.delete('/users/me/token',authenticate,(req,res) => {
    req.user.removeToken(req.token).then(()=>{
      res.status(200).send();
    },() =>{
      res.status(400).send();
    });
});


//starting server
app.listen(port,() => {
  console.log(`Started on port ${port}`);
})
