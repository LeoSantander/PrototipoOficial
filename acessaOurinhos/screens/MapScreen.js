import React from 'react';
import {
  Platform,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  Alert,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { Marker } from 'react-native-maps';
import firebase from 'firebase';

function getRandomInt(min, max) { 
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const { height, width } = Dimensions.get('window');

const SCREENHEIGHT = height;
const SCREENWIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.009;
const LONGTITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapScreen extends React.Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.watchID = null;

    this.state = {
      isLoading: true,
      refreshing: false,
      location: null,
      errorMessage: null,
      location: null,
      errorMessage: null,
      Alert_Visibility: false,
      markers: [],
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      teste: [],
      places: [],
      data: [],
      content: false,
      mostra: false,
    };

    this.handlePress = this.handlePress.bind(this);
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Isso não Funciona no Emulador, Por favor, executar no seu Dispositvo Móvel!',
      });
    } else {
      this._getLocationAsync();
    }
    this.state.isLoading = true;
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permissão Negada',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });

    var lat = this.state.location.coords.latitude
    var long = this.state.location.coords.longitude

    var initialRegion = {
      latitude: lat,
      longitude: long,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGTITUDE_DELTA
    }

    this.setState({ initialPosition: initialRegion })
    this.setState({ markerPosition: initialRegion })
  };

  coisas() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.forceUpdate();
    });

    var that = this;

    that._isMounted = true;

    var rootRef = firebase.database().ref();
    var ref = rootRef.child("users");

    ref.once("value").then(function (snapshot) {
      var data = snapshot.exportVal();

      if (that._isMounted) {
        that.setState({ places: data });
        that.setState({ isLoading: false });
      }
    });
  }

  conecta() {
    var firebaseConfig = {
      apiKey: "AIzaSyD0GlOQKQcpHg7n00ZxbTWmaOfF4rTEomU",
      authDomain: "trabgrad-66a7f.firebaseapp.com",
      databaseURL: "https://trabgrad-66a7f.firebaseio.com",
      projectId: "trabgrad-66a7f",
      storageBucket: "trabgrad-66a7f.appspot.com",
      messagingSenderId: "606095334755"
    };
    if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
    }
  }

  componentDidMount() {

    this.conecta();
    this.coisas();
  }

  handlePress(e) {
    try{
      this.setState({
        markers: [
          ...this.state.markers,
          {
            coordinate: e.nativeEvent.coordinate,
            cost: '$${getRandomInt(50, 300)}',
          }
        ]
      });
      //this.forceUpdate();
      this.props.navigation.navigate('Capture', { latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })
    }catch(e){
      console.log(e);
    }
      
  }

  componentWillUnmount() {
    this._isMounted = false;
    isLoading = true;
    navigator.geolocation.clearWatch(this.watchID);
  }

  componentHideAndShow = () => {
    this.setState(previousState => ({ content: !previousState.content }))
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <View style={{ flex: 1, padding: 20 }}>
            <ActivityIndicator />
          </View>
        </View>
      );
    }

    else {

      const array = Object.values(this.state.places);
      const { latitude, longitude } = array[0];

      return (
        <View style={styles.container}>

          <MapView
            ref={map => this.mapView = map}
            region={this.state.initialPosition}
            onPress={this.handlePress}
            style={styles.MapView}
          >
            {array.map((place, index) => (

              <MapView.Marker
                ref={mark => place.mark = mark}
                title={place.especificacao}
                description={place.detalhe}
                key={index}
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
                }} >
                {
                  place.problema == 'Calçadas' ?
                    <Image source={require('../assets/images/marker.png')} style={{ height: 35, width: 35 }} /> :
                    place.problema == 'Ruas' ?
                      <Image source={require('../assets/images/marker-green.png')} style={{ height: 35, width: 35 }} /> :
                      <Image source={require('../assets/images/marker-blue.png')} style={{ height: 35, width: 35 }} />
                }

              </MapView.Marker>
            ))}

            <MapView.Marker
              coordinate={this.state.markerPosition}
            >
              <View style={styles.radius}>
                <View style={styles.marker} />
              </View>
            </MapView.Marker>

          </MapView>

          {
            // Display the content in screen when state object "content" is true.
            // Hide the content in screen when state object "content" is false. 
            this.state.content ?
              <ScrollView
                style={styles.placeContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                visible={this.state.pickerDisplayed2}
              >
                {array.map((place, index) => (
                  <View key={index} style={styles.place}>
                    <TouchableOpacity onPress={this.componentHideAndShow} >
                      <Text style={{ paddingTop: 10, paddingRight: 10, color: 'red', textAlign: 'right', paddingBottom: 10, fontSize: 18, fontWeight: 'bold' }}>X</Text>
                    </TouchableOpacity>
                    <ScrollView style={{ margin: 10 }}>
                      {
                        place.Download != 'n' ? <Image
                          style={{ width: SCREENWIDTH - 20, height: SCREENHEIGHT / 2 - 20 }}
                          source={{ uri: place.Download }}
                        /> : <Image
                            style={{ width: SCREENWIDTH - 150, height: SCREENHEIGHT / 2 - 150,alignSelf:'center' }}
                            source={require('../assets/images/icon-logo.png')}
                          />
                      }
                      <Text style={{ paddingTop: 10, color: '#000', paddingBottom: 10, fontSize: 18, fontWeight: 'bold' }}>Endereço:</Text>
                      <Text>{place.endereco}</Text>
                      <Text style={{ paddingTop: 10, color: '#000', paddingBottom: 10, fontSize: 18, fontWeight: 'bold' }}>Reclamação: {place.problema}</Text>
                      <Text>{place.especificacao} - {place.detalhe}</Text>
                      <Text>{place.observacao}</Text>
                      <View style={{ height: 10 }}></View>
                    </ScrollView>
                  </View>
                ))}

              </ScrollView> : <View><TouchableOpacity onPress={this.componentHideAndShow} >
                <Text style={{ paddingTop: 10, color: 'red', textAlign: 'right', paddingBottom: 10, paddingRight: 5, fontSize: 18, fontWeight: 'bold' }}>Ver Detalhes</Text>
              </TouchableOpacity>
                <Image source={require('../assets/images/legenda.png')} style={{ width: SCREENWIDTH / 2, height: SCREENWIDTH / 2, position: 'absolute', bottom: 0, }} />
              </View>

          }
        </View>
      );
    }
  }
}

MapScreen.navigationOptions = {
  title: 'Mapa',
  headerRight: (
    <TouchableOpacity
      onPress={() => Alert.alert(
        'Está com dúvidas?',
        '\n1. Para adicionar uma reclamação, basta clicar no mapa, no local onde se encontra o problema.\n\n2. Segure sobre uma marca de reclamação no mapa e veja qual é o problema naquele local.\n\n3. O botao "Ver Detalhes", permite ter uma visão sobre uma reclamação já cadastrada e ver a foto desse problema.\n\n4. A legenda indica os tipos de reclamações já cadastradas.',
      )}

    >
      <Image style={{ width: 25, height: 25, marginRight: 5, }} source={require("../assets/images/icons/infoblue.png")} />
    </TouchableOpacity>
  ),
};

const styles = StyleSheet.create({

  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },

  radius: {
    height: 70,
    width: 70,
    backgroundColor: 'rgba(0,155,155,0.1)',
    borderRadius: 35,
    borderColor: 'rgba(0,155,155,0.3)',
    overflow: 'hidden',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  marker: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#0984ec'
  },

  titulo: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  MapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  placeContainer: {
    width: '100%',
    height: '100%',
  },
  place: {
    width: width,
    backgroundColor: '#fff',
    borderRadius: 7,
  },

  MainContainer: {
    flex: 1,
    marginTop: 20
  },

  ButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },

  Alert_Main_View: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    height: '50%',
    width: '90%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 7,
  },

  Alert_header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2471A3",
    height: '20%',
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
  },
  Text_Header: {
    fontSize: 25,
    backgroundColor: "#2471A3",
    color: "#000",
    textAlign: 'center',
    padding: 10,
  },

  Alert_Title: {
    fontSize: 25,
    color: "#ddd",
    textAlign: 'left'
  },

  Alert_Message: {
    fontSize: 20,
    color: "#ddd",
    textAlign: 'center',
    padding: 10,
    height: '40%'
  },

  buttonStyle: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  TextStyle: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
    marginTop: -5,
  },

  getStartedTextBig: {
    fontSize: 25,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20
  },

  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'left'
  },

  Topo: {
    alignItems: 'center',
    marginHorizontal: 50,
  },

  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },

  welcomeImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },

  inputText: {
    width: 300,
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 10
  }
});
