import React from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity, StyleSheet, Image, Platform, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import Load from "react-native-loading-gif";

global.LinkDownload = '';

const { height, width } = Dimensions.get('window');

const SCREENHEIGHT = height;
const SCREENWIDTH = width - 20;



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

        if (this.state.isLoading == false) {
            return (
                <View style={styles.container}>
                    <Image
                        style={{ width: SCREENWIDTH, height: 400, }}
                        source={{ uri: photo.uri }}
                    />

                    <Button
                        style={{ marginTop: 20, marginBottom: 20 }}
                        disabled={this.state.isLoading}
                        large
                        title='Cancelar'
                        onPress={() => this.props.navigation.navigate('Capture')}
                    />

                    <Button
                        disabled={this.state.isLoading}
                        large
                        icon={{ name: 'save', type: 'font-awesome' }}
                        title='Salvar'
                        onPress={() => this.enviar(latitude, longitude)}
                    />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Image
                        style={{ width: SCREENWIDTH, height: 400, }}
                        source={{ uri: photo.uri }}
                    />
                    <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                        <Text style={styles.TextStyle}>Sua imagem esta sendo processada! Aguarde...</Text>
                        <Text style={styles.TextSmall}>O tempo de envio varia de acordo com a velocidade da sua conexão!</Text>
                    </View>

                </View>
            );

        }

    }

    enviar(latitude, longitude) {

        this.setState(function () { return { isLoading: true } });

        var NomeArq = latitude + '_' + longitude;
        uploadImageAsync(photo.uri, NomeArq);

        // No Lugar desse seTimeout, validar ser a Var Global LinkDonwload está setada:
        // - Se Houver valor setado, chama a função MudarTela, se não, continua aguardando! 

        setTimeout(() => {
            this.MudarTela('Buttons', latitude, longitude);
        }, 30000);

    }

    MudarTela(NMPagina, latitude, longitude) {
        this.props.navigation.navigate(NMPagina, { latitude, longitude, LinkDownload });

    }
}

uploadImageAsync = async (uri, imageName) => {

    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("images/" + imageName);

    const snapshot = await ref.put(blob);

    LinkDownload = await snapshot.ref.getDownloadURL();
    console.log("Deveria mostrar: " + LinkDownload);

    return await snapshot.ref.getDownloadURL();

}

const styles = StyleSheet.create({
    TextStyle: {
        color: '#000',
        textAlign: 'center',
        fontSize: 18,
        marginTop: 5,
    },
    TextSmall: {
        color: '#000',
        textAlign: 'center',
        fontSize: 8,
        marginTop: 5,
    },

    container: {
        backgroundColor: '#fff',
        alignContent: 'center',
        width: SCREENWIDTH,
        height: SCREENHEIGHT,
        marginLeft: 10,
        marginRight: 10,
    },
});