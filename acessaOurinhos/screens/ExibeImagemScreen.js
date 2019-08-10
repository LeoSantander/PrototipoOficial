import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

export default class ExibeImagemScreen extends React.Component {
    state = {
        image: null,
        uploading: false,
    };

    render() {

        const { navigation } = this.props;
        const photo = navigation.getParam('photo');
        const NMPagina = navigation.getParam('NMPagina');

        console.log("Página pra retornar: " + NMPagina);

        return (
            <View>
                <Image
                    style={{ width: 350, height: 400, marginLeft: 30, marginRight: 30, marginTop: 30 }}
                    source={{ uri: photo.uri }}
                />

                <Button
                    style={{ marginTop: 20, marginLeft: 50, marginRight: 50, marginBottom: 20 }}
                    large
                    title='Cancelar'
                    onPress={() => this.props.navigation.navigate('Capture')}
                />

                <Button
                    style={{ marginLeft: 50, marginRight: 50 }}
                    large
                    icon={{ name: 'save', type: 'font-awesome' }}
                    title='Salvar'
                    onPress={() => this.enviar()}
                />

            </View>
        );
    }

    enviar(){  
        uploadImageAsync(photo.uri, "LukinhaDelicinha2019");
        this.props.navigation.navigate('Capture');
    }
}

uploadImageAsync = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    console.log("Jesus me ajude");
    var ref = firebase.storage().ref().child("images/" + imageName);

    const snapshot = await ref.put(blob);
    teste = await snapshot.ref.getDownloadURL();
    console.log("É O SEGUINTE: "+ teste);
}