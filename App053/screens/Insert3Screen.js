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

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const validationSchema = yup.object().shape({
  endereco: yup
    .string()
    .label('Endereço')
    .required(),
  numero: yup
    .number()
    .label('Numero')
    .required(),
  bairro: yup
    .string()
    .label('Bairro')
    .required(),
  cep: yup
    .string()
    .label('CEP')
    .required(),
  observacao: yup
    .string()
    .label('Observação'),
  local: yup
    .string(),
});

export default class Insert3Screen extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      local:[{},],
      tipo:[{},],
    }
  }

  render(){
    const { navigation } = this.props;
    const latitude = navigation.getParam('latitude');
    const longitude = navigation.getParam('longitude');

    return(
      <ScrollView>
      <SafeAreaView style={{ marginTop: 50 }}>
        
          <Text style={styles.welcome}>Nova Reclamação - Prédios</Text>
          <Formik
            initialValues={{ endereco: '', local: '', latitude: latitude,longitude:longitude,numero: '', bairro: '', cep: '', observacao: '', local: '', }}
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
                    value='Prédios'
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
                    style={{height: 50, width: width-20}}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({local: itemValue})
                    }>
                    <Picker.Item label="Selecione um local" value="" />
                    <Picker.Item label="Rampas " value="Rampas " />
                    <Picker.Item label="Piso" value="Piso" />
                    <Picker.Item label="Iluminaçao publica" value="Iluminaçao publica" />
                    <Picker.Item label="Sinalização" value="Sinalização" />
                    <Picker.Item label="Placas, lixeiras, postes, bancos e outros" value="Placas, lixeiras, postes, bancos e outros" />
                    <Picker.Item label="Escadas e elevadores" value="Escadas e elevadores" />
                  </Picker>
                  <Text style={{ color: 'red' }}>
                    {formikProps.touched.local && formikProps.errors.local}
                  </Text>
                </View>

                <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                  <Text style={{ marginBottom: 3 }}>Problema</Text>
                  <Picker
                    selectedValue={this.state.tipo}
                    style={{height: 50, width: width-20}}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({tipo: itemValue})
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

                {formikProps.isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <Button title="Enviar" onPress={formikProps.handleSubmit} />
                  
                )}
              </React.Fragment>
            )}
          </Formik>
          <View style={{height:30}}></View>
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
  styleForm:{
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 3,
    
  }
});