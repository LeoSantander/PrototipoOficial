import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ModalDropdown from 'react-native-modal-dropdown';
import firebase from 'firebase';
//import { generateKeyPair } from 'crypto';


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const { height, width } = Dimensions.get('window');

const SCREENHEIGHT = height;
const SCREENWIDTH = width;
const ASPECT_RATIO = width / height;
const LATTITUDE_DELTA = 0.0922;
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;

export default class LinksScreen extends React.Component {
  
  _isMounted = false;

  constructor(props) {
    super(props);
    this.watchID = null;

    this.state = {

      isLoading: true,

      Alert_Visibility: false,

      markers: [],

      markerPosition:{
        latitude:0,
        longitude:0
      },

      initialPosition:{
        latitude:0,
        longitude:0,
        latitudeDelta:0,
        longitudeDelta:0
      },

      teste: [],

      places: [],

      data: [],
    }

    this.handlePress = this.handlePress.bind(this);
  }

  static navigationOptions = {
    title: 'Mapa',
  };

  showAlertDialog() {
    this.setState({ Alert_Visibility: true });
  }

  handlePress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          cost: '$${getRandomInt(50, 300)}',
        }
      ]
    })
    this.showAlertDialog(true);
  }

  //watchID: ?number = null;

  componentWillUnmount() {

    this._isMounted = false;
    navigator.geolocation.clearWatch(this.watchID)
  }


  componentDidMount() {
    var that = this;

    that._isMounted = true;

    var firebaseConfig = {
      apiKey: "AIzaSyD0GlOQKQcpHg7n00ZxbTWmaOfF4rTEomU",
      authDomain: "trabgrad-66a7f.firebaseapp.com",
      databaseURL: "https://trabgrad-66a7f.firebaseio.com",
      projectId: "trabgrad-66a7f",
      storageBucket: "trabgrad-66a7f.appspot.com",
      messagingSenderId: "606095334755"
    };

    firebase.initializeApp(firebaseConfig);

    var rootRef = firebase.database().ref();

    var ref = rootRef.child("users");
    ref.once("value").then(function(snapshot) {
      var data = snapshot.exportVal();
      if (that._isMounted) {
      that.setState({ places: data });
      that.setState({isLoading:false});
      }
      console.log("**Teste: ", that.state.places);
      //snapshot.forEach(function(childSnapshot) {
        //var key = childSnapshot.key;
        //var data = snapshot.exportVal();
        //console.log("**Data: ",key," - ",childData);
        //console.log(snapshot.exportVal);
      //});
    });

    //firebase.database().ref('users').on('value', (data) => {
      //console.log('**Data:',data.toJSON());
      //this.setState({ teste: data.val() });
      //console.log(teste)
    //});

    navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude
      var long = position.coords.longitude

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA
      }

      this.setState({ initialPosition: initialRegion })
      this.setState({ markerPosition: initialRegion })
    },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lat = position.coords.latitude
      var long = position.coords.longitude

      var lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA
      }

      this.setState({ initialPosition: lastRegion })
      this.setState({ markerPosition: lastRegion })

    })
  }

  
  render() {

    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        </View>
      );
    }
    else{
    
    const array = Object.values(this.state.places);
    
    const { latitude, longitude } = array[0];
    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.mapView = map}
          region={this.state.initialPosition}
          onPress={() => this.props.navigation.navigate('Buttons')}
          style={styles.MapView}
        >

          {this.state.markers.map((marker => {
            return (
              <MapView.Marker {...marker}
                ref={mark => marker.mark = mark}
                title='Nova Reclamação'
                description={'Latitude: ' + marker.coordinate.latitude + 'Longitude: ' + marker.coordinate.longitude}
              >
              </MapView.Marker>
            )
          }))}


          {array.map((place,index) => (
            
            <MapView.Marker
              ref={mark => place.mark = mark}
              title={place.title}
              description={place.description}
              key={index}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }} />
          ))}

          <MapView.Marker
            coordinate={this.state.markerPosition}
          >
            <View style={styles.radius}>
              <View style={styles.marker} />
            </View>
          </MapView.Marker>

        </MapView>
        <ScrollView
          style={styles.placeContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
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

            setTimeout(() => {
              mark.showCallout();
            }, 500);

          }}
        >
          {array.map((place,index) => (
            <View key={index} style={styles.place}>
              <View style={{ margin: 10 }}>
                <Text style={styles.titulo}>Endereço:</Text>
                <Text>{place.title}</Text>
                <Text style={styles.titulo}>Reclamação: </Text>
                <Text>{place.latitude} - {place.longitude}</Text>
                <View style={{ height: 10 }}></View>
                
              </View>
            </View>
          ))}

          <Modal
            visible={this.state.Alert_Visibility}
            transparent={false}
            animationType={"fade"}
            onRequestClose={() => { this.showAlertDialog(!this.state.Alert_Visibility) }} >

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <View style={styles.welcomeContainer}>
                <Text style={styles.getStartedTextBig}>Nova Reclamação</Text>
                <Image
                  source={
                    __DEV__
                      ? require('../assets/images/mais.png')
                      : require('../assets/images/robot-prod.png')
                  }
                  style={styles.welcomeImage}
                />
              </View>
              <View style={styles.Topo}>


                <Text style={styles.getStartedText}>
                  Endereço:
              </Text>
                <TextInput style={styles.inputText} onChangeText={(endereco) => this.setState({ endereco })}
                  value={this.state.endereco}>
                </TextInput>

                <Text style={styles.getStartedText}>
                  Reclamação:
              </Text>
                <ModalDropdown
                  defaultValue='Selecione um item...▼'
                  dropdownStyle={{ width: 300 }}
                  textStyle={{ width: '100%', height: 40 }}
                  style={styles.inputText}
                  options={
                    [
                      'Problemas em vias',
                      'Problemas em calçadas',
                      'Problemas com placas e demais objetos',
                      'Problemas com árvores',
                      'Qualidade de Asfaltos',
                      'Semáforos',
                      'Rampas para cadeirantes',
                      'Passarelas na Rodovia',
                      'Coberturas nos pontos de ônibus',
                      'Lombadas',
                      'Ausência de equipamento de segurança',
                      'Ausência de rampa',
                      'Ausência de saneamento básico',
                      'Ausência de elevador',
                      'Ausência de corrimão',
                      'Ausência de sinalização adequeda',
                      'Ausência de faixa de pedestres',
                      'Ausência de sinais sonoros',
                      'Ausência de ciclovia',
                      'Ausência de pontos de ônibus'

                    ]
                  } />

                <Text style={styles.getStartedText}>
                  Detalhes:
              </Text>
                <TextInput style={styles.inputText} onChangeText={(detalhes) => this.setState({ detalhes })}
                  value={this.state.detalhes}>
                </TextInput>

              </View>

              <View style={{ flexDirection: 'row', height: '10%' }}>

                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    this.setState({ Alert_Visibility: false });
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.TextStyle}> OK </Text>
                </TouchableOpacity>

                <View style={{ width: 1, height: '100%', backgroundColor: '#ddd' }} />

                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    this.setState({ Alert_Visibility: false });
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.TextStyle}> CANCELAR </Text>
                </TouchableOpacity>

              </View>
            </View>
          </Modal>

        </ScrollView>
      </View>
    );
  }
}
}

const styles = StyleSheet.create({

  radius: {
    height: 50,
    width: 50,
    backgroundColor: 'rgba(0,155,155,0.1)',
    borderRadius: 25,
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
    backgroundColor: 'red'
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
    maxHeight: 200,
  },
  place: {
    width: width - 40,
    maxHeight: 200,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
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
