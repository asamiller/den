import React from 'react-native';
const {
  ActivityIndicatorIOS,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage
} = React;

import _ from 'lodash';
import HouseCell from './components/HouseCell.js';
import HouseDetails from './components/HouseDetails.js';
import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');

const SavedScreen = React.createClass({

  getInitialState() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      dataSource: ds.cloneWithRows([]),
      loading: false,
      data: [],
      loadTime: 0
    };
  },

  getDefaultProps() {
    return {
      tabClickTime: 0,
    };
  },

  componentDidMount() {
    this.getAllKeys();
  },

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.loading && this.props.tabClickTime > this.state.loadTime) this.getAllKeys();
  },


  getAllKeys() {
    this.setState({ loadTime: Date.now() });

    return AsyncStorage.getAllKeys()
    .then((value) => {
      if (value !== null){
        console.log('got keys', value);
        const filteredKeys = _.filter(value, (n) => n.indexOf('@den-saved') >=0 );
        this.getAllItems(filteredKeys);
      } else {
        this.setState({ loading: false });
      }
    })
    .catch((error) => console.error('AsyncStorage error: ' + error.message))
    .done();
  },

  getAllItems(keys) {
    return AsyncStorage.multiGet(keys)
    .then((value) => {
      if (value !== null){
        console.log('got items', value);
        const items = [];
        value.map((item) => {
          let json = null;
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
          items,
          loading: false
        });

      } else {
        this.setState({ loading: false });
      }
    })
    .catch((error) => console.error('AsyncStorage error: ' + error.message))
    .done();
  },


  onEndReached() {
    console.log('onEndReached');
  },


  selectHouse(data) {
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

  renderRow(data) {
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

  render() {
    const content = (
      <ListView
        ref='listview'
        dataSource={this.state.dataSource}
        renderFooter={this.renderFooter}
        renderRow={this.renderRow}
        onEndReached={this.onEndReached}
        automaticallyAdjustContentInsets={true}
        keyboardDismissMode='on-drag'
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    height
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

export default SavedScreen;
