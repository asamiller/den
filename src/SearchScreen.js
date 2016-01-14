import React from 'react-native';
const {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = React;

import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');

import PropertyTypePicker from './components/PropertyTypePicker.js';
import BuiltRangePicker from './components/BuiltRangePicker.js';
import PriceRangePicker from './components/PriceRangePicker.js';
import ZipCodeEntry from './components/ZipCodeEntry.js';
import NumberPicker from './components/NumberPicker.js';
import SearchResults from './components/SearchResults.js';
import globalVariables from './globalVariables.js';



const SearchScreen = React.createClass({
  
  getInitialState() {
    return {
      propertyType: 'DETACHD',
      builtRange: [1900, 2020],
      priceRange: [300, 800],
      zipCodes: ['97202'],
      bedrooms: 3,
      bathrooms: 1
    };
  },

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.page}>
          <PropertyTypePicker value={this.state.propertyType} onChange={this.saveQueryOptions} />
          <BuiltRangePicker value={this.state.builtRange} onChange={this.saveQueryOptions} />
          <PriceRangePicker value={this.state.priceRange} onChange={this.saveQueryOptions} />
          <ZipCodeEntry value={this.state.zipCodes} onChange={this.saveQueryOptions} />
          <NumberPicker varName='bedrooms' label='Bedrooms (at least)' value={this.state.bedrooms} onChange={this.saveQueryOptions} />
          <NumberPicker varName='bathrooms' label='Bathrooms (at least)' value={this.state.bathrooms} onChange={this.saveQueryOptions} />
          <TouchableOpacity onPress={this.onSearch} activeOpacity={0.9}>
            <View style={styles.searchButton}>
              <Text style={styles.searchButtonText}>
                Search
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  },

  onSearch() {
    this.props.navigator.push({
      component: SearchResults,
      title: 'Search Results',
      passProps: {
        search: this.state
      },
    });
  },

  saveQueryOptions(key, value) {
    // console.log('saveQueryOptions', key, value);
    const temp = {};
    temp[key] = value;
    this.setState(temp);
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: globalVariables.background
  },
  
  page: {
    paddingBottom: 50
  },

  searchButton: {
    padding: 14,
    backgroundColor: globalVariables.green,
  },

  searchButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  }
});

export default SearchScreen;
