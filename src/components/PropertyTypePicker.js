import React from 'react-native';
const {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} = React;

import PropertyTypePickerButton from './PropertyTypePickerButton.js';
import styles from './SearchGlobalStyles.js';

const PropertyTypePicker = React.createClass({

  getDefaultProps() {
    return {
      onChange() {},
      value: null
    };
  },

  render() {
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

  handleChange(value) {
    this.props.onChange('propertyType', value);
  }
});



export default PropertyTypePicker;
