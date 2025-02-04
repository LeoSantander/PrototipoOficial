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
        
        return(
            
            <View style={styles.container}>
              <ScrollView>
                <Text style={styles.welcome}>Onde se encontra o problema?</Text>
                <View style={styles.geral}>
                    <Button
                        icon={{name: 'arrow-up', type: 'font-awesome'}}
                        title='Calçadas' 
                        onPress={() => this.props.navigation.navigate('Insert1', {latitude: latitude, longitude: longitude})}>
                    </Button>
                </View>

                <View style={styles.geral}>
                    <Button
                        icon={{name: 'road', type: 'font-awesome'}}
                        title='Ruas' 
                        onPress={() => this.props.navigation.navigate('Insert2', {latitude: latitude, longitude: longitude})}>
                    </Button>
                </View>

                <View style={styles.geral}>
                    <Button
                        icon={{name: 'building', type: 'font-awesome'}}
                        title='Prédios' 
                        onPress={() => this.props.navigation.navigate('Insert3', {latitude: latitude, longitude: longitude})}>
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

 
 