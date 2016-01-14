import React from 'react-native';
var {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} = React;

import globalVariables from '../globalVariables.js';


var NumberPickerItem = React.createClass({
  getDefaultProps: function () {
    return {
      onChange: function () {},
      value: 1,
      current: 0
    };
  },

  render: function() {
    var selectedBox = {};
    var selectedText = {};

    if (this.props.value == this.props.current) {
      selectedBox.borderColor = globalVariables.green;
      selectedText.color = globalVariables.green;
      selectedText.fontSize = 24;
    }

    return (
      <TouchableOpacity onPress={this.handleChange}>
        <View style={[styles.container, selectedBox]}>
          <Text style={[styles.text, selectedText]}>{this.props.value}</Text>
        </View>
      </TouchableOpacity>
    );
  },

  handleChange: function () {
    this.props.onChange(this.props.value);
  }
});



var styles = StyleSheet.create({
  container: {
    // padding: 20,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 20,
    width: 40,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },

  text: {
    flex: 1,
    fontSize: 20,
    fontWeight: '200',
    color: globalVariables.textColor,
    textAlign: 'center',
  },
});


module.exports = NumberPickerItem;

