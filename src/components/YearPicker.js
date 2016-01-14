import React from 'react-native';
var {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  PickerIOS,
} = React;

import globalVariables from '../globalVariables.js';


var PickerItemIOS = PickerIOS.Item;

var YearPicker = React.createClass({

  getDefaultProps() {
    return {
      onChange() {},
      value: 2014,
      label: ''
    };
  },

  render() {
    var years = [];

    for (var i=1850; i<=2020; i+=5) {
      years.push(i);
    };

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>

        <PickerIOS
          selectedValue={this.props.value}
          onValueChange={this.handleChange}>
          {years.map((year) => 
            (<PickerItemIOS key={year} value={year} label={year + ''} />)
          )}
        </PickerIOS>
      </View>
    );
  },

  handleChange(value) {
    console.log('handleChange', value);
    this.props.onChange(value);
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: globalVariables.textColor,
    textAlign: 'center'
  },

  value: {
    fontSize: 22,
    color: globalVariables.green,
  },
});


module.exports = YearPicker;
