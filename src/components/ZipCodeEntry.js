import React from 'react-native';
const {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput
} = React;

import globalStyles from './SearchGlobalStyles.js';
import _ from 'lodash';
import globalVariables from '../globalVariables.js';

const ZipCodeEntry = React.createClass({
  getDefaultProps() {
    return {
      onChange() {},
      value: null,
    };
  },

  render() {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.label}>Zip Codes</Text>
        <View style={[globalStyles.innerBox, styles.innerBox]}>
          <View style={styles.zipCodeBoxs}>
            {this.props.value.map((zip, index) => 
              <ZipCodeBox value={zip} key={index} index={index} onRemove={this.handleZipRemove} />
            )}
          </View>

          <View>
            <ZipCodeInput onAdd={this.handleZipAddition} />
          </View>
        </View>

      </View>
    );
  },

  handleZipAddition(value) {
    const zips = (_.clone(this.props.value) || []);
    zips.push(value);
    this.props.onChange('zipCodes', zips);
  },

  handleZipRemove(index) {
    const zips = (_.clone(this.props.value) || []);
    zips.splice(index, 1);
    this.props.onChange('zipCodes', zips);
  }
});


const ZipCodeInput = React.createClass({
  getInitialState() {
    return {
      value: ''
    };
  },
  getDefaultProps() {
    return {
      onAdd() {}
    };
  },
  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          keyboardType={'numeric'}
          placeholder={'zip code'}
          returnKeyType={'done'}
          clearButtonMode={'while-editing'}
          value={this.state.value}
          onChangeText={this.handleChange}
          onEndEditing={this.handleTextDone}
        />
      </View>
    );
  },

  handleChange(value) {
    this.setState({value});
  },

  handleTextDone(event) {
    console.log('handleTextDone');
    if (this.state.value) this.props.onAdd(this.state.value);
    this.setState({value: ''});
  }
});


const ZipCodeBox = React.createClass({
  getDefaultProps() {
    return {
      value: null,
      index: 0,
      onRemove() {}
    };
  },
  render() {
    return (
      <View style={styles.zipView}>
        <Text style={styles.zipText}>{this.props.value}</Text>
        <TouchableOpacity onPress={this.handleClear}>
          <Image style={styles.clearBtn} source={require('../images/Clear.png')} />
        </TouchableOpacity>
      </View>
    );
  },

  handleClear() {
    this.props.onRemove(this.props.index);
  }
});







const styles = StyleSheet.create({
  innerBox: {
    flexDirection: 'column'
  },

  zipCodeBoxs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  zipView: {
    backgroundColor: '#F9F9F9',
    borderRadius: 2,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 30,
    margin: 5,
  },

  zipText: {
    color: globalVariables.green,
    fontSize: 18,
  },

  clearBtn: {
    position: 'absolute',
    right: 10,
    top: 14,
    width: 14,
    height: 14,
    opacity: 0.5
  },

  input: {
    height: 40,
    width: 200,
    borderColor: '#E4E4E4',
    borderWidth: 1,
    padding: 5,
    margin: 5,
    color: globalVariables.green
  },
});


export default ZipCodeEntry;

