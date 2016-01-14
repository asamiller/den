'use strict';

import React from 'react-native';
var {
  StyleSheet,
  Image,
  Text,
  View,
} = React;

import globalVariables from '../globalVariables.js';

var SpecIconBox = React.createClass({
  
  render: function() {
    return (
      <View style={styles.container}>
        <Image style={styles.icon} source={this.props.icon} />
        <Text style={styles.value}>{this.props.value}</Text>
        <Text style={styles.label}>{this.props.label}</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20
  },

  icon: {
    flex: 1,
    alignSelf: 'center',
    height: 34,
    width: 34,
  },

  value: {
    flex: 1,
    fontSize: 19,
    fontWeight: '200',
    color: globalVariables.textColor,
    textAlign: 'center'
  },

  label: {
    flex: 1,
    fontSize: 12,
    color: globalVariables.textColor,
    textAlign: 'center'
  },
});

module.exports = SpecIconBox;
