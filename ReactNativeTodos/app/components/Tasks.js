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

let Lists = React.createClass({
  propTypes: {
    tasks: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      tasks: []
    }
  },

  renderTaskRow(task) {
    let icon = openImage;
    if (task.checked) {
      icon = checkedImage;
    }

    return (
      <View style={styles.row} key={task._id}>
        <TouchableWithoutFeedback onPress={() => this.props.handleCheck(task._id)}>
          <Image style={styles.statusIcon} source={icon}/>
        </TouchableWithoutFeedback>
        <Text style={styles.listName}>{task.name}</Text>
      </View>
    );
  },

  render() {
    let taskItems = [];
    taskItems = this.props.tasks.map(this.renderTaskRow);

    return (
      <ScrollView style={styles.container}>
        {taskItems}
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

module.exports = Lists;
