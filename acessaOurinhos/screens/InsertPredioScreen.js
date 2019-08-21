import React from 'react';
import {
  Alert,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Text,
  ScrollView,
  View,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Image
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button } from 'react-native-elements';
import { Dimensions } from "react-native";
import firebase from 'firebase';
import Geocode from "react-geocode";
import ExibeImagemScreen from './ExibeImagemScreen';

const SCREENWIDTH = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const validationSchema = yup.object().shape({
  observacao: yup
    .string()
    .label('Observação'),
  especificacao: yup
    .string()
    .required('O campo Problema é obrigatório!'),
  detalhe: yup
    .string()
    .required('O campo Detalhes é obrigatório!'),
});

const pickerEscadas = [
  {
    title: 'Ausência',
    value: 'Ausência'
  },
  {
    title: 'Falta de conservação',
    value: 'Falta de conservação'
  },
  {
    title: 'Irregularidades',
    value: 'Irregularidades'
  },
]

const pickerIluminacao = [
  {
    title: 'Ausência',
    value: 'Ausência'
  },
  {
    title: 'Falta de conservação',
    value: 'Falta de conservação'
  },
  {
    title: 'Irregularidades',
    value: 'Irregularidades'
  },
]

const pickerPiso = [
  {
    title: 'Ausência',
    value: 'Ausência'
  },
  {
    title: 'Falta de conservação',
    value: 'Falta de conservação'
  },
  {
    title: 'Irregularidades',
    value: 'Irregularidades'
  },
]

const pickerPlacas = [
  {
    title: 'Ausência',
    value: 'Ausência'
  },
  {
    title: 'Falta de conservação',
    value: 'Falta de conservação'
  },
  {
    title: 'Irregularidades',
    value: 'Irregularidades'
  },
]

const pickerRampas = [
  {
    title: 'Ausência',
    value: 'Ausência'
  },
  {
    title: 'Falta de conservação',
    value: 'Falta de conservação'
  },
  {
    title: 'Irregularidades',
    value: 'Irregularidades'
  },
]

const pickerSinalizacao = [
  {
    title: 'Ausência',
    value: 'Ausência'
  },
  {
    title: 'Falta de conservação',
    value: 'Falta de conservação'
  },
  {
    title: 'Irregularidades',
    value: 'Irregularidades'
  },
]

export default class InsertPredioScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      enviando: true,
      local: [{},],
      tipo: [{},],
      valbd: [],
      address: '',

      teste: [],
      pickerSelection: 'Selecione um problema',
      pickerDisplayed: false,
      pickerSelection2: 'Selecione um problema',
      pickerDisplayed2: false,
    }
  }

  //picker problema
  setPickerValue(newValue) {
    this.setState({
      pickerSelection: newValue
    })

    this.togglePicker();
  }

  setPickerValue2(newValue2) {
    this.setState({
      pickerSelection2: newValue2
    })

    this.togglePicker2();
  }

  mudaPicker(valor) {

    if (valor == 'Escadas e elevadores') {
      this.setState({
        teste: pickerEscadas
      })
    } else if (valor == 'Iluminação pública') {
      this.setState({
        teste: pickerIluminacao
      })
    } else if (valor == 'Piso') {
      this.setState({
        teste: pickerPiso
      })
    } else if (valor == 'Placas, lixeiras, postes, bancos e outros') {
      this.setState({
        teste: pickerPlacas
      })
    } else if (valor == 'Rampas') {
      this.setState({
        teste: pickerRampas
      })
    } else if (valor == 'Sinalização') {
      this.setState({
        teste: pickerSinalizacao
      })
    }
  }

  togglePicker() {
    this.setState({
      pickerDisplayed: !this.state.pickerDisplayed
    })
  }

  togglePicker2() {
    this.setState({
      pickerDisplayed2: !this.state.pickerDisplayed2
    })
  }
  render() {

    const { navigation } = this.props;
    const latitude = navigation.getParam('latitude');
    const longitude = navigation.getParam('longitude');
    const Teste = navigation.getParam('link');

    if (Teste === undefined) {
      var Download = 'n';
    } else {
      var Download = Teste;
    }

    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey("AIzaSyBJAdP_K_rJ6xwNa2TmMSlhSv_-2Ta1-GY");

    // Get address from latidude & longitude.
    Geocode.fromLatLng(latitude, longitude).then(
      response => {
        this.setState({ address: response.results[0].formatted_address });
        //console.log(address);
      },
      error => {
        console.error(error);
      }
    );

    const pickerProblema = [
      {
        title: 'Escadas e elevadores',
        value: 'Escadas e elevadores'
      },
      {
        title: 'Iluminacão pública',
        value: 'Iluminação pública'
      },
      {
        title: 'Piso',
        value: 'Piso'
      },
      {
        title: 'Placas, lixeiras, postes, bancos e outros',
        value: 'Placas, lixeiras, postes, bancos e outros'
      },
      {
        title: 'Rampas',
        value: 'Rampas'
      },
      {
        title: 'Sinalização',
        value: 'Sinalização'
      },
    ];

    return (
      <KeyboardAvoidingView behavior="position" enabled>
        <ScrollView>
          <SafeAreaView style={{ marginTop: 50 }}>

            <Text style={styles.welcome}>Prédios Públicos e praças</Text>
            <Formik
              initialValues={{ endereco: '', problema: 'Prédios Públicos e praças', especificacao: '', detalhe: '', observacao: '', latitude: latitude, longitude: longitude, Download: '' }}
              onSubmit={(values, actions) => {

                var that = this;

                that._isMounted = true;

                var rootRef = firebase.database().ref();

                //alert(JSON.stringify(values));
                var ref = rootRef.child("users");
                var contador = 0;

                ref.once("value").then(function (snapshot) {
                  snapshot.forEach(function (childSnapshot) {
                    contador++;
                    //console.log("**Contador: ",contador);
                  });

                  ref.child(contador).set(values);
                });

                setTimeout(() => {
                  actions.setSubmitting(false);
                }, 1000);

                Alert.alert("Obrigado!", "Sua reclamação foi adicionada! Agradecemos por colaborar com nossa cidade!");
                that.props.navigation.navigate('App');
              }}
              validationSchema={validationSchema}
            >
              {formikProps => (
                <React.Fragment>

                  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>

                    <Text>Problema</Text>
                    <TouchableOpacity style={styles.pickerStyle} onPress={() => this.togglePicker()} >
                      <Text>{this.state.pickerSelection}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'red' }}>
                      {formikProps.touched.especificacao && formikProps.errors.especificacao}
                    </Text>

                    <View>
                      <Modal
                        animationType="fade"
                        transparent={false}
                        visible={this.state.pickerDisplayed}
                      >
                        <View style={{ marginTop: 22, }}>
                          <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20, }}>
                            <TouchableHighlight onPress={() => { this.togglePicker(); }}>
                              <Text style={{ color: '#eb1c22', fontSize: 18, fontWeight: 'bold', textAlign: 'right' }}>Fechar</Text>
                            </TouchableHighlight>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', borderStyle: 'solid' }}>
                              <Text style={{ fontSize: 25, textAlign: 'left', }}>Escolha um Problema</Text>
                            </View>
                            <ScrollView>
                              <View style={{ marginTop: 20 }}>
                                {pickerProblema.map((value, index) => {

                                  return <TouchableHighlight key={index} onPress={() => { this.setPickerValue(value.value); this.mudaPicker(value.value); formikProps.setFieldValue('especificacao', value.value); formikProps.setFieldValue('endereco', this.state.address); formikProps.setFieldValue('Download', Download) }}
                                    style={{ paddingTop: 4, paddingBottom: 4, }}>
                                    <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                                      <Image style={{ width: 40, height: 40, marginLeft: 10, }}
                                        source={
                                          value.value == 'Escadas e elevadores' ?
                                            require("../assets/images/icones/Elevador.png") :
                                            value.value == 'Iluminação pública' ?
                                              require("../assets/images/icones/luz.png") :
                                              value.value == 'Piso' ?
                                                require("../assets/images/icones/piso1.png") :
                                                value.value == 'Placas, lixeiras, postes, bancos e outros' ?
                                                  require("../assets/images/icones/Lixeira.png") :
                                                  value.value == 'Rampas' ?
                                                    require("../assets/images/icones/Rampa.png") :
                                                    require("../assets/images/icones/Placas.png")}>

                                      </Image>
                                      <Text style={{ fontSize: 18, paddingTop: 10, marginLeft: 5, width: SCREENWIDTH - 80 }}>{value.title}</Text>
                                    </View>
                                  </TouchableHighlight>

                                })}
                              </View>

                            </ScrollView>
                          </View>

                        </View>

                      </Modal>
                    </View>

                  </View>

                  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>

                    <Text>Detalhes do Problema</Text>
                    <TouchableOpacity style={styles.pickerStyle} onPress={() => this.togglePicker2()} >
                      <Text>{this.state.pickerSelection2}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'red' }}>
                      {formikProps.touched.detalhe && formikProps.errors.detalhe}
                    </Text>

                    <View>
                      <Modal
                        animationType="fade"
                        transparent={false}
                        visible={this.state.pickerDisplayed2}
                      >
                        <View style={{ marginTop: 22, }}>
                          <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20, }}>
                            <TouchableHighlight onPress={() => { this.togglePicker2(); }}>
                              <Text style={{ color: '#eb1c22', fontSize: 18, fontWeight: 'bold', textAlign: 'right' }}>Fechar</Text>
                            </TouchableHighlight>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', borderStyle: 'solid' }}>
                              <Text style={{ fontSize: 25, textAlign: 'left', }}>Escolha um Detalhe</Text>
                            </View>
                            <ScrollView>
                              <View style={{ marginTop: 20 }}>
                                {this.state.teste.map((value, index) => {

                                  return <TouchableHighlight key={index} onPress={() => { this.setPickerValue2(value.value); this.mudaPicker(value.value); formikProps.setFieldValue('detalhe', value.value); }}
                                    style={{ paddingTop: 4, paddingBottom: 4, }}>
                                    <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                                      <Image style={{ width: 40, height: 40, marginLeft: 10, }}
                                        source={
                                          value.value == 'Ausência' ?
                                            require("../assets/images/icones/ausencia.png") :
                                            value.value == 'Falta de conservação' ?
                                              require("../assets/images/icones/faltaconservacao.png") :
                                                require("../assets/images/icones/irregular.png")}>

                                      </Image>
                                      <Text style={{ fontSize: 18, paddingTop: 10, marginLeft: 5, width: SCREENWIDTH - 80 }}>{value.title}</Text>
                                    </View>
                                  </TouchableHighlight>

                                })}
                              </View>

                            </ScrollView>
                          </View>

                        </View>

                      </Modal>
                    </View>

                  </View>

                  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                    <Text style={{ marginBottom: 3 }}>Observações:</Text>
                    <TextInput
                      placeholder="descrição do problema"
                      style={styles.styleForm}
                      onChangeText={formikProps.handleChange('observacao')}
                      onBlur={formikProps.handleBlur('observacao')}
                    />
                    <Text style={{ color: 'red' }}>
                      {formikProps.touched.observacao && formikProps.errors.observacao}
                    </Text>
                  </View>

                  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                    {formikProps.isSubmitting ? (
                      <ActivityIndicator />
                    ) : (
                        <TouchableOpacity style={styles.botaoAzul} onPress={formikProps.handleSubmit}>{this.props.type}
                          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <Image style={{ width: 25, height: 25 }} source={require("../assets/images/icons/enviar.png")}></Image>
                            <Text style={{ color: '#FFFFFF', marginLeft: 10, fontSize: 18 }}>Enviar</Text>
                          </View>
                        </TouchableOpacity>

                      )}
                  </View>
                </React.Fragment>
              )}
            </Formik>
            <View style={{ height: 30 }}></View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  styleForm: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    height: 100,
    marginBottom: 3,

  },
  pickerStyle: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 3,
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

InsertPredioScreen.navigationOptions = {
  title: 'Nova Reclamação',
};
