import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Button } from 'react-native-elements';

export default class CaptureScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    takePicture = async (latitude, longitude, NMPagina) => {
        if (this.camera) {
            photo = await this.camera.takePictureAsync();
            console.log('Tem Valor?: '+latitude+'_'+ longitude)
            this.props.navigation.navigate('ExibeImagem', {photo, latitude, longitude, NMPagina});
        }
    }

    render() {

        const { navigation } = this.props;
        const photo = navigation.getParam('photo');
        const NMPagina = navigation.getParam('NMPagina');
        const latitude = navigation.getParam('latitude');
        const longitude = navigation.getParam('longitude');


        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Sem Acesso a Câmera! </Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera 
                        ref={ref => {
                        this.camera = ref;}}
                        style={{
                        flex: 1,
                        bottom: 80
                        }} type={this.state.type}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',

                            }}>
                        </View>
                    </Camera>
                    <Button
                        style={{ marginLeft: 50, marginRight: 50, marginBottom: 50 }}
                        large
                        icon={{ name: 'camera', type: 'font-awesome' }}
                        title='Capturar'
                        onPress={() => this.takePicture(latitude, longitude, NMPagina)}
                    />
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
});

