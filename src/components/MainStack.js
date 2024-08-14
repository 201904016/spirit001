import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Pressable} from 'react-native';
import Mainbtmbar from './Mainbtmbar';
import StoreaddPage from '../pages/StoreaddPage';
import StoreListTabbar from './StoreListTabbar';
import StoreStack from './StoreStack';
import MapStack from './MapStack';
import Test1 from '../pages/Test1';
import AddressSearchPage from '../pages/AddressSearchPage';
import SearchPage from '../pages/Bottomtab/SearchPage';
import ProfileStack from './ProfileStack';

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
      <Stack.Screen
        name="StoreStack"
        component={StoreStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MapStack"
        component={MapStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchPage"
        component={SearchPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Test1" component={Test1} options={{title: 'TEST'}} />
      <Stack.Screen
        name="AddressSearchPage"
        component={AddressSearchPage}
        options={{title: '주소 검색'}}
      />
      <Stack.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
