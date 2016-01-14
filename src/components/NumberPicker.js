import React from 'react-native';
const {
  StyleSheet,
  Text,
  View,
  SliderIOS
} = React;

import globalStyles from './SearchGlobalStyles.js';
import NumberPickerItem from './NumberPickerItem.js';

const NumberPicker = React.createClass({

  getDefaultProps() {
    return {
      onChange() {},
      label: 'Bedrooms (at least)',
      value: 1,
      varName: 'bedrooms'
    };
  },

  render() {
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

  handleChange(value) {
    this.props.onChange(this.props.varName, value);
  }
});



const styles = StyleSheet.create({

});


export default NumberPicker;

