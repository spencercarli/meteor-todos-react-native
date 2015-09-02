let React = require('react-native');
let {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} = React;

let Layout = React.createClass({
  propTypes: {
    lists: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      lists: []
    }
  },

  renderListRow(list) {
    return (
      <TouchableOpacity key={list.name}>
        <View style={styles.row}>
          <Text style={styles.listName}>{list.name}</Text>
        </View>
      </TouchableOpacity>
    );
  },

  render() {
    let listItems = [];
    listItems = this.props.lists.map(this.renderListRow);

    return (
      <ScrollView style={styles.container}>
        {listItems}
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
    borderBottomColor: 'black'
  },
  listName: {
    fontSize: 16,
    fontWeight: '300'
  }
});

module.exports = Layout;
