import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import styles from './styles';
import MapView, {Marker} from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
const {width} = Dimensions.get('window');

class App extends Component {
  state = {
    data: [
      {
        name: 'Ankara',
        picture:
          'https://lh5.googleusercontent.com/p/AF1QipNauJyK25obNzldQxJvpJyNJS3Cf8XycMsmHZUs=w408-h271-k-no',
        coordinate: {
          latitude: 39.9032923,
          longitude: 32.6226817,
        },
      },
      {
        name: 'İstanbul',
        picture:
          'https://lh5.googleusercontent.com/p/AF1QipPvCvolnCFPJWeBMCIH-XzRbd6LMAsHbzB06cSV=w408-h407-k-no',
        coordinate: {
          latitude: 41.0049823,
          longitude: 28.7319994,
        },
      },
      {
        name: 'Konya',
        picture:
          'https://lh5.googleusercontent.com/p/AF1QipOKAOUDrztQgkF0dDvLF-4R0May3Uq90Rtd4HbK=w408-h305-k-no',
        coordinate: {
          latitude: 37.8784235,
          longitude: 32.3663993,
        },
      },
      {
        name: 'Antalya',
        picture:
          'https://lh5.googleusercontent.com/p/AF1QipOSMDhIj5lFP6l2jvbm3ROm6kCOYqAmBMHvQ7x8=w426-h240-k-no',
        coordinate: {
          latitude: 36.8978553,
          longitude: 30.5780217,
        },
      },
      {
        name: 'Zonguldak',
        picture:
          'https://lh5.googleusercontent.com/p/AF1QipMQWaJ4Hxvs4dZqKx6xRZgFyC5IY1n81mLqjCwP=w408-h494-k-no',
        coordinate: {
          latitude: 41.4590028,
          longitude: 31.7301209,
        },
      },
    ],
    currentMap: undefined,
    region: {},
  };

  componentDidMount = async () => {
    this.mapCarousel = {};
    this._mapView = MapView;
    const {data} = this.state;
    await this.setState({
      region: {
        latitude: data[0].coordinate.latitude,
        longitude: data[0].coordinate.longitude,
        latitudeDelta: 0.4,
        longitudeDelta: 0.4,
      },
    });
  };

  changeIndex = async currentIndex => {
    const {data} = this.state;
    await this.mapCarousel.snapToItem(currentIndex);
    await this.onRegionChange(
      data[currentIndex].coordinate.latitude,
      data[currentIndex].coordinate.longitude,
    );
    await this.setState({currentMap: currentIndex});
  };

  onRegionChange = async (latitude, longitude) => {
    await this.setState({
      region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.4,
        longitudeDelta: 0.4,
      },
    });
    await this._mapView.animateCamera({
      center: {latitude: latitude, longitude: longitude},
      pitch: 4,
      heading: 4,
      zoom: 10,
    });
  };

  customButton = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => this.changeIndex(index)}
        key={`item_${index + item.email}`}
        style={styles.box}>
        <Image style={styles.boxImage} source={{uri: item.picture}} />
        <View style={styles.fullName}>
          <Text style={styles.boxTitle}>{item.name} / TURKEY</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {data, currentMap} = this.state;
    return (
      <View style={styles.wrapper}>
        <StatusBar hidden />
        {data.length > 0 && (
          <>
            <MapView
              style={styles.mapWrapper}
              ref={mapView => {
                this._mapView = mapView;
              }}
              initialRegion={{
                latitude: 38.7412482,
                longitude: 26.1844276,
                latitudeDelta: 5,
                longitudeDelta: 5,
              }}>
              {data.map((item, index) => (
                <Marker
                  ref={marker => {
                    this._mapView = marker;
                  }}
                  onPress={() => this.changeIndex(index)}
                  key={`map${index}`}
                  coordinate={{
                    latitude: item.coordinate.latitude,
                    longitude: item.coordinate.longitude,
                  }}>
                  <Image
                    source={{uri: item.picture}}
                    style={[
                      styles.markerImage,
                      currentMap === index && styles.markerImageActive,
                    ]}
                  />
                </Marker>
              ))}
            </MapView>
            <View style={styles.boxesWrapper}>
              <Carousel
                ref={carousel => {
                  this.mapCarousel = carousel;
                }}
                contentContainerCustomStyle={styles.boxes}
                data={data}
                sliderWidth={width}
                itemWidth={width / 1.2}
                renderItem={this.customButton}
                onSnapToItem={this.changeIndex}
              />
            </View>
          </>
        )}
      </View>
    );
  }
}

export default App;

console.disableYellowBox = true;
