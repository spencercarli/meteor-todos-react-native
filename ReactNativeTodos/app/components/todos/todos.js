import React, {
  TouchableHighlight,
  ListView
} from 'react-native';

import TodoItem from './todoItem';
import TodoItemAdd from './todoItemAdd';

import TodosDB from '../../config/db/todos';

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

  renderHeader() {
    return <TodoItemAdd listId={this.props.listId} />;
  },

  // Component Render
  render() {
    return (
      <ListView
        dataSource={this.state.todos}
        renderRow={this.renderItem}
        renderHeader={this.renderHeader}
        />
    );
  }
});
