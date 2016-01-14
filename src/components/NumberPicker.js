import React from 'react-native';
var {
  StyleSheet,
  Text,
  View,
  SliderIOS
} = React;

import globalStyles from './SearchGlobalStyles.js';
import NumberPickerItem from './NumberPickerItem.js';

var NumberPicker = React.createClass({

  getDefaultProps: function () {
    return {
      onChange: function () {},
      label: 'Bedrooms (at least)',
      value: 1,
      varName: 'bedrooms'
    };
  },

  render: function() {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.label}>{this.props.label}</Text>
        <View style={globalStyles.innerBox}>
          <NumberPickerItem value={1} current={this.props.value} onChange={this.handleChange} />
          <NumberPickerItem value={2} current={this.props.value} onChange={this.handleChange} />
          <NumberPickerItem value={3} current={this.props.value} onChange={this.handleChange} />
          <NumberPickerItem value={4} current={this.props.value} onChange={this.handleChange} />
          <NumberPickerItem value={5} current={this.props.value} onChange={this.handleChange} />
          <NumberPickerItem value={6} current={this.props.value} onChange={this.handleChange} />
        </View>
      </View>
    );
  },

  handleChange: function (value) {
    this.props.onChange(this.props.varName, value);
  }
});



var styles = StyleSheet.create({

});


module.exports = NumberPicker;

