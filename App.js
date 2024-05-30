import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Mainbtmbar from './src/components/Mainbtmbar';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Mainbtmbar />
    </NavigationContainer>
  );
};

export default App;
