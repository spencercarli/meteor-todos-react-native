let ddpClient = require('./lib/ddpClient');
let _ = require('underscore');

let TodosDB = {};

TodosDB.subscribeToTodos = (listId) => {
  return ddpClient.subscribe('todos', [listId]);
};

TodosDB.observeTodos = (listId, cb) => {
  let observer = ddpClient.connection.collections.observe(() => {
    let collection = ddpClient.connection.collections.todos;
    if (collection) {
      return collection.find({listId: listId});
    } else {
      return [];
    }
  });

  observer.subscribe((results) => {
    cb(results);
  });
};

// TodosDB.getTodos = (listId) => {
//   return new Promise(function (resolve, reject){
//     resolve(ddpClient.connection.collections.todos.find({listId: listId}));
//   });
// };

TodosDB.addTodo = (todo, listId) => {
  let todoObj = {
    listId: listId,
    text: todo,
    checked: false,
    createdAt: new Date()
  };

  let listMod = {
    $inc: {incompleteCount: 1}
  };

  return ddpClient.call('Todos.insert', [todoObj])
    .then(() => {
      return ddpClient.call('Lists.update', [listId, listMod])
    });
};

TodosDB.deleteTodo = (todo) => {
  return ddpClient.call('Todos.remove', [todo._id])
    .then(() => {
      if (!todo.checked) {
        let listMod = {$inc: {incompleteCount: -1}};
        return ddpClient.call('Lists.update', [todo.listId, listMod]);
      }
    });
};

TodosDB.changeTodoState = (todo, checked) => {
  let todoMod = {$set: {checked: checked}};
  let listMod = {$inc: {incompleteCount: checked ? -1 : 1}};

  return ddpClient.call('Todos.update', [todo._id, todoMod])
    .then(() => {
      return ddpClient.call('Lists.update', [todo.listId, listMod]);
    });
};

module.exports = TodosDB;
