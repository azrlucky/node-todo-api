const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'Test todo 1'
}, {
  _id: new ObjectID(),
  text: 'Test todo 2',
  completed: true,
  completedAt: 333
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
   it('should create a new todo item.', (done) => {
     var text = 'test todo string';

     request(app)
     .post('/todos')
     .send({ text  })
     .expect(200)
     .expect((res) => {
       expect(res.body.text).toBe(text);
     })
     .end((err, res) => {
       if(err) {
         return done(err);
       }

       Todo.find({text}).then((todos) => {
         expect(todos.length).toBe(1);
         expect(todos[0].text).toBe(text);
         done();
       }).catch((e) => done(e));
     });
   });

   it('should not create todo item with invalid data', (done) => {
     request(app)
     .post('/todos')
     .send({})
     .expect(400)
     .end((err, res) => {

       if(err) {
         return done();
       }

       Todo.find().then((todos) => {
         expect(todos.length).toBe(2);
         done();
       }).catch((e) => done(e));
     });

   });

});

describe('GET /todos', () => {
  it('should fetch all todo items', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should fetch the todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id}`)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return 404 for id not found', (done) => {
    var id = new ObjectID();
    request(app)
    .get(`/todos/${id}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 for invalid id', (done) => {
    request(app)
    .get('/todos/1345')
    .expect(404)
    .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should delete the todo doc', (done) => {
    request(app)
    .delete(`/todos/${todos[0]._id}`)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end((err, res) => {
      if(err) {
        return done(err);
      }

      Todo.find({text: todos[0].text}).then((todos) => {
        expect(todos.length).toBe(0);
        done();
      }).catch((e) => done(e));
    });
  });

  it('should return 404 for id not found', (done) => {
    var id = new ObjectID();
    request(app)
    .delete(`/todos/${id}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 for invalid id', (done) => {
    request(app)
    .delete('/todos/1345')
    .expect(404)
    .end(done);
  });

});

describe('PATCH /todos/:id', () => {

  it('should Upadte the todo to completed true', (done) => {
    request(app)
    .patch(`/todos/${todos[0]._id}`)
    .send({ completed: true })
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end((err, res) => {
      if(err) {
        return done(err);
      }

      Todo.find({text: todos[0].text}).then((todo) => {
        expect(todo[0].completed).toBe(true);
        expect(todo[0].completedAt).toNotBe(null);
        done();
      }).catch((e) => done(e));
    });
  });

  it('should Upadte the todo to completed true', (done) => {
    request(app)
    .patch(`/todos/${todos[1]._id}`)
    .send({ completed: false })
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[1].text);
    })
    .end((err, res) => {
      if(err) {
        return done(err);
      }

      Todo.find({text: todos[1].text}).then((todo) => {
        expect(todo[0].completed).toBe(false);
        expect(todo[0].completedAt).toBe(null);
        done();
      }).catch((e) => done(e));
    });
  });

  it('should return 404 for id not found', (done) => {
    var id = new ObjectID();
    request(app)
    .delete(`/todos/${id}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 for invalid id', (done) => {
    request(app)
    .delete('/todos/1345')
    .expect(404)
    .end(done);
  });

});
