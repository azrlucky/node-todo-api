const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if (err) {
    return console.log('Unable to connect Mongo DB server');
  }
  console.log('Connected to Mongo DB server');
  db.collection('Todos').find({ }).toArray().then((docs) => {
    console.log('Todos: \n');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  //db.close();
});
