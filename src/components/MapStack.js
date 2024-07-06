import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Test1 from '../pages/Test1';

const Stack1 = createStackNavigator();

export default function MapStack() {
  return (
    <Stack1.Navigator initialRouteName="Test1">
      <Stack1.Screen
        name="Test1"
        component={Test1}
        options={{title: '주소 검색'}}
      />
    </Stack1.Navigator>
  );
}
