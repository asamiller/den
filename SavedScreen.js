'use strict';

var React = require('react-native');
var {
	ActivityIndicatorIOS,
	ListView,
	StyleSheet,
	Text,
	TextInput,
	View,
	AsyncStorage
} = React;

var _ = require('lodash');

var HouseCell = require('./components/HouseCell.js');
var HouseDetails = require('./components/HouseDetails.js');

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var SavedScreen = React.createClass({
	
	getInitialState: function() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		return {
			dataSource: ds.cloneWithRows([]),
			loading: false,
			data: [],
			loadTime: 0
		};
	},

	getDefaultProps: function() {
		return {
			tabClickTime: 0,
		};
	},

	componentDidMount: function() {
		this.getAllKeys();
	},

	componentDidUpdate: function(prevProps, prevState) {
		console.log('componentDidUpdate');
		if (!this.state.loading && this.props.tabClickTime > this.state.loadTime) this.getAllKeys();
	},


	getAllKeys: function() {
		this.setState({ loadTime: Date.now() });

		return AsyncStorage.getAllKeys()
		.then((value) => {
			if (value !== null){
				console.log('got keys', value);
				var filteredKeys = _.filter(value, (n) => n.indexOf('@den-saved') >=0 );
				this.getAllItems(filteredKeys);
			} else {
				this.setState({ loading: false });
			}
		})
		.catch((error) => console.error('AsyncStorage error: ' + error.message))
		.done();
	},

	getAllItems: function(keys) {
		return AsyncStorage.multiGet(keys)
		.then((value) => {
			if (value !== null){
				console.log('got items', value);
				var items = [];
				value.map((item) => {
					var json = null;
					try {
						json = JSON.parse(item[1]);
					}
					catch (e) { console.error('couldnt parse json', e, item); }

					if (json) items.push(json);
				});

				items.sort( (a, b) => a.dateSaved < b.dateSaved ? 1 : -1 );
				console.log('done', items);

				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(items),
					items: items,
					loading: false
				});
				
			} else {
				this.setState({ loading: false });
			}
		})
		.catch((error) => console.error('AsyncStorage error: ' + error.message))
		.done();
	},


	onEndReached: function() {
		console.log('onEndReached');
	},


	selectHouse: function(data) {
		console.log('selectHouse', data);

		this.props.navigator.push({
			component: HouseDetails,
			title: 'Details',
			passProps: {
				house: data.house,
				images: data.images,
				houseKV: data.houseKV,
			},
		});
	},

	renderRow: function(data)  {
		return (
			<HouseCell
				onSelect={() => this.selectHouse(data)}
				type='saved'
				key={data.house.id}
				dateSaved={data.dateSaved}
				house={data.house}
			/>
		);
	},

	render: function() {
		var content = (
			<ListView
				ref="listview"
				dataSource={this.state.dataSource}
				renderFooter={this.renderFooter}
				renderRow={this.renderRow}
				onEndReached={this.onEndReached}
				automaticallyAdjustContentInsets={true}
				keyboardDismissMode="onDrag"
				keyboardShouldPersistTaps={false}
				showsVerticalScrollIndicator={true}
			/>
		);

		return (
			<View style={styles.container}>
				{content}
			</View>
		);
	},
});

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#f5f5f5',
		height: height
	},
	centerText: {
		alignItems: 'center',
	},
	spinner: {
		width: 30,
	},
	scrollSpinner: {
		marginVertical: 20,
	},
});

module.exports = SavedScreen;
