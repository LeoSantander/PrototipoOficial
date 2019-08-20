import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert, Dimensions, Image, ScrollView } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Button } from 'react-native-elements';

const { height, width } = Dimensions.get('window');

const SCREENHEIGHT = height;
const SCREENWIDTH = width;


export default class CaptureScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    takePicture = async (latitude, longitude) => {
        if (this.camera) {
            photo = await this.camera.takePictureAsync();
            console.log('Tem Valor?: ' + latitude + '_' + longitude)
            this.props.navigation.navigate('ExibeImagem', { photo, latitude, longitude });
        }
    }

    render() {

        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Sem Acesso a Câmera! </Text>;
        } else {

            Alert.alert(
                'Deseja Mesmo Enviar uma Foto?',
                'Enviar uma foto é opciona, você Deseja Continuar?',
                [
                    { text: 'Enviar um Foto', onPress: () => console.log('OK Pressed') },
                    { text: 'Não Enviar', onPress: () => this.props.navigation.navigate('Buttons', { latitude, longitude }) },
                ]);

            const { navigation } = this.props;
            const latitude = navigation.getParam('latitude');
            const longitude = navigation.getParam('longitude');

            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={{
                            flex: 1,
                            bottom: 30,
                        }} type={this.state.type}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',

                            }}>
                        </View>
                    </Camera>
                    <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 50 }}>

                        <TouchableOpacity style={styles.botaoAzul} onPress={() => this.takePicture(latitude, longitude)}>{this.props.type}
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <Image style={{ width: 25, height: 25 }} source={require("../assets/images/icons/camera.png")}></Image>
                                <Text style={{ color: '#FFFFFF', marginLeft: 10, fontSize: 18 }}>Capturar</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginLeft: 50, marginRight: 50, alignSelf: 'center', marginTop: 15 }} onPress={() => this.props.navigation.navigate('Mapa')}>{this.props.type}
                            <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                                <Image style={{ width: 25, height: 25 }} source={require("../assets/images/icons/cancel.png")}></Image>
                                <Text style={{ paddingTop: 5, color: '#0984ec', marginLeft: 10, }}>Cancelar</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    textoBotaoEntrar: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
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

