'use strict';

var React = require('react-native');
var {
	Image,
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
} = React;

var globalVariables = require('../globalVariables.js');

var PropertyTypePickerButton = React.createClass({

	getDefaultProps: function () {
	    return {
	        onPress: function () {},
	        text: null,
	        icon: null,
	        value: null,
	        current: null
	    };
	},

	render: function() {
		var isActive = this.props.value === this.props.current;

		var icon = require('image!House');

		if (this.props.icon == 'condo') icon = require('image!Condo');
		if (this.props.icon == 'multi') icon = require('image!Multi');

		if (isActive) {
			var icon = require('image!House-Active');

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

	handlePress: function () {
		this.props.onPress(this.props.value);
	}

});

var styles = StyleSheet.create({
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

module.exports = PropertyTypePickerButton;
