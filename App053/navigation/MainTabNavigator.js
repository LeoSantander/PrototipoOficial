import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Insert1Screen from '../screens/Insert1Screen';
import Insert2Screen from '../screens/Insert2Screen';
import Insert3Screen from '../screens/Insert3Screen';
import ButtonsScreen from '../screens/ButtonsScreen';
import teste from '../screens/teste'


const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Página Inicial',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Mapa',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Sobre o Projeto',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-information-circle' : 'md-information-circle'}
    />
  ),
};

const MapsStack = createStackNavigator({
  Insert1: Insert1Screen,
  Insert2: Insert2Screen,
  Insert3: Insert3Screen,
  Buttons: ButtonsScreen,
  });

const Testando = createStackNavigator({
  EsteTeste: teste,
}); 


export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
  Testando,
});
