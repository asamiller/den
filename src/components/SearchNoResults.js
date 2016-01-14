const React = require('react-native');
const {
  StyleSheet,
  Image,
  Text,
  View,
} = React;

const Dimensions = require('Dimensions');
const {width, height} = Dimensions.get('window');

const globalVariables = require('../globalVariables.js');

const SearchNoResults = React.createClass({

  render() {
    return (
      <View style={styles.view}>
        <Image source={require('image!sad-foxy')} style={styles.image} />
        <Text style={styles.text}>
          Oh no! There aren’t any houses 
          that match your search!
        </Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
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