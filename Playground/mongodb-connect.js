const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,Client) => {
  if(err){
    return console.log('Unable to connect Mongodb server');
  }
  console.log('Connected to Mongodb Server');
  const db = Client.db('TodoApp');

  // db.collection('Todo').insertOne({
  //   text:'Learn SOmething',
  //   completed:false
  // },(err,results) => {
  //   if(err){
  //     return console.log('Unable to Insert Document',err);
  //   }
  //   console.log(JSON.stringify(results.ops,undefined,2));
  // });

  // db.collection('Users').insertOne({
  //   name:'Samar',
  //   age:24,
  //   location:'Indore'
  // },(err,results) => {
  //   if(err){
  //     return console.log('Unable to insert in Users',err);
  //   }
  //   console.log(JSON.stringify(results.ops,undefined,2));
  // })


  Client.close();
});
