import React from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity, StyleSheet, Image, Platform, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import Load from "react-native-loading-gif";
import { ScrollView } from 'react-native-gesture-handler';

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
                    <ScrollView>
                        <Image
                            style={{ width: SCREENWIDTH, height: SCREENHEIGHT/2, }}
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
                            onPress={() => this.uploadImage(latitude, longitude, photo.uri)}
                        />
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Image
                        style={{ width: SCREENWIDTH, height: SCREENHEIGHT/2, }}
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

    uploadImage = async (latitude, longitude, uri) => {

        this.setState(function () { return { isLoading: true } });
        var NomeArq = latitude + '_' + longitude;

        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase.storage().ref().child("images/" + NomeArq);



        return ref.put(blob).then(() => {
            alert("success");
            return ref.getDownloadURL()
                .then((url) => {
                    this.MudarTela('Buttons', latitude, longitude, url);
                });
        }).catch((error) => {
            alert(error);
        });
    }

    MudarTela(NMPagina, latitude, longitude, url) {
        this.props.navigation.navigate(NMPagina, { latitude, longitude, url });

    }
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