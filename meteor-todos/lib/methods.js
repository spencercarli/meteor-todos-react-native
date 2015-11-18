Meteor.methods({
  'Lists.insert': function(isPrivate, listName) {
    var list = {
      name: listName || Lists.defaultName(),
      incompleteCount: 0
    };

    if (isPrivate) {
      list.userId = this.userId;
    }

    return Lists.insert(list);
  },

  'Lists.update': function(_id, modifier) {
    return Lists.update(_id, modifier);
  },

  'Lists.remove': function(_id) {
    return Lists.remove(_id);
  },

  'Todos.insert': function(data) {
    return Todos.insert(data);
  },

  'Todos.update': function(_id, modifier) {
    return Todos.update(_id, modifier);
  },

  'Todos.remove': function(_id) {
    return Todos.remove(_id);
  },

  'Users.create': function(email, password) {
    return Accounts.createUser({email: email, password: password});
  }
});
