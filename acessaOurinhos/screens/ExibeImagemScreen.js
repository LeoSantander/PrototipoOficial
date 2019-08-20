import React from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity, StyleSheet, Image, Platform, Dimensions, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';

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
                            style={{ width: SCREENWIDTH, height: SCREENHEIGHT / 2, }}
                            source={{ uri: photo.uri }}
                        />

                        <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
                            <TouchableOpacity style={styles.botaoAzul} onPress={() => this.uploadImage(latitude, longitude, photo.uri)}>{this.props.type}
                                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                    <Image style={{ width: 25, height: 25 }} source={require("../assets/images/icons/save.png")}></Image>
                                    <Text style={{ color: '#FFFFFF', marginLeft: 10, fontSize: 18 }}>Enviar Foto</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 5, marginBottom: 20, marginLeft: 10, marginRight: 10 }}>
                        <TouchableOpacity style={{ marginLeft: 50, marginRight: 50, alignSelf: 'center', marginTop: 15 }} onPress={() => this.props.navigation.navigate('Capture')}>{this.props.type}
                            <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                                <Image style={{ width: 25, height: 25 }} source={require("../assets/images/icons/cancel.png")}></Image>
                                <Text style={{ paddingTop: 5, color: '#0984ec', marginLeft: 10, }}>Tirar outra Foto</Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View >
            );
        } else {
            return (
                <View style={styles.container}>
                    <Image
                        style={{ width: SCREENWIDTH, height: SCREENHEIGHT / 2, }}
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
            Alert.alert(
                'Sucesso',
                'O processamento da sua imagem foi concluído com sucesso!',
                [
                    { text: 'Continuar', onPress: () => console.log('OK Pressed') },
                ])
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