let ddpClient = require('./lib/ddpClient');

let ListsDB = {};

ListsDB.subscribeToLists = () => {
  return ddpClient.subscribe('publicLists', [])
    .then(() => {
      return ddpClient.subscribe('privateLists', []);
    });
};

ListsDB.observeLists = (cb) => {
  let observer = ddpClient.connection.collections.observe(() => {
    return ddpClient.connection.collections.lists.find();
  });

  observer.subscribe((results) => {
    cb(results);
  });
};

// ListsDB.getLists = (userId) => {
//   return new Promise(function (resolve, reject){
//     resolve(ddpClient.connection.collections.lists.find());
//   });
// };

ListsDB.addNewList = (listName) => {
  return ddpClient.call('Lists.insert', [false, listName]);
};

ListsDB.changeListVisibility = (listId, userId) => {
  let mod = {$unset: {userId: true}};

  if (userId) {
    mod = {$set: {userId: userId}};
  }

  return ddpClient.call('Lists.update', [listId, mod]);
};

ListsDB.deleteList = (listId) => {
  let todosColl = ddpClient.connection.collections.todos;
  if (todosColl) {
    let todos = todosColl.find();
    for (var i = 0; i < todos.length; i++) {
      ddpClient.call('Todos.remove', [todos[i]._id]);
    }
  }

  return ddpClient.call('Lists.remove', [listId]);
};

module.exports = ListsDB;
