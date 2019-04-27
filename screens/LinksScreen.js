import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';


export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Mapa',
  };

  render() {
    return (
      <MapView
          initialRegion ={{
            latitude:-22.950560,
            longitude:-49.896220,
            latitudeDelta: 0.0042,
            longitudeDelta: 0.0031
          }}
        style = {styles.MapView}
       />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  MapView:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
});
