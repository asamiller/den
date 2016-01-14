'use strict';

import React from 'react-native';
var {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} = React;

import PropertyTypePickerButton from './PropertyTypePickerButton.js';
import styles from './SearchGlobalStyles.js';

var PropertyTypePicker = React.createClass({

  getDefaultProps: function () {
    return {
      onChange: function () {},
      value: null
    };
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Propery Type</Text>
        <View style={styles.innerBox}>
          <PropertyTypePickerButton
            text='Single Family'
            icon='home'
            value='DETACHD'
            current={this.props.value}
            onPress={this.handleChange} />

          <PropertyTypePickerButton
            text='Condo'
            icon='condo'
            value='CONDO'
            current={this.props.value}
            onPress={this.handleChange} />

          <PropertyTypePickerButton
            text='Multi Family'
            icon='multi'
            value='ATTACHD'
            current={this.props.value}
            onPress={this.handleChange} />
        </View>
      </View>
    );
  },

  handleChange: function (value) {
    this.props.onChange('propertyType', value);
  }
});



module.exports = PropertyTypePicker;
