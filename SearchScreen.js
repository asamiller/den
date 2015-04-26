'use strict';

var React = require('react-native');
var {
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	Text,
	View,
} = React;

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var PropertyTypePicker = require('./components/PropertyTypePicker.js');
var BuiltRangePicker = require('./components/BuiltRangePicker.js');
var PriceRangePicker = require('./components/PriceRangePicker.js');
var ZipCodeEntry = require('./components/ZipCodeEntry.js');
var NumberPicker = require('./components/NumberPicker.js');

var SearchResults = require('./components/SearchResults.js');

var globalVariables = require('./globalVariables.js');



var SearchScreen = React.createClass({
	
	getInitialState: function() {
		return {
			propertyType: 'DETACHD',
			builtRange: [1900, 2020],
			priceRange: [300, 800],
			zipCodes: ['97202'],
			bedrooms: 3,
			bathrooms: 1
		};
	},

	render: function() {
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

	onSearch: function() {
		this.props.navigator.push({
			component: SearchResults,
			title: 'Search Results',
			passProps: {
				search: this.state
			},
		});
	},

	saveQueryOptions: function(key, value) {
		console.log('saveQueryOptions', key, value);
		var temp = {};
		temp[key] = value;
		this.setState(temp);
	},
});

var styles = StyleSheet.create({
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

module.exports = SearchScreen;
