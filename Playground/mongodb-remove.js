const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,Client) => {
  if(err){
    return console.log('Unable to connect Mongodb server');
  }
  console.log('Connected to Mongodb Server');
  const db = Client.db('TodoApp');

  // db.collection('Todo').findOneAndUpdate(
  //   {
  //     _id:new ObjectID('5b967f48368dce37c0ae4d9b')
  //   },
  // { $set:{
  //     completed:true
  //   }},
  //   {
  //     returnOriginal: false
  //   }
  // ).then((results) => {
  //   console.log(results);
  // });

  db.collection('Users').findOneAndUpdate(
    {
      _id:new ObjectID('5b964d058166ea20746eb1b3')
    },
    {
      $set:{name:'Sammy'},
      $inc:{age:2}
    },
    {
      returnOriginal : false
    }
  ).then((results) => {
    console.log(results);
  })



  //Client.close();
});
