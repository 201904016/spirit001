import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import StoreMainPage from '../pages/StoreInner/StoreMainPage';
import MenuaddPage from '../pages/StoreInner/MenuaddPage';

const Stack = createStackNavigator();

export default function StoreStack() {
  return (
    <Stack.Navigator initialRouteName="StoreMainPage">
      <Stack.Screen
        name="StoreMainPage"
        component={StoreMainPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MenuaddPage"
        component={MenuaddPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
