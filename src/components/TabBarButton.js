import React from 'react-native';
const {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} = React;

import globalVariables from '../globalVariables.js';

const TabBarButton = React.createClass({

  getDefaultProps() {
    return {
      tab: 'search',
      selected: 'search',
      onChange() {}
    };
  },

  render() {
    let icon;
    const isSelected = (this.props.tab === this.props.selected);

    if (this.props.tab === 'search') {
      icon = (isSelected) ? require('../images/TabBar-House-Icon-Active.png') : require('../images/TabBar-House-Icon.png');
    }

    if (this.props.tab === 'saved') {
      icon = (isSelected) ? require('../images/TabBar-Favorite-Icon-Active.png') : require('../images/TabBar-Favorite-Icon.png');
    }

    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <View style={styles.button}>
          <Image style={styles.icon} source={icon} />
          <Text style={[styles.text, isSelected && styles.textActive]}>{this.props.label}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  },

  handlePress() {
    console.log('handlePress', this.props.tab);
    this.props.onChange(this.props.tab);
  }
});


const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 49,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // view: {
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

  icon: {
    width: 24,
    height: 24,
  },

  text: {
    fontSize: 10,
    color: globalVariables.textColor,
    textAlign: 'center',
  },

  textActive: {
    color: globalVariables.green,
  },

});

export default TabBarButton;