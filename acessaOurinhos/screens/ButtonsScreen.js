import React from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
} from 'react-native';

import { Button } from 'react-native-elements';


export default class ButtonsScreen extends React.Component{

    constructor () {
        super()
        this.state = {
          
        }
      }
      
    
      render(){
        const { navigation } = this.props;
        const latitude = navigation.getParam('latitude');
        const longitude = navigation.getParam('longitude');
        const LinkDownload = navigation.getParam('LinkDownload');
        
        return(
            
            <View style={styles.container}>
              <ScrollView>
                <Text style={styles.welcome}>Onde se encontra o problema?</Text>
                <View style={styles.geral}>
                    <Button
                        icon={{name: 'arrow-up', type: 'font-awesome'}}
                        title='Calçadas' 
                        onPress={() => this.props.navigation.navigate('CalcadaInsert', {latitude: latitude, longitude: longitude, LinkDownload})}>
                    </Button>
                </View>

                <View style={styles.geral}>
                    <Button
                        icon={{name: 'road', type: 'font-awesome'}}
                        title='Ruas' 
                        onPress={() => this.props.navigation.navigate('RuaInsert', {latitude: latitude, longitude: longitude, LinkDownload})}>
                    </Button>
                </View>

                <View style={styles.geral}>
                    <Button
                        icon={{name: 'building', type: 'font-awesome'}}
                        title='Prédios' 
                        onPress={() => this.props.navigation.navigate('PredioInsert', {latitude: latitude, longitude: longitude, LinkDownload})}>
                    </Button>
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
  geral:{
      margin: 10
  },
  botao:{
      padding: 10
  }
});

 
 