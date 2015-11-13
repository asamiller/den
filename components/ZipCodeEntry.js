'use strict';

var React = require('react-native');
var {
	Image,
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
	TextInput
} = React;

var globalStyles = require('./SearchGlobalStyles.js');
var _ = require('lodash');
var globalVariables = require('../globalVariables.js');

var ZipCodeEntry = React.createClass({
	getDefaultProps: function () {
		return {
			onChange: function () {},
			value: null,
		};
	},

	render: function() {
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

	handleZipAddition: function (value) {
		var zips = (_.clone(this.props.value) || []);
		zips.push(value);
		this.props.onChange('zipCodes', zips);
	},

	handleZipRemove: function (index) {
		var zips = (_.clone(this.props.value) || []);
		zips.splice(index, 1);
		this.props.onChange('zipCodes', zips);
	}
});


var ZipCodeInput = React.createClass({
	getInitialState: function() {
		return {
			value: ''
		};
	},
	getDefaultProps: function() {
		return {
			onAdd: function () {}
		};
	},
	render: function() {
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

	handleChange: function (value) {
		this.setState({value: value});
	},

	handleTextDone: function (event) {
		console.log('handleTextDone');
		if (this.state.value) this.props.onAdd(this.state.value);
		this.setState({value: ''});
	}
});


var ZipCodeBox = React.createClass({
	getDefaultProps: function() {
		return {
			value: null,
			index: 0,
			onRemove: function () {}
		};
	},
	render: function() {
		return (
			<View style={styles.zipView}>
				<Text style={styles.zipText}>{this.props.value}</Text>
				<TouchableOpacity onPress={this.handleClear}>
					<Image style={styles.clearBtn} source={{uri:"Clear"}} />
				</TouchableOpacity>
			</View>
		);
	},

	handleClear: function () {
		this.props.onRemove(this.props.index);
	}
});







var styles = StyleSheet.create({
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


module.exports = ZipCodeEntry;

