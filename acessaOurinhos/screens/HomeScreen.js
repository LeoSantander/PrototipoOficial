import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import { Button } from 'react-native-elements';
import { MonoText } from '../components/StyledText';

const { height, width } = Dimensions.get('window');

const SCREENHEIGHT = height;
const SCREENWIDTH = width;

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <Text style={styles.getStartedTextBig}>Bem-vindo!</Text>
        <Text style={styles.getStartedText}>Para indicar irregularidades, clique no botão abaixo e navegue pelo mapa:</Text>

        <TouchableOpacity style={styles.botaoAzul} onPress={() => this.props.navigation.navigate('Mapa')}>{this.props.type}
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Image style={{ width: 25, height: 25 }} source={require("../assets/images/icons/mapwhite.png")}></Image>
            <Text style={{ color: '#FFFFFF', marginLeft: 10, fontSize: 18 }}>Ir para o Mapa</Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 10 }}></View>
        <TouchableOpacity style={{ marginLeft: 50, marginRight: 50, alignSelf: 'center', marginTop: 15 }} onPress={() => this.props.navigation.navigate('Sobre')}>{this.props.type}
          <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
            <Image style={{ width: 25, height: 25 }} source={require("../assets/images/icons/infoblue.png")}></Image>
            <Text style={{ paddingTop: 5, color: '#0984ec', marginLeft: 10, }}>Conheça o Projeto</Text>
          </View>
        </TouchableOpacity>


      </ScrollView >
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  desc: {
    paddingTop: 30,
    marginLeft: 50,
    marginRight: 50
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  welcomeImage: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
    marginLeft: -10,
  },
  Topo: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 30
  },
  getStartedTextBig: {
    fontSize: 25,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
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
