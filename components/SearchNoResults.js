'use strict';

var React = require('react-native');
var {
	StyleSheet,
	Image,
	Text,
	View,
} = React;

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var globalVariables = require('../globalVariables.js');

var SearchNoResults = React.createClass({

	render: function() {
		return (
			<View style={styles.view}>
				<Image source={{uri:"sad-foxy"}} style={styles.image} />
				<Text style={styles.text}>
					Oh no! There aren’t any houses 
					that match your search!
				</Text>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	view: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 100
	},

	image: {
		flex: 1,
		width: 263, 
		height: 218,
	},

	text: {
		flex: 1,
		padding: 40,
		color: globalVariables.green,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 17,
		backgroundColor: 'transparent'
	},


});

module.exports = SearchNoResults;