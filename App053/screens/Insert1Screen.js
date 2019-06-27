import React from 'react';
import {
  Alert,
  SafeAreaView,
  TextInput,
  Button,
  ActivityIndicator,
  Text,
  Picker,
  ScrollView,
  View,
  StyleSheet
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Dimensions } from "react-native";
import firebase from 'firebase';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const validationSchema = yup.object().shape({
  endereco: yup
    .string()
    .label('Endereço'),
  numero: yup
    .number()
    .label('Numero'),
  bairro: yup
    .string()
    .label('Bairro'),
  cep: yup
    .string()
    .label('CEP'),
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

var radio_props = [
  {label: 'param1', value: 0 },
  {label: 'param2', value: 1 }
];

export default class Insert1Screen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      enviando: true,
      local: [{},],
      tipo: [{},],
      valbd: [],
    }
  }


  render() {

    const { navigation } = this.props;
    const latitude = navigation.getParam('latitude');
    const longitude = navigation.getParam('longitude');

    return (
      <ScrollView>
        <SafeAreaView style={{ marginTop: 50 }}>

          <Text style={styles.welcome}>Nova Reclamação - Calçadas</Text>
          <Formik
            initialValues={{ endereco: '', local: '', numero: '', bairro: '', cep: '', observacao: '', local: '',latitude: latitude,longitude:longitude,description:'',title:'' }}
            onSubmit={(values, actions) => {

              var that = this;

              that._isMounted = true;
              
              var rootRef = firebase.database().ref();
                            
              //alert(JSON.stringify(values));
              var ref = rootRef.child("users");
              var contador = 0;
                            
              ref.once("value").then(function (snapshot) {
                snapshot.forEach(function(childSnapshot) {
                  contador++;
                  //console.log("**Contador: ",contador);
                });

                ref.child(contador).set(values);
              });
              
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 1000);

              Alert.alert("Obrigado!","Sua reclamação foi adicionada! Agradecemos por colaborar com nossa cidade!");
              that.props.navigation.navigate('Home');
            }}
            validationSchema={validationSchema}
          >
            {formikProps => (
              <React.Fragment>
                
                <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                  <Text style={{ marginBottom: 3 }}>Problema:</Text>
                  <TextInput readOnly 
                    style={styles.styleForm}
                    onChangeText={formikProps.handleChange('problema')}
                    onBlur={formikProps.handleBlur('problema')}
                    value='Calçada'
                  />
                  <Text style={{ color: 'red' }}>
                    {formikProps.touched.endereco && formikProps.errors.endereco}
                  </Text>
                </View>

                <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                  <Text style={{ marginBottom: 3 }}>Endereço</Text>
                  <TextInput
                    placeholder="Nome da rua"
                    style={styles.styleForm}
                    onChangeText={formikProps.handleChange('endereco')}
                    onBlur={formikProps.handleBlur('endereco')}
                  />
                  <Text style={{ color: 'red' }}>
                    {formikProps.touched.endereco && formikProps.errors.endereco}
                  </Text>
                </View>

                <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                  <Text style={{ marginBottom: 3 }}>Número</Text>
                  <TextInput
                    placeholder="nº"
                    style={styles.styleForm}
                    onChangeText={formikProps.handleChange('numero')}
                    onBlur={formikProps.handleBlur('numero')}
                  />
                  <Text style={{ color: 'red' }}>
                    {formikProps.touched.numero && formikProps.errors.numero}
                  </Text>

                  <Text style={{ marginBottom: 3 }}>Bairro</Text>
                  <TextInput
                    placeholder="Nome do Bairro"
                    style={styles.styleForm}
                    onChangeText={formikProps.handleChange('bairro')}
                    onBlur={formikProps.handleBlur('bairro')}
                  />
                  <Text style={{ color: 'red' }}>
                    {formikProps.touched.bairro && formikProps.errors.bairro}
                  </Text>
                </View>

                <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                  <Text style={{ marginBottom: 3 }}>CEP</Text>
                  <TextInput
                    placeholder="cep"
                    style={styles.styleForm}
                    onChangeText={formikProps.handleChange('cep')}
                    onBlur={formikProps.handleBlur('cep')}
                  />
                  <Text style={{ color: 'red' }}>
                    {formikProps.touched.cep && formikProps.errors.cep}
                  </Text>
                </View>

                

                {/*  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                  <Text style={{ marginBottom: 3 }}>Local</Text>
                  <Picker
                    selectedValue={this.state.local}
                    style={{ height: 50, width: width - 20 }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ local: itemValue })
                    }>
                    <Picker.Item label="Selecione um local" value="" />
                    <Picker.Item label="Rampas " value="Rampas " />
                    <Picker.Item label="Cobertura nos pontos de ônibus" value="Cobertura nos pontos de ônibus" />
                    <Picker.Item label="Piso" value="Piso" />
                    <Picker.Item label="Iluminaçao publica" value="Iluminaçao publica" />
                    <Picker.Item label="Obstáculos" value="Obstáculos" />
                    <Picker.Item label="Árvores" value="Árvores" />
                    <Picker.Item label="Sinalização" value="Sinalização" />
                    <Picker.Item label="Placas, lixeiras, postes e outros " value="Placas, lixeiras, postes e outros " />
                    <Picker.Item label="Pontos de ônibus" value="Pontos de ônibus" />
                  </Picker>
                  <Text style={{ color: 'red' }}>
                    {formikProps.touched.local && formikProps.errors.local}
                  </Text>
                  </View>*

                <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                  <Text style={{ marginBottom: 3 }}>Problema</Text>
                  <Picker
                    selectedValue={this.state.tipo}
                    style={{ height: 50, width: width - 20 }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ tipo: itemValue })
                    }>
                    <Picker.Item label="Selecione um problema" value="" />
                    <Picker.Item label="Ausência " value="Ausência " />
                    <Picker.Item label="Buracos " value="Buracos" />
                    <Picker.Item label="Falta de conservação" value="Falta de conservação" />
                    <Picker.Item label="Irregularidades" value="Irregularidades" />
                    <Picker.Item label="Outros problemas" value="Outros problemas" />
                  </Picker>
                  <Text style={{ color: 'red' }}>
                    {formikProps.touched.tipo && formikProps.errors.tipo}
                  </Text>
                  </View>*/}

                  

                <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                  <Text style={{ marginBottom: 3 }}>Observações:</Text>
                  <TextInput
                    placeholder="descrição do problema"
                    multiline={true}
                    numberOfLines={4}
                    style={styles.styleForm}
                    onChangeText={formikProps.handleChange('observacao')}
                    onBlur={formikProps.handleBlur('observacao')}
                  />
                  <Text style={{ color: 'red' }}>
                    {formikProps.touched.observacao && formikProps.errors.observacao}
                  </Text>
                </View>

                <View>
                  <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    onPress={(value) => {this.setState({value:value})}}/>
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
    marginBottom: 3,

  }
});