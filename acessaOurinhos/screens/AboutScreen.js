import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';

export default class AboutScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        <View>
          <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
            <Image style={{ marginLeft: 15, width: 100, height: 100 }} source={require("../assets/images/robot-prod.png")}></Image>
            <View>
              <Text style={{ paddingTop: 20, marginLeft: 10, fontSize: 24 }}>Acessa Ourinhos</Text>
              <Text style={{ marginLeft: 10, fontSize: 16, color: 'gray' }}>Acessa Ourinhos</Text>
            </View>
          </View>
          <View style={{ backgroundColor: '#e7e6e2' }}>
            <Text style={{ marginLeft: 15, fontSize: 16, fontWeight: 'bold' }}>Resumo</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ marginLeft: 15, fontSize: 14, marginRight: 10, textAlign: 'justify' }}>
              “Acessa Ourinhos”, propõe, por meio de
              tecnologias sociais, criar um canal de utilidade pública para auxiliar na
              prevenção e solução de questões de acessibilidade urbana. Buscando, assim,
              contribuir para “Tornar as cidades e os assentamentos humanos inclusivos,
              seguros, resilientes e sustentáveis” (ONU/BR, 2015), ao propiciar
              conhecimento, condições de transformação e possibilidade de efetivação das
              ações no âmbito do planejamento e gestão urbanos, criando um laço entre
              universidade, poder público, e comunidades.
            </Text>
          </View>
          <View style={{ backgroundColor: '#e7e6e2', marginTop: 10 }}>
            <Text style={{ marginLeft: 15, fontSize: 16, fontWeight: 'bold'}}>Membros</Text>
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
            <View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ marginLeft: 15, fontSize: 14, marginRight: 10, textAlign: 'justify', fontWeight: 'bold' }}>
                  Equipe Fatec:
            </Text>
                <Text style={{ marginLeft: 15, fontSize: 14, marginRight: 10, textAlign: 'justify' }}>
                  Alex Marino Gonçalves de Almeida
            </Text>
                <Text style={{ marginLeft: 15, fontSize: 14, marginRight: 10, textAlign: 'justify' }}>
                  Leonardo Santander da Silva
            </Text>
                <Text style={{ marginLeft: 15, fontSize: 14, marginRight: 10, textAlign: 'justify' }}>
                  Lucas Oliveira da Cruz
            </Text>
              </View>
            </View >
            <Image style={{ marginLeft: 15, width: 100, height: 40, marginTop: 20 }} source={require("../assets/images/fatec.png")}></Image>
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: 20 }}>
            <Image style={{ marginLeft: 15, width: 100, height: 30, marginTop: 20 }} source={require("../assets/images/unesp.png")}></Image>
            <View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ marginLeft: 15, fontSize: 14, marginRight: 10, textAlign: 'justify', fontWeight: 'bold' }}>
                  Equipe Unesp:
            </Text>
                <Text style={{ marginLeft: 15, fontSize: 14, marginRight: 10, textAlign: 'justify' }}>
                  Luciano Antonio Furini
            </Text>
                <Text style={{ marginLeft: 15, fontSize: 14, marginRight: 10, textAlign: 'justify' }}>
                  Gabrielly Oliveira Pinto
            </Text>
                <Text style={{ marginLeft: 15, fontSize: 14, marginRight: 10, textAlign: 'justify' }}>
                  Joao Victor Gonçalves Moreira
            </Text>
                <Text style={{ marginLeft: 15, fontSize: 14, marginRight: 10, textAlign: 'justify' }}>
                  Matheus de Oliveira Kamaguso Jamaico
            </Text>
              </View>
            </View >
          </View>
        </View>
      </ScrollView>
    )
  }
}

AboutScreen.navigationOptions = {
  title: 'Sobre o Projeto',
};
