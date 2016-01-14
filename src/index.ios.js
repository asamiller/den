'use strict';

var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	NavigatorIOS,
	TabBarIOS,
	PixelRatio,
} = React;

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var ScreenNavigator = require('./ScreenNavigator.js');

var SearchScreen = require('./SearchScreen.js');
var SavedScreen = require('./SavedScreen.js');
var TabBarButton = require('./components/TabBarButton.js');

var globalVariables = require('./globalVariables.js');

var Den = React.createClass({

	getInitialState: function() {
		return {
			tab: 'search',
		};
	},

	render: function() {
		var screenElement;

		if (this.state.tab == 'saved') screenElement = (<ScreenNavigator title='Saved' component={SavedScreen} key='saved' />);
		else screenElement = (<ScreenNavigator title='Search' component={SearchScreen} key='search' />);

		return (
			<View style={styles.app}>
				{screenElement}
				<View style={styles.tabbar}>
					<TabBarButton tab='search' label='Homes' selected={this.state.tab} onChange={this.handleSelect} />
					<TabBarButton tab='saved' label='Saved' selected={this.state.tab} onChange={this.handleSelect} />
				</View>
			</View>
		);
	},


	handleSelect: function(tab) {
		this.setState({
			tab: tab,
		});
	},
});

var styles = StyleSheet.create({
	app: { width, height },

	tabbar: {
		width: width,
		height: 49,
		shadowColor: 'black',
 		shadowOffset: { height: -2, width: 0 },
 		shadowOpacity: 0.05,
 		shadowRadius: 3,
		flexDirection: 'row',
		justifyContent: 'center'
	}
});

AppRegistry.registerComponent('Den', () => Den);