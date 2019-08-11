import React from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity, StyleSheet, Image, Platform, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

global.LinkDownload = '';


export default class ExibeImagemScreen extends React.Component {

    constructor(props) {
        super(props);
        this.watchID = null;

        this.state = {
            image: null,
            uploading: false,
            isLoading: false,
            download: '',
        }
    };

    render() {

        const { navigation } = this.props;
        const photo = navigation.getParam('photo');
        const latitude = navigation.getParam('latitude');
        const longitude = navigation.getParam('longitude');

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
                    onPress={() => this.enviar(latitude, longitude)}
                />

            </View>
        );
    }

    enviar(latitude, longitude) {
        var NomeArq = latitude + '_' + longitude;
        console.log('Nome do arquivo: ' + NomeArq)

        uploadImageAsync(photo.uri, NomeArq);

        Alert.alert(
            'Carregando...',
            'Aguarde, quando o processamento da imagem for concluído você será redirecionado para concluir o cadastro!',
            [
                { text: 'Entendi', onPress: () => console.log('OK Pressed') },
            ])

        setTimeout(() => {
            this.MudarTela('Buttons', latitude, longitude);
        }, 30000);

    }

    MudarTela(NMPagina, latitude, longitude) {
        console.log('Link para Donwload da imagem Maravilhosa!: ' + LinkDownload);
        this.props.navigation.navigate(NMPagina, {latitude, longitude, LinkDownload});
        
    }
}

uploadImageAsync = async (uri, imageName) => {

    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("images/" + imageName);

    const snapshot = await ref.put(blob);

    LinkDownload = await snapshot.ref.getDownloadURL();
    console.log("Deveria mostrar: "+ LinkDownload);

    return await snapshot.ref.getDownloadURL();

}