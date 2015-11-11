let React = require('react-native');
let {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} = React;

let openImage = require("../images/open/open.png");
let checkedImage = require("../images/checked/checked.png");

let Todos = React.createClass({
  displayName: 'Todos',

  propTypes: {
    todos: React.PropTypes.array,
    handleCheck: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      todos: []
    }
  },

  renderTodoRow(todo) {
    let icon = openImage;
    if (todo.checked) {
      icon = checkedImage;
    }

    return (
      <View style={styles.row} key={todo._id}>
        <TouchableWithoutFeedback onPress={() => this.props.handleCheck(todo._id)}>
          <Image style={styles.statusIcon} source={icon}/>
        </TouchableWithoutFeedback>
        <Text style={styles.todoText}>{todo.text}</Text>
      </View>
    );
  },

  renderNoTodosFound() {
    return (
      <View style={styles.row} key="no-todos">
        <Text style={styles.todoText}>No Todos Found</Text>
      </View>
    );
  },

  render() {
    let todoItems = [];
    if (this.props.todos.length) {
      todoItems = this.props.todos.map(this.renderTodoRow);
    } else {
      todoItems.push(this.renderNoTodosFound());
    }

    return (
      <ScrollView style={styles.container} automaticallyAdjustContentInsets={false}>
        {todoItems}
      </ScrollView>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    padding: 15,
    borderBottomWidth: 1 / React.PixelRatio.get(),
    borderBottomColor: '#d2edf4',
    flexDirection: 'row'
  },
  todoText: {
    fontSize: 16,
    fontWeight: "400",
    color: '#666'
  },
  statusIcon: {
    marginRight: 15
  }
});

module.exports = Todos;
