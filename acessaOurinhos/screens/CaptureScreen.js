import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert, Dimensions, Image, ScrollView } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';


const { height, width } = Dimensions.get('window');

const SCREENHEIGHT = height;
const SCREENWIDTH = width;


export default class CaptureScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        image: '',
        anexar: 'N',
        bloquear: false,
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Desculpe, mas para isso funcionar precisamos de permissão para acessar sua galeria!');
            }
        }
    }

    takePicture = async (latitude, longitude) => {
        this.setState({ bloquear: true });
        console.log(this.state.bloquear);
        if (this.camera) {
            
            photo = await this.camera.takePictureAsync();
            console.log('Tem Valor?: ' + latitude + '_' + longitude)
            this.props.navigation.navigate('ExibeImagem', { photo, latitude, longitude });
        }
    }

    _pickImage = async (latitude, longitude) => {
        let photo = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(photo);

        if (!photo.cancelled) {
            this.props.navigation.navigate('ExibeImagem', { photo, latitude, longitude });
        }
    };

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Sem Acesso a Câmera! </Text>;
        } else {

            const { navigation } = this.props;
            const latitude = navigation.getParam('latitude');
            const longitude = navigation.getParam('longitude');

            if (this.state.anexar == 'N' && this.state.bloquear==false) {
                Alert.alert(
                    'Anexar uma Foto?',
                    'Enviar uma foto é opcional, você também pode continuar o processo sem adicionar, escolha uma opção:',
                    [
                        { text: 'Anexar uma Foto', onPress: () => this.setState({ anexar: 'S' }) },
                        { text: 'Continuar sem anexar uma Foto', onPress: () => this.props.navigation.navigate('Buttons', { latitude, longitude }) },
                    ]);
            };

            if (this.state.anexar == 'S' && this.state.bloquear==false) {
                Alert.alert(
                    'Escolha Uma Opção',
                    'Escolha de onde será enviada: ',
                    [
                        { text: 'Capturar uma Foto', onPress: () => console.log('OK Pressed') },
                        { text: 'Enviar a Partir da Galeria', onPress: () => this._pickImage(latitude, longitude) },
                    ]);
            };

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

                        <TouchableOpacity en style={styles.botaoAzul} onPress={() => this.takePicture(latitude, longitude)} disabled={this.state.bloquear}>{this.props.type }
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <Image style={{ width: 25, height: 25 }} source={require("../assets/images/icons/camera.png")}></Image>
                                <Text style={{ color: '#FFFFFF', marginLeft: 10, fontSize: 18 }}>Capturar</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginLeft: 50, marginRight: 50, alignSelf: 'center', marginTop: 15 }} onPress={() => this.props.navigation.navigate('MapStack')}>{this.props.type}
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
        width: SCREENWIDTH,
        borderRadius: 60,
        alignContent: 'center',
        alignItems: 'center',
        padding: 20,
    }
});

