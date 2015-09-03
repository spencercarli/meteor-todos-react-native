let React = require('react-native');
let {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} = React;

let openImage = require("image!open");
let checkedImage = require("image!checked");

let Todos = React.createClass({
  propTypes: {
    todos: React.PropTypes.array
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
        <Text style={styles.listName}>{todo.text}</Text>
      </View>
    );
  },

  render() {
    let todoItems = [];
    todoItems = this.props.todos.map(this.renderTodoRow);

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
    borderBottomColor: 'black',
    flexDirection: 'row'
  },
  listName: {
    fontSize: 16,
    fontWeight: '300'
  },
  statusIcon: {
    marginRight: 15
  }
});

module.exports = Todos;
