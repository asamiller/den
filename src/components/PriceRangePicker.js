import React from 'react-native';
const {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} = React;

import globalStyles from './SearchGlobalStyles.js';
import PricePicker from './PricePicker.js';

const PriceRangePicker = React.createClass({

  getDefaultProps() {
    return {
      onChange() {},
      value: []
    };
  },

  render() {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.label}>Price Between</Text>
        <View style={globalStyles.innerBox}>
          <PricePicker label='Low Price' onChange={this.handleStartChange} value={this.props.value[0]} />
          <PricePicker label='High Price' onChange={this.handleEndChange} value={this.props.value[1]} />
        </View>
      </View>
    );
  },

  handleStartChange(value) {
    this.props.onChange('priceRange', [value, this.props.value[1]]);
  },

  handleEndChange(value) {
    this.props.onChange('priceRange', [this.props.value[0], value]);
  }
});

const styles = StyleSheet.create({
  divider: {
    height: 20,
    width: 1,
    backgroundColor: '#ccc'
  },
});

export default PriceRangePicker;
