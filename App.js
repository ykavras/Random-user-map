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
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
const {width} = Dimensions.get('window');
class App extends Component {
  state = {
    data: [],
    region: {},
  };

  componentDidMount = async () => {
    this.mapCarousel = {};
    const data = await fetch('https://randomuser.me/api/?nat=tr&results=10')
      .then(response => response.json())
      .then(responseJson => {
        return responseJson.results;
      })
      .catch(error => {
        console.error(error);
      });
    await this.setState({
      data,
      region: {
        latitude: parseFloat(data[0].location.coordinates.latitude),
        longitude: parseFloat(data[0].location.coordinates.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    });
  };

  onRegionChange(latitude, longitude) {
    this.setState({
      region: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    });
  }

  customButton = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.onRegionChange(
            item.location.coordinates.latitude,
            item.location.coordinates.longitude,
          )
        }
        key={`item_${index + item.email}`}
        style={styles.box}>
        <Image style={styles.boxImage} source={{uri: item.picture.large}} />
        <View style={styles.fullName}>
          <Text style={styles.boxTitle}>
            {item.name.first} {item.name.last}
          </Text>
          <Text style={styles.boxTitle}>
            {item.location.state} / {item.location.country}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  changeIndex = async currentIndex => {
    const {data} = this.state;
    await this.mapCarousel.snapToItem(currentIndex);
    await this.onRegionChange(
      data[currentIndex].location.coordinates.latitude,
      data[currentIndex].location.coordinates.longitude,
    );
  };

  render() {
    const {data, region} = this.state;
    return (
      <View style={styles.wrapper}>
        <StatusBar hidden />
        {data.length > 0 && (
          <>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.mapWrapper}
              region={region}
              rotateEnabled={false}
              maxZoomLevel={2}
              minZoomLevel={2}>
              {data.map((item, index) => (
                <Marker
                  onPress={() => this.changeIndex(index)}
                  key={`map${index}`}
                  coordinate={{
                    latitude: parseFloat(item.location.coordinates.latitude),
                    longitude: parseFloat(item.location.coordinates.longitude),
                  }}>
                  <Image
                    source={{uri: item.picture.large}}
                    style={styles.markerImage}
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
