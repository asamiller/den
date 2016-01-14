import React from 'react-native';
const {
  StyleSheet,
  Text,
  View,
} = React;

import globalVariables from '../globalVariables.js';

const KVBox = React.createClass({

  getDefaultProps() {
    return {
      label: '',
      value: ''
    };
  },
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        <Text style={styles.value}>{this.props.value}</Text>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
  },

  label: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: globalVariables.textColor,
  },
  
  value: {
    flex: 2,
    fontSize: 14,
    fontWeight: '200',
    color: globalVariables.textColor,
  },
});

export default KVBox;
