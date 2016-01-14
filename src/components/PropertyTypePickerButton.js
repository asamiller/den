const React = require('react-native');
const {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} = React;

const globalVariables = require('../globalVariables.js');

const PropertyTypePickerButton = React.createClass({

  getDefaultProps() {
      return {
          onPress() {},
          text: null,
          icon: null,
          value: null,
          current: null
      };
  },

  render() {
    const isActive = this.props.value === this.props.current;

    let icon = require('image!House');

    if (this.props.icon == 'condo') icon = require('image!Condo');
    if (this.props.icon == 'multi') icon = require('image!Multi');

    if (isActive) {
      let icon = require('image!House-Active');

      if (this.props.icon == 'condo') icon = require('image!Condo-Active');
      if (this.props.icon == 'multi') icon = require('image!Multi-Active');
    }

    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View style={styles.tapAreaView}>
          <Image
            style={styles.icon}
            source={icon}
          />
          <Text style={[styles.text, isActive && styles.active]}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  },

  handlePress() {
    this.props.onPress(this.props.value);
  }

});

const styles = StyleSheet.create({
  tapAreaView: {
    alignItems: 'center',
  },

  icon: {
    width: 72,
    height: 38
  },

  text: {
    color: 'rgba(0,0,0,0.5)',
    paddingTop: 5
  },

  active: {
    color: globalVariables.green
  },
});

export default PropertyTypePickerButton;
