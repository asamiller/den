import React from 'react-native';
const {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} = React;

import globalStyles from './SearchGlobalStyles.js';
import YearPicker from './YearPicker.js';

const BuiltRangePicker = React.createClass({

  getDefaultProps() {
    return {
      onChange() {},
      value: []
    };
  },

  render() {
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

  handleStartChange(value) {
    this.props.onChange('builtRange', [value, this.props.value[1]]);
  },

  handleEndChange(value) {
    this.props.onChange('builtRange', [this.props.value[0], value]);
  }
});

const styles = StyleSheet.create({
  divider: {
    height: 20,
    width: 1,
    backgroundColor: '#ccc'
  },
});

export default BuiltRangePicker;
