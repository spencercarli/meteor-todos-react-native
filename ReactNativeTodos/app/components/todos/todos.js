import React from 'react-native';
import {
  TouchableHighlight,
  ListView
} from 'react-native';

let TodoItem = require('./todoItem');
let TodoItemAdd = require('./todoItemAdd');

let TodosDB = require('../../config/db/todos');

export default React.createClass({
  // Configuration
  displayName: 'Todos',
  propTypes: {
    listId: React.PropTypes.string
  },

  // Initial Value (State and Props)
  getInitialState() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      todos: ds.cloneWithRows([]),
    };
  },

  // Component Lifecycle
  componentWillMount() {
    let listId = this.props.listId;
    TodosDB.subscribeToTodos(listId)
      .then(() => {
        TodosDB.observeTodos(listId, (results) => {
          this.setState({todos: this.state.todos.cloneWithRows(results)});
        });
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  },

  // Sub-render
  renderItem(todo) {
    return <TodoItem todo={todo} key={todo._id} />;
  },

  // Component Render
  render() {
    return (
      <ListView
        dataSource={this.state.todos}
        renderRow={this.renderItem}
        />
    );
  }
});
