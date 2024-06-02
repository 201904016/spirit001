import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Mainbtmbar from './src/components/Mainbtmbar';
import MainStack from './src/components/MainStack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default App;
