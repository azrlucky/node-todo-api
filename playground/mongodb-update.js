const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if (err) {
    return console.log('Unable to connect Mongo DB server');
  }
  console.log('Connected to Mongo DB server');

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID("5942bc984d1b4fadd31588c3")
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  //db.close();
});
