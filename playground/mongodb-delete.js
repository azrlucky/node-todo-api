const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if (err) {
    return console.log('Unable to connect Mongo DB server');
  }
  console.log('Connected to Mongo DB server');

  // Delete many
  // db.collection('Todos').deleteMany({text: 'Go poop'}).then((result) => {
  //   console.log(result);
  // });

  // Delete one
  // db.collection('Todos').deleteOne({ text: "Go poop"}).then((result) => {
  //   console.log(result);
  // });

  // Find one and delete
  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    console.log(result);
  })


  //db.close();
});
