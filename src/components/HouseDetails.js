import React from 'react-native';
const {
  ScrollView,
  StyleSheet,
  Image,
  Text,
  View,
  MapView,
} = React;

import _ from 'lodash';
import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');

import HouseDetailsCaroselImage from './HouseDetailsCaroselImage.js';
import SpecIconBox from './SpecIconBox.js';
import KVBox from './KVBox.js';

import SaveButton from './SaveButton.js';

import parse from '../parsing/index.js';

import globalVariables from '../globalVariables.js';


const HouseDetails = React.createClass({

  getInitialState() {
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

  getDefaultProps() {
    return {
      form: {},
      house: {},
      houseKV: null,
      images: null,
    };
  },

  componentDidMount() {
    this.getRMLSDetail();
    if (this.props.house.specs && this.props.house.specs.Address) this.geocodeAddress(this.props.house.specs.Address);
  },

  getRMLSDetail() {
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

  processResults(html) {
    const data = parse.houseDetail(html);
    // console.log(data);

    this.setState({
      houseKV: data.house,
      searchPending: false,
      form: data.form
    });

    if (data.photosID) this.getRMLSImages(data.photosID);
  },





  getRMLSImages(photosID) {
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

  processImageResults(html) {
    const data = parse.housePhotos(html);
    // console.log(data);

    this.setState({
      images: data,
      searchPending: false
    });
  },


  geocodeAddress(address) {
    fetch(globalVariables.geocodeServer + '?address='+encodeURIComponent(address))
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      if (!_.isArray(response.results)) return;

      const location = response.results[0].geometry.location;

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


  render() {
    const houseKV = this.props.houseKV || this.state.houseKV || {};
    const images = this.props.images || this.state.images || [this.props.house.image] || [];

    const kvElements = [];
    _.each(_.omit(houseKV, ["Address", "Price", "Beds", "Baths", "SQFT", "Tax/Year", "REMARKS"]), function (item, key) {
      if (!key || !item) return;

      kvElements.push(
        <KVBox key={key} label={key} value={item} />
      );

    });

    const caroselImages = [];

    _.each(images, function (item) {
      caroselImages.push(
        <HouseDetailsCaroselImage image={item} key={item} />
      );
    });

    let mapPins = [];
    if (this.state.latitude) {
      mapPins = [{
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        title: this.props.house.specs.Address,
      }];
    }

    // data to save into favorites
    const saveData = {
      house: this.props.house,
      images,
      houseKV,
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
          <Image style={styles.mapPin} source={require('../images/map-pin.png')} />
          <Text style={styles.addressText} numberOfLines={1}>{this.props.house.specs.Address}</Text>
        </View>

        <View style={styles.iconContainer}>
          <SpecIconBox value={this.props.house.specs.Beds} label={'Bedrooms'} icon={require('../images/beds-large.png')} />
          <SpecIconBox value={this.props.house.specs.Baths} label={'Bathrooms'} icon={require('../images/bath-large.png')} />
          <SpecIconBox value={this.props.house.specs.Sqft} label={'Square Footage'} icon={require('../images/sqft-large.png')} />
        </View>

        <View style={styles.iconContainer}>
          <SpecIconBox value={this.props.house.specs.YrBuilt} label={'Year Built'} icon={require('../images/year-large.png')} />
          <SpecIconBox value={this.props.house.specs['NHood/Bldg']} label={'Neighborhood'} icon={require('../images/neighborhood-large.png')} />
          <SpecIconBox value={this.props.house.specs['Tax/Yr']} label={'Tax per Year'} icon={require('../images/tax-large.png')} />
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

const styles = StyleSheet.create({
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
    width,
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
    shadowOffset: {height: 2, width: 1  },
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
    shadowOffset: {height: 2, width: 1  },
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

export default HouseDetails;
