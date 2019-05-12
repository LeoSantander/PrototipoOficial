import React from 'react';
import { ScrollView, StyleSheet, Dimensions, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { height, width } = Dimensions.get('window');

export default class LinksScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      markers: []
    }
    this.handlePress = this.handlePress.bind(this);
  }

  static navigationOptions = {
    title: 'Mapa',
  };
  
  state = {
    places:[
      {
        id: 1,
        title: 'Av. Vitalina Marcusso, 1400 - Campus Universitario, Ourinhos - SP, 19910-206',
        description: 'Falta uma rampa de acesso para cadeirantes',
        latitude:-22.950560,
        longitude:-49.896220,
      },
      {
        id: 2,
        title: 'R. Seis, 171 - Jardim das Paineiras, Ourinhos - SP, 19910-247',
        description: 'Dificil acesso, calçada em péssimo estado, não tem rampas!',
        latitude:-22.959253,
        longitude:-49.894393,
      },
    ], 
  };

  handlePress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          cost: `$${getRandomInt(50, 300)}`
        }
      ]
    })
  }

  render() {
    const { latitude, longitude } = this.state.places[0];
    return (
      <View style ={styles.container}>
        <MapView
          ref={map => this.mapView = map}
          initialRegion ={{
            latitude,
            longitude,
            latitudeDelta: 0.0142,
            longitudeDelta: 0.0231
          }}
          onPress={this.handlePress}
          style = {styles.MapView}
        >
        { this.state.places.map(place => (
          <MapView.Marker 
            ref={mark => place.mark = mark}
            title = {place.title}
            description = {place.description}
            key = {place.id}
            coordinate ={{
              latitude:place.latitude,
              longitude:place.longitude,
          }}/>
        ))}  
        
        { this.state.markes.map((marker) => {
          return <Marker {...marker} />
        })}

       </MapView>
        <ScrollView 
          style = {styles.placeContainer} 
          horizontal
          showsHorizontalScrollIndicator = {false}
          pagingEnabled
          onMomentumScrollEnd={(e) => {
            const place = (e.nativeEvent.contentOffset.x > 0)
              ? e.nativeEvent.contentOffset.x / Dimensions.get('window').width
              : 0;

              const { latitude, longitude, mark } = this.state.places[place];

              this.mapView.animateToCoordinate({
                latitude,
                longitude
            }, 1000);

            setTimeout(() =>{
              mark.showCallout();
            }, 500);

          }}
        >
          { this.state.places.map(place => (
            <View key={place.id} style={styles.place}>
              <Text style={styles.titulo}>Endereço:</Text>
              <Text>{place.title}</Text>
              <Text style={styles.titulo}>Reclamação: </Text>
              <Text>{place.description}</Text>
            </View>
          ))}

        </ScrollView>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  titulo:{
    fontSize: 20,
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  MapView:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  placeContainer:{
    width:'100%',
    maxHeight: 200,
  },
  place:{
    width: width - 40,
    maxHeight: 200,
    backgroundColor:'#FFF',
    marginHorizontal: 20,
  },
});
