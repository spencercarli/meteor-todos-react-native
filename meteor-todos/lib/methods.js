Meteor.methods({
  'Lists.insert': function(data) {
    return Lists.insert(data);
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
  }
});
