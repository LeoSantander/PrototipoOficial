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
                             

                {/* 

                  Picker do problema

                  Picker do detalhamento do problema! 

                  Colocar Campo de FOTO - PESQUISAR componente 

                */}

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