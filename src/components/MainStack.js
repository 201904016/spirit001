import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Pressable} from 'react-native';
import Mainbtmbar from './Mainbtmbar';
import StoreaddPage from '../pages/StoreaddPage';
import StoreListTabbar from './StoreListTabbar';

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
      <Stack.Screen
        name="StoreListTabbar"
        component={StoreListTabbar}
        options={{
          title: '스피릿 둘러보기',
        }}
      />
    </Stack.Navigator>
  );
}
