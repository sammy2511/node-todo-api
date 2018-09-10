const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,Client) => {
  if(err){
    return console.log('Unable to connect Mongodb server');
  }
  console.log('Connected to Mongodb Server');
  const db = Client.db('TodoApp');

//DeleteMany
// db.collection('Todo').deleteMany({text:'Learn SOmething'},(err,results) => {
//   if(err){
//     return console.log('Unable to Delete',err);
//   }
//     console.log(JSON.stringify(results,undefined,2));
// });

//DeleteOne
// db.collection('Todo').deleteOne({text:'Do some work'},(err,results) => {
//   if(err){
//     return console.log('Unable to Delete',err);
//   }
//   console.log(JSON.stringify(results,undefined,2));
// });

//findOneAndDelete
// db.collection('Todo').findOneAndDelete({text:'sleep'},(err,results) => {
//   if(err){
//     return console.log('Unable to Delete',err);
//   }
//   console.log(JSON.stringify(results,undefined,2));
// });

//DeleteMany
db.collection('Users').deleteMany({name:'Samar'}).then((results) => {
  console.log(results);
});

//Find by Id and Delete
// db.collection('Users').find({name:'Sammy'}).toArray((err,docs) => {
//   if(err){
//     return console.log('Unable to Fetch Docs',err);
//   }
//   var objectId = docs[0]._id;
//   db.collection('Users').deleteOne({_id:new ObjectID(objectId)}).then((results) => {
//     console.log(results);
//   });
// });


  //Client.close();
});
