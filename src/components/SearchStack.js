import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Test1 from '../pages/Test1';
import SearchStorePage from '../pages/Bottomtab/SearchStorePage';

const Stack = createStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator initialRouteName="Test1">
      <Stack.Screen
        name="SearchStorePage"
        component={SearchStorePage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
