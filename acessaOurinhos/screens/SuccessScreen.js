import React from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity, StyleSheet, Image, Platform, Dimensions } from 'react-native';
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
        const link = navigation.getParam('url');

        return (
            <View style={styles.container}>
                <ScrollView>
                    <Image
                        style={styles.logo}
                        source={require('../assets/images/success.png')}
                    />
                    <Text style={styles.TextStyle}>Imagem Enviada com sucesso!</Text>
                    <Button
                        style={{ marginTop: 10 }}
                        large
                        title='Continuar'
                        onPress={() => this.MudarTela('Buttons', { latitude, longitude, link })}
                    />
                </ScrollView>
            </View>
        );
    }

    MudarTela(NMPagina, latitude, longitude, url) {
        this.props.navigation.navigate(NMPagina, { latitude, longitude, url });

    }


}

const styles = StyleSheet.create({

    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
    },
    TextStyle: {
        color: '#000',
        textAlign: 'center',
        fontSize: 18,
        marginTop: 30,
        bottom: 30
    },
    TextSmall: {
        color: '#000',
        textAlign: 'center',
        fontSize: 12,
        marginTop: 5,
    },

    container: {
        backgroundColor: '#fff',
        alignContent: 'center',
        justifyContent: 'center',
        width: SCREENWIDTH,
        height: SCREENHEIGHT/2,
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
    },
});