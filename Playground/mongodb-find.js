const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,Client) => {
  if(err){
    return console.log('Unable to connect Mongodb server');
  }
  console.log('Connected to Mongodb Server');
  const db = Client.db('TodoApp');

  // db.collection('Todo').find().toArray().then((docs) => {
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err) => {
  //   console.log('Unable to fetch Docs',err);
  // });

  db.collection('Users').find({name:'Samar'}).toArray((err,docs) => {
    if(err){
      return console.log('Unable to Fetch Docs',err);
    }
    console.log(JSON.stringify(docs,undefined,2));
  })



  Client.close();
});
