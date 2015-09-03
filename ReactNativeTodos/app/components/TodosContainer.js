let React = require('react-native');
let {
  View,
  Text
} = React;

let Todos = require('./Todos');
let ddp = require('../config/ddp');

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

  // Could be refactored
  _handleCheck(_id) {
    var newTodos = [];
    this.state.todos.map((todo) => {
      if (todo._id === _id) {
        todo.checked = !todo.checked;
      }
      newTodos.push(todo);
    });
    this.setState({todos: newTodos})
  },

  render() {
    return <Todos todos={this.state.todos} handleCheck={this._handleCheck} />;
  }
});

module.exports = TodosContainer;
