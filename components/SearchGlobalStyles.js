'use strict';

var React = require('react-native');
var {
	StyleSheet,
} = React;

var globalVariables = require('../globalVariables.js');

var styles = StyleSheet.create({
	container: {
		marginBottom: 20,
	},

	label: {
		fontSize: 12,
		color: globalVariables.textColor,
		paddingBottom: 5
	},

	innerBox: {
		flex: 1,
		padding: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
	},
});

module.exports = styles