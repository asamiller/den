'use strict';

var React = require('react-native');
var {
	ActivityIndicatorIOS,
	Image,
	PixelRatio,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} = React;

var globalVariables = require('../globalVariables.js');

var moment = require('moment');

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var HouseCell = React.createClass({
	getDefaultProps: function() {
		return {
			house: {},
			type: 'search'
		};
	},
	
	render: function() {
		var ribbonBox = (
			<View style={styles.priceContainer}>
				<Text style={styles.priceText}>
					{this.props.house.specs.Price}
				</Text>
			</View>
		);

		if (this.props.type == 'saved') {
			// console.log(this.props.dateSaved, moment(this.props.dateSaved).fromNow());
			ribbonBox = (
				<View style={[styles.priceContainer, styles.dateContainer]}>
					<Text style={[styles.priceText, styles.dateText]}>
						{moment(this.props.dateSaved).fromNow()}
					</Text>
				</View>
			);
		}

		return (
			<View style={styles.item}>
				<ActivityIndicatorIOS style={styles.spinner} />

				<TouchableHighlight underlayColor={'#fafafa'} activeOpacity={0.9} onPress={this.props.onSelect}>
					<Image
						style={styles.image}
						source={{uri: this.props.house.image}}>

						{ribbonBox}

						<View style={styles.detailContainer}>
							<Text style={styles.addressText} numberOfLines={1}>{this.props.house.specs.Address}</Text>

							<View style={styles.iconContainer}>
								<View style={[styles.iconItem, styles.bedBoxIcons]}>
									<Image style={styles.iconImage} source={{uri:"bed-icon"}}/>
									<Text style={styles.iconText}>{this.props.house.specs.Beds}</Text>
								</View>

								<View style={[styles.iconItem, styles.bedBoxIcons]}>
									<Image style={styles.iconImage} source={{uri:"bath-icon"}} />
									<Text style={styles.iconText}>{this.props.house.specs.Baths}</Text>
								</View>

								<View style={styles.iconItem}>
									<Image style={styles.iconImage} source={{uri:"ruler-icon"}} />
									<Text style={styles.iconText}>{this.props.house.specs.Sqft + ' sqft'}</Text>
								</View>

								<View style={styles.iconItem}>
									<Image style={styles.iconImage} source={{uri:"crane-icon"}} />
									<Text style={styles.iconText}>{this.props.house.specs.YrBuilt}</Text>
								</View>
							</View>
						</View>
					</Image>
				</TouchableHighlight>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	item: {
		backgroundColor: 'white',
		margin: 28,
		marginTop: 20,
		marginBottom: 20,
		padding: 0,
		shadowColor: 'black',
		shadowOffset: { height: 2, width: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 1,
		height: 240,
	},

	spinner: {
		position: 'absolute',
		left: (width/2)-20,
		top: 90
	},

	image: {
		height: 240,
		resizeMode: Image.resizeMode.cover,
	},

	priceContainer: {
		position: 'absolute',
		backgroundColor: globalVariables.green,
		padding: 5,
		top: 6,
		left: 0,
		height: 30,
		shadowColor: 'black',
		shadowOffset: {height: 2, width: 1	},
		shadowOpacity: 0.2,
		shadowRadius: 1,
	},

	dateContainer: {
		backgroundColor: globalVariables.orange,
	},

	priceText: {
		color: '#fff',
		fontSize: 15,
		fontWeight: 'bold',
	},

	dateText: {
		fontSize: 13,
	},

	detailContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'white',
		height: 70,
		padding: 10
	},

	addressText: {
		color: globalVariables.textColor,
		fontSize: 14,
		marginTop: 5,
		marginBottom: 5,
		textAlign: 'center'
	},

	iconContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},

	iconItem: {
		flex: 3,
		justifyContent: 'center',
		flexDirection: 'row',
	},

	iconImage: {
		width: 24,
		height: 24,
	},

	iconText: {
		fontSize: 14,
		color: globalVariables.textColor,
		lineHeight: 20,
		marginLeft: 3,
	},

	bedBoxIcons: {
		flex: 2,
	},

});

module.exports = HouseCell;
