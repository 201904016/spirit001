import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginPage from '../pages/LoginStack/LoginPage';
import FindPwdPage from '../pages/LoginStack/FindPwdPage';
import SignUpPage from '../pages/LoginStack/SignUpPage';
import MainPage from '../pages/MainPage';
import {Pressable} from 'react-native';

const Stack = createStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator initialRouteName="LoginPage">
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={({navigation}) => ({
          title: '로그인',
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate(MainPage)}>
              <Ionicons
                name="arrow-back-outline"
                size={25}
                color="black"
                style={{marginLeft: 13, paddingRight: 15}}
              />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="FindPwdPage"
        component={FindPwdPage}
        options={{
          title: '비밀번호 찾기',
        }}
      />
      <Stack.Screen
        name="SignUpPage"
        component={SignUpPage}
        options={{
          title: '회원가입',
        }}
      />
    </Stack.Navigator>
  );
}
