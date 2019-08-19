import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Platform, Image } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import AboutScreen from '../screens/AboutScreen';
import InsertCalcadaScreen from '../screens/InsertCalcadaScreen';
import InsertRuaScreen from '../screens/InsertRuaScreen';
import InsertPredioScreen from '../screens/InsertPredioScreen';
import ButtonsScreen from '../screens/ButtonsScreen';
import CaptureScreen from '../screens/CaptureScreen';
import ExibeImagemScreen from '../screens/ExibeImagemScreen';

//import MainTabNavigator from './MainTabNavigator';
const HomeStack = createStackNavigator({ Home: HomeScreen });
const MapStack = createStackNavigator({
  Mapa: MapScreen,
});
const InsertReclamacoesStack = createStackNavigator({
  Capture: CaptureScreen,
  ExibeImagem: ExibeImagemScreen,
  Buttons: ButtonsScreen,
  CalcadaInsert: InsertCalcadaScreen,
  RuaInsert: InsertRuaScreen,
  PredioInsert: InsertPredioScreen,

})
const AboutStack = createStackNavigator({ Sobre: AboutScreen })

HomeStack.navigationOptions = {
  tabBarLabel: 'Inicio',
  tabBarIcon: ({ focused }) => {
    return (
      focused == true ?
        <Image
          style={{ width: 25, height: 25 }}
          source={require("../assets/images/icons/homeblue.png")} /> :
        <Image
          style={{ width: 25, height: 25 }}
          source={require("../assets/images/icons/home.png")} />
    );
  }
};

MapStack.navigationOptions = {
  tabBarLabel: 'Mapa',
  tabBarIcon: ({ focused }) => {
    return (
      focused == true ?
        <Image
          style={{ width: 25, height: 25 }}
          source={require("../assets/images/icons/mapblue.png")} /> :
        <Image
          style={{ width: 25, height: 25 }}
          source={require("../assets/images/icons/map.png")} />
    );
  }
};

AboutStack.navigationOptions = {
  tabBarLabel: 'Sobre o Projeto',
  tabBarIcon: ({ focused }) => {
    return (
      focused == true ?
        <Image
          style={{ width: 25, height: 25 }}
          source={require("../assets/images/icons/infoblue.png")} /> :
        <Image
          style={{ width: 25, height: 25 }}
          source={require("../assets/images/icons/info.png")} />
    );
  }
};


const tabNavigator = createBottomTabNavigator({
  HomeStack,
  MapStack,
  AboutStack,
});

const Navegacao = createSwitchNavigator(
  {
    App: tabNavigator,
    Home: HomeStack,
    Mapa: MapStack,
    Sobre: AboutStack,
    Reclamacoes: InsertReclamacoesStack
  },
  {
    initialRouteName: 'App',
  },
)

export default createAppContainer(Navegacao);
