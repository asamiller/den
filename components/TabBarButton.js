'use strict';

var React = require('react-native');
var {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableWithoutFeedback
} = React;

var globalVariables = require('../globalVariables.js');

var TabBarButton = React.createClass({

	getDefaultProps: function() {
		return {
			tab: 'search',
			selected: 'search',
			onChange: function () {}
		};
	},

	render: function() {
		var icon;
		var isSelected = (this.props.tab === this.props.selected);

		if (this.props.tab === 'search') {
			icon = (isSelected) ?{uri:"TabBar-House-Icon-Active"}:{uri:"TabBar-House-Icon"};
		}

		if (this.props.tab === 'saved') {
			icon = (isSelected) ?{uri:"TabBar-Favorite-Icon-Active"}:{uri:"TabBar-Favorite-Icon"};
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

	handlePress: function () {
		console.log('handlePress', this.props.tab);
		this.props.onChange(this.props.tab);
	}
});


var styles = StyleSheet.create({
	button: {
		flex: 1,
		height: 49,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
	},

	// view: {
	// 	flexDirection: 'column',
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
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

module.exports = TabBarButton;