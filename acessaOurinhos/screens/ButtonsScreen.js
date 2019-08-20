import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity, 
  Image
} from 'react-native';
const { height, width } = Dimensions.get('window');
const SCREENHEIGHT = height;
const SCREENWIDTH = width - 20;

import { Button } from 'react-native-elements';


export default class ButtonsScreen extends React.Component {

  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    const { navigation } = this.props;
    const latitude = navigation.getParam('latitude');
    const longitude = navigation.getParam('longitude');
    const link = navigation.getParam('url');

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.welcome}>Onde se encontra o problema?</Text>
          <View style={styles.geral}>

            <TouchableOpacity style={styles.botaoAzul} onPress={() => this.props.navigation.navigate('CalcadaInsert', { latitude: latitude, longitude: longitude, link })}>{this.props.type}
              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Image style={{ width: 25, height: 25 }} source={require("../assets/images/icons/calcada.png")}></Image>
                <Text style={{ color: '#FFFFFF', marginLeft: 10, fontSize: 18 }}>Calçadas</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.geral}>
            <TouchableOpacity style={styles.botaoAzul} onPress={() => this.props.navigation.navigate('RuaInsert', { latitude: latitude, longitude: longitude, link })}>{this.props.type}
              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Image style={{ width: 25, height: 25 }} source={require("../assets/images/icons/Rua.png")}></Image>
                <Text style={{ color: '#FFFFFF', marginLeft: 10, fontSize: 18 }}>Ruas</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.geral}>
            <TouchableOpacity style={styles.botaoAzul} onPress={() => this.props.navigation.navigate('PredioInsert', { latitude: latitude, longitude: longitude, link })}>{this.props.type}
              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Image style={{ width: 25, height: 25 }} source={require("../assets/images/icons/predio.png")}></Image>
                <Text style={{ color: '#FFFFFF', marginLeft: 10, fontSize: 18 }}>Prédios</Text>
              </View>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  geral: {
    margin: 10
  },
  botao: {
    padding: 10
  },
  botaoAzul: {
    alignSelf: 'center',
    backgroundColor: '#0984ec',
    width: SCREENWIDTH - 60,
    borderRadius: 60,
    alignContent: 'center',
    alignItems: 'center',
    padding: 20,
  }

});


