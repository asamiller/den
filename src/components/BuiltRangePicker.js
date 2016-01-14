'use strict';

import React from 'react-native';
var {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} = React;

import globalStyles from './SearchGlobalStyles.js';
import YearPicker from './YearPicker.js';

var BuiltRangePicker = React.createClass({

  getDefaultProps: function () {
    return {
      onChange: function () {},
      value: []
    };
  },

  render: function() {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.label}>Built Between</Text>
        <View style={globalStyles.innerBox}>
          <YearPicker label='Earliest Date' onChange={this.handleStartChange} value={this.props.value[0]} />
          <YearPicker label='Latest Date' onChange={this.handleEndChange} value={this.props.value[1]} />
        </View>
      </View>
    );
  },

  handleStartChange: function (value) {
    this.props.onChange('builtRange', [value, this.props.value[1]]);
  },

  handleEndChange: function (value) {
    this.props.onChange('builtRange', [this.props.value[0], value]);
  }
});

var styles = StyleSheet.create({
  divider: {
    height: 20,
    width: 1,
    backgroundColor: '#ccc'
  },
});

module.exports = BuiltRangePicker;
