import React from 'react-native';
const {
  NavigatorIOS,
  StyleSheet
} = React;

import globalVariables from './globalVariables.js';
import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');

const ScreenNavigator = React.createClass({
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

const styles = StyleSheet.create({
  container: {
    width,
    height: height - 49
  },
});

export default ScreenNavigator;
