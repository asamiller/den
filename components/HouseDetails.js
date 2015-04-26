'use strict';

var React = require('react-native');
var {
	ScrollView,
	StyleSheet,
	Image,
	Text,
	View,
	MapView,
} = React;

var _ = require('lodash');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var HouseDetailsCaroselImage = require('./HouseDetailsCaroselImage.js');
var SpecIconBox = require('./SpecIconBox.js');
var KVBox = require('./KVBox.js');

var SaveButton = require('./SaveButton.js');

var parse = require('../parsing/index.js');

var globalVariables = require('../globalVariables.js');


var HouseDetails = React.createClass({
	
	getInitialState: function() {
		return {
			searchPending: false,
			houseKV: {},
			images: null,
			latitude: 0,
			longitude: 0,
			latitudeDelta: 0,
			longitudeDelta: 0,
		};
	},

	getDefaultProps: function() {
		return {
			form: {},
			house: {},
			houseKV: null,
			images: null,
		};
	},

	componentDidMount: function() {
		this.getRMLSDetail();
		if (this.props.house.specs && this.props.house.specs.Address) this.geocodeAddress(this.props.house.specs.Address);
	},

	getRMLSDetail: function () {
		console.log('get detail', this.props.house.id);
		this.setState({ searchPending: true });

		fetch('http://www.rmls.com/rc2/engine/reportGenerator.asp', {
			method: 'post',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.104 Safari/537.36",
				"Referer": "http://www.rmls.com/rc2/UI/search_residential.asp",
			},
			body: 'NO=0&OBK=&OBD=DESC&RID=RC_DETAIL_001&FID=RC_SEARCH_RESIDENTIAL&PRPT=1&ID='+this.props.house.id+'&RPP=5&PMD=&P=1&T='+this.props.form.T
		})
		.then((response) => response.text())
		.then((responseText) => {
			console.log('GOT RMLS DETAIL');
			// console.log(responseText);

			this.processResults(responseText);
		})
		.catch(function (error) {
			console.error('An error occured');
			console.error(error.message);
		});
	},

	processResults: function (html) {
		var data = parse.houseDetail(html);
		console.log(data);

		this.setState({
			houseKV: data.house,
			searchPending: false,
			form: data.form
		});

		if (data.photosID) this.getRMLSImages(data.photosID);
	},





	getRMLSImages: function (photosID) {
		console.log('get images', photosID);
		this.setState({ searchPending: true });

		fetch('http://www.rmls.com/RC2/UI/photoViewer.asp?ml=' + photosID, {
			method: 'get',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.104 Safari/537.36",
				"Referer": "http://www.rmls.com/rc2/UI/search_residential.asp",
			}
		})
		.then((response) => response.text())
		.then((responseText) => {
			console.log('GOT RMLS IMAGES');
			// console.log(responseText);

			this.processImageResults(responseText);
		})
		.catch(function (error) {
			console.error('An error occured');
			console.error(error.message);
		});
	},

	processImageResults: function (html) {
		var data = parse.housePhotos(html);
		console.log(data);

		this.setState({
			images: data,
			searchPending: false
		});
	},


	geocodeAddress: function (address) {
		fetch(globalVariables.geocodeServer + '?address='+encodeURIComponent(address))
		.then((response) => response.json())
		.then((response) => {
			console.log(response);

			if (!_.isArray(response.results)) return;

			var location = response.results[0].geometry.location;

			this.setState({
				latitude: location.lat,
				longitude: location.lng,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			});
		})
		.catch(function (error) {
			console.error('An error occured');
			console.error(error.message);
		});
	},


	render: function() {
		var houseKV = this.props.houseKV || this.state.houseKV || {};
		var images = this.props.images || this.state.images || [this.props.house.image] || [];

		var kvElements = [];
		_.each(_.omit(houseKV, ["Address", "Price", "Beds", "Baths", "SQFT", "Tax/Year", "REMARKS"]), function (item, key) {
			if (!key || !item) return;

			kvElements.push(
				<KVBox key={key} label={key} value={item} />
			);

		});

		var caroselImages = [];

		_.each(images, function (item) {
			caroselImages.push(
				<HouseDetailsCaroselImage image={item} key={item} />
			);
		});

		var mapPins = [];
		if (this.state.latitude) {
			mapPins = [{
				latitude: this.state.latitude, 
				longitude: this.state.longitude, 
				title: this.props.house.specs.Address,
			}];
		}

		// data to save into favorites
		var saveData = {
			house: this.props.house,
			images: images,
			houseKV: houseKV,
		};

		return (
			<ScrollView
				scrollsToTop={true}
				style={styles.container}>

				<ScrollView
					alwaysBounceHorizontal={true}
					alwaysBounceVertical={false}
					automaticallyAdjustContentInsets={false}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					horizontal={true}
					pagingEnabled={true}
					scrollsToTop={false}
					bounces={false}
					contentOffset={{x: 0, y: 0}}
					contentContainerStyle={[styles.carosel, {width: caroselImages.length * width}]}>

					{caroselImages}
				</ScrollView>

				<SaveButton data={saveData} />



				<View style={styles.priceContainer}>
					<Text style={styles.priceText}>
						{this.props.house.specs.Price}
					</Text>
				</View>

				<View style={styles.addressContainer}>
					<Image style={styles.mapPin} source={require('image!map-pin')} />
					<Text style={styles.addressText} numberOfLines={1}>{this.props.house.specs.Address}</Text>
				</View>

				<View style={styles.iconContainer}>
					<SpecIconBox value={this.props.house.specs.Beds} label={'Bedrooms'} icon={require('image!beds-large')} />
					<SpecIconBox value={this.props.house.specs.Baths} label={'Bathrooms'} icon={require('image!bath-large')} />
					<SpecIconBox value={this.props.house.specs.Sqft} label={'Square Footage'} icon={require('image!sqft-large')} />
				</View>

				<View style={styles.iconContainer}>
					<SpecIconBox value={this.props.house.specs.YrBuilt} label={'Year Built'} icon={require('image!year-large')} />
					<SpecIconBox value={this.props.house.specs['NHood/Bldg']} label={'Neighborhood'} icon={require('image!neighborhood-large')} />
					<SpecIconBox value={this.props.house.specs['Tax/Yr']} label={'Tax per Year'} icon={require('image!tax-large')} />
				</View>


				<View style={styles.descContainer}>
					<Text style={styles.descLabel}>REMARKS:</Text>

					<Text style={styles.descText}>
						{this.props.house.desc}
					</Text>
				</View>

				<MapView
					style={styles.map}
					region={this.state}
					annotations={mapPins} />

				<View style={styles.kvContainer}>
					{kvElements}
				</View>

			</ScrollView>
		);
	},
});

var styles = StyleSheet.create({
	container: {
		backgroundColor: globalVariables.background,
	},

	map: {
		height: 150,
		margin: 10,
		borderWidth: 1,
		borderColor: '#ccc',
	},

	// CAROSEL
	carosel: {
		width: width,
		height: 245,
		// borderColor: 'red',
		// borderWidth: 1
	},


	// PRICE
	priceContainer: {
		position: 'absolute',
		backgroundColor: globalVariables.green,
		padding: 5,
		top: 190,
		left: 0,
		height: 30,
		shadowColor: 'black',
		shadowOffset: {height: 2, width: 1	},
		shadowOpacity: 0.2,
		shadowRadius: 1,
	},

	priceText: {
		color: 'white',
		fontSize: 15,
		fontWeight: 'bold',
	},

	// ADDRESS BOX
	addressContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'white',
		padding: 10,
		shadowColor: 'black',
		shadowOffset: {height: 2, width: 1	},
		shadowOpacity: 0.1,
		shadowRadius: 1,
	},

	addressText: {
		color: globalVariables.textColor,
		fontSize: 14,
		marginTop: 5,
		marginBottom: 5,
		textAlign: 'center'
	},

	mapPin: {
		width: 10,
		height: 17,
		margin: 5
	},


	// ICON BOX
	iconContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},


	// DESC BOX
	descContainer: {
		padding: 20
	},

	descLabel: {
		fontSize: 12,
		fontWeight: '400',
		color: globalVariables.textColor
	},

	descText: {
		fontSize: 14,
		fontWeight: '200',
		color: globalVariables.textColor,
		lineHeight: 20
	},


	// KV BOX
	kvContainer: {
		padding: 20,
		paddingTop: 0,
	},
});

module.exports = HouseDetails;
