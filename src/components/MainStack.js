import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Pressable} from 'react-native';
import Mainbtmbar from './Mainbtmbar';
import StoreaddPage from '../pages/StoreaddPage';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mainbtmbar"
        component={Mainbtmbar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StoreaddPage"
        component={StoreaddPage}
        options={{
          title: '매장 등록하기',
        }}
      />
    </Stack.Navigator>
  );
}
