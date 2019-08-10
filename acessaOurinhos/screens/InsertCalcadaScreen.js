import React from 'react';
import {
  Alert,
  SafeAreaView,
  TextInput,
  Button,
  ActivityIndicator,
  Text,
  ScrollView,
  View,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Dimensions } from "react-native";
import firebase from 'firebase';

const SCREENWIDTH = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const validationSchema = yup.object().shape({
  observacao: yup
    .string()
    .label('Observação'),
  local: yup
    .string(),
  description: yup
    .string(),
  title: yup
    .string(),

});

const pickerArvores = [
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

const pickerCobertura = [
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

const pickerObstaculos = [
  {
    title: 'Desníveis ou degraus na calçada',
    value: 'Desníveis ou degraus na calçada'
  },
  {
    title: 'Buracos na calçada',
    value: 'Buracos na calçada'
  },
  {
    title: 'Placas, lixeiras, postes e outros em locais inadequados na calçada',
    value: 'Placas, lixeiras, postes e outros em locais inadequados na calçada'
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

const pickerPontos = [
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

export default class InsertCalcadaScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      enviando: true,
      local: [{},],
      tipo: [{},],
      valbd: [],

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

    if (valor == 'Árvores') {
      this.setState({
        teste: pickerArvores
      })
    } else if (valor == 'Cobertura nos pontos de ônibus') {
      this.setState({
        teste: pickerCobertura
      })
    } else if (valor == 'Iluminação pública') {
      this.setState({
        teste: pickerIluminacao
      })
    } else if (valor == 'Obstáculos') {
      this.setState({
        teste: pickerObstaculos
      })
    } else if (valor == 'Piso') {
      this.setState({
        teste: pickerPiso
      })
    } else if (valor == 'Placas, lixeiras, postes e outros') {
      this.setState({
        teste: pickerPlacas
      })
    } else if (valor == 'Pontos de ônibus') {
      this.setState({
        teste: pickerPontos
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

    const pickerProblema = [
      {
        title: 'Árvores',
        value: 'Árvores'
      },
      {
        title: 'Cobertura nos pontos de ônibus',
        value: 'Cobertura nos pontos de ônibus'
      },
      {
        title: 'Iluminação pública',
        value: 'Iluminação pública'
      },
      {
        title: 'Obstáculos',
        value: 'Obstáculos'
      },
      {
        title: 'Piso',
        value: 'Piso'
      },
      {
        title: 'Placas, lixeiras, postes e outros',
        value: 'Placas, lixeiras, postes e outros'
      },
      {
        title: 'Pontos de ônibus',
        value: 'Pontos de ônibus'
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

            <Text style={styles.welcome}>Calçadas</Text>
            <Formik
              initialValues={{ endereco: '', problema: 'Ruas', especificacao: '', detalhe: '', numero: '', bairro: '', cep: '', observacao: '', local: '', latitude: latitude, longitude: longitude, description: '', title: '' }}
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
                that.props.navigation.navigate('Home');
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

                    <Modal visible={this.state.pickerDisplayed} animationType={"slide"} transparent={true}>
                      <View style={{
                        backgroundColor: '#efefef',
                        marginBottom: 30,
                        height: 200,
                        width: SCREENWIDTH,
                        bottom: 18,
                        position: 'absolute'
                      }}>
                        <ScrollView style={{ width: SCREENWIDTH, paddingLeft: 10, paddingRight: 10 }}>
                          <Text style={{
                            fontSize: 18, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10, alignItems: 'center',
                            justifyContent: 'center', alignSelf: 'center'
                          }}>Escolha Um problema</Text>
                          {pickerProblema.map((value, index) => {

                            return <TouchableHighlight key={index} onPress={() => { this.setPickerValue(value.value); this.mudaPicker(value.value); formikProps.setFieldValue('especificacao', value.value) }} style={{
                              paddingTop: 4, paddingBottom: 4, alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                              <Text>{value.title}</Text>
                            </TouchableHighlight>
                          })}
                        </ScrollView>
                        <TouchableHighlight onPress={() => this.togglePicker()} style={{
                          paddingTop: 4, paddingBottom: 4, alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <Text style={{ paddingTop: 10, color: '#999', paddingBottom: 10, fontSize: 18, fontWeight: 'bold' }}>Cancelar</Text>
                        </TouchableHighlight>
                      </View>
                    </Modal>
                  </View>

                  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>

                    <Text>Detalhes do Problema</Text>
                    <TouchableOpacity style={styles.pickerStyle} onPress={() => this.togglePicker2()} >
                      <Text>{this.state.pickerSelection2}</Text>
                    </TouchableOpacity>

                    <Modal visible={this.state.pickerDisplayed2} animationType={"slide"} transparent={true}>
                      <View style={{
                        backgroundColor: '#efefef',
                        marginBottom: 30,
                        height: 160,
                        width: SCREENWIDTH,
                        bottom: 18,
                        position: 'absolute'
                      }}>
                        <ScrollView style={{ width: SCREENWIDTH, paddingLeft: 10, paddingRight: 10 }}>
                          <Text style={{
                            fontSize: 18, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10, alignItems: 'center',
                            justifyContent: 'center', alignSelf: 'center'
                          }}>Escolha Um problema</Text>
                          {this.state.teste.map((value, index) => {

                            return <TouchableHighlight key={index} onPress={() => { this.setPickerValue2(value.value); this.mudaPicker(value.value); formikProps.setFieldValue('detalhe', value.value) }} style={{
                              paddingTop: 4, paddingBottom: 4, alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                              <Text>{value.title}</Text>
                            </TouchableHighlight>
                          })}

                        </ScrollView>
                        <TouchableHighlight onPress={() => this.togglePicker2()} style={{
                          paddingTop: 4, paddingBottom: 4, alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <Text style={{ paddingTop: 10, color: '#999', paddingBottom: 10, fontSize: 18, fontWeight: 'bold' }}>Cancelar</Text>
                        </TouchableHighlight>
                      </View>
                    </Modal>
                  </View>

                  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                    <Text style={{ marginBottom: 3 }}>Observações:</Text>
                    <TextInput
                      placeholder="descrição do problema"
                      style={styles.styleForm}
                      onChangeText={formikProps.handleChange('observacao')}
                      onBlur={formikProps.handleBlur('observacao')}
                    />
                    <Text style={{ color: 'red', }}>
                      {formikProps.touched.observacao && formikProps.errors.observacao}
                    </Text>
                  </View>

                  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                    <Button
                      style={{ marginLeft: 50, marginRight: 50 }}
                      large
                      icon={{ name: 'camera', type: 'font-awesome' }}
                      title='Enviar Foto'
                      onPress={() => this.props.navigation.navigate('Capture')}
                    />
                  </View>

                  {formikProps.isSubmitting ? (
                    <ActivityIndicator />
                  ) : (
                      <Button title="Enviar" onPress={formikProps.handleSubmit} />

                    )}
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
    height:100,
    marginBottom: 3,

  },
  pickerStyle: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 3,
  }
});

InsertCalcadaScreen.navigationOptions = {
  title: 'Nova Reclamação',
};
