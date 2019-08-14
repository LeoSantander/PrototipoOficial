import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

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
import SuccessScreen from '../screens/SuccessScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';


const MapStack = createStackNavigator(
  {
    Mapa: MapScreen,
    Buttons: ButtonsScreen,
    CalcadaInsert: InsertCalcadaScreen,
    RuaInsert: InsertRuaScreen,
    PredioInsert: InsertPredioScreen,
    Capture: CaptureScreen,
    ExibeImagem: ExibeImagemScreen,
    Success: SuccessScreen,
  },
  config
);

MapStack.navigationOptions = {
  tabBarLabel: 'Mapa', 
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'} />
  ),
};

MapStack.path = '';

const AboutStack = createStackNavigator(
  {
    About: AboutScreen,
  },
  config
);

AboutStack.navigationOptions = {
  tabBarLabel: 'Sobre o Projeto',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'} />
  ),
};

AboutStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  MapStack,
  AboutStack,
});

tabNavigator.path = '';

export default tabNavigator;
