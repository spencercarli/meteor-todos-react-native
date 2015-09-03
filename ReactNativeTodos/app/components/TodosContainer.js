let React = require('react-native');
let {
  View,
  Text
} = React;

let Todos = require('./Todos');
let ddp = require('../config/ddp');
let _ = require('underscore');

let TodosContainer = React.createClass({
  getInitialState() {
    return {
      todos: [],
      todosObserver: null
    }
  },

  componentWillMount() {
    ddp.subscribe('todos', [this.props.list._id])
      .then(() => {
        let todosObserver = ddp.collections.observe(() => {
          return ddp.collections.todos.find({listId: this.props.list._id});
        });

        this.setState({todosObserver: todosObserver});

        todosObserver.subscribe((results) => {
          this.setState({todos: results});
        });
      });
  },

  componentWillUnmount() {
    if (this.state.todosObserver) {
      this.state.todosObserver.dispose();
    }
  },

  handleCheck(_id) {
    let todo = _.findWhere(this.state.todos, {_id: _id});

    let todoModifier = {$set: {checked: !todo.checked}};
    ddp.call('Todos.update', [_id, todoModifier]);

    let listModifier = {$inc: {incompleteCount: !todo.checked ? -1 : 1}};
    ddp.call('Lists.update', [todo.listId, listModifier]);
  },

  render() {
    return <Todos todos={this.state.todos} handleCheck={this.handleCheck} />;
  }
});

module.exports = TodosContainer;
