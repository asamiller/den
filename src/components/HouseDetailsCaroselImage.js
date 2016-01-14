import React from 'react-native';
const {
  StyleSheet,
  Image,
  View,
} = React;

import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');

const HouseDetailsCaroselImage = React.createClass({
  getDefaultProps() {
    return {
      image: ''
    };
  },
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: this.props.image}} />
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    height: 240,
    width,
    // borderColor: 'red',
    // borderWidth: 1
  },

  image: {
    height: 240,
    resizeMode: 'cover',
  }
});

export default HouseDetailsCaroselImage;
