import React from 'react-native';
var {
  NavigatorIOS,
  StyleSheet
} = React;

import globalVariables from './globalVariables.js';
import Dimensions from 'Dimensions';
var {width, height} = Dimensions.get('window');

var ScreenNavigator = React.createClass({
  getDefaultProps() {
    return {
      title: '',
      component: null
    };
  },
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor={globalVariables.green}
        initialRoute={this.props}
      />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    width, 
    height: height - 49
  },
});

module.exports = ScreenNavigator;
