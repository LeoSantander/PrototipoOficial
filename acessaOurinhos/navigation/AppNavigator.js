import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import CaptureScreen from '../screens/CaptureScreen';


export default createAppContainer(
  createSwitchNavigator({
    
    Main: MainTabNavigator,
  })
);
