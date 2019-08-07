import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Button } from 'react-native-elements';
import CaptureScreen from './CaptureScreen';

export default class ExibeImagemScreen extends React.Component {

    render() {

        const { navigation } = this.props;
        const photo = navigation.getParam('photo');

        console.log("To aqui: " + photo);

        return (
            <View>
                <Image
                    style={{ width: 350, height: 400, marginLeft: 30, marginRight: 30, marginTop: 30 }}
                    source={{ uri: photo.uri }}
                />

                <Button
                    style={{marginTop:20, marginLeft: 50, marginRight: 50, marginBottom: 20 }}
                    large
                    icon={{ name: 'md-exit', type: 'font-awesome' }}
                    title='Cancelar'
                    onPress={() => this.props.navigation.navigate('Capture')}
                />

                <Button
                    style={{ marginLeft: 50, marginRight: 50}}
                    large
                    icon={{ name: 'save', type: 'font-awesome' }}
                    title='Salvar'
                    onPress={this.takePicture}
                />

            </View>
        );
    }
}