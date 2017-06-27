const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if (err) {
    return console.log('Unable to connect Mongo DB server');
  }
  console.log('Connected to Mongo DB server');

//   db.collection('Todos').insertOne({
//     text: 'Some text to do',
//     completed: false
//   }, (err, result) => {
//     if(err) {
//       return console.log('Unable to insert Todo', err);
//     }
//
//     console.log(JSON.stringify(result.ops,undefined, 3));
//   });
  // db.collection('Users').insertOne({
  //   name: 'Ajeetesh Roy',
  //   age: 25,
  //   location: 'Patna'
  // } , (err, result) => {
  //   if(err) {
  //     return console.log('Unable to insert to Users Collection', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 3));
  // });

  db.close();
});
