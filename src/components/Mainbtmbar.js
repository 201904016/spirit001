import React, {useEffect, useState} from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {BackHandler} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import SearchPage from '../pages/Bottomtab/SearchPage';
import MapPage from '../pages/Bottomtab/MapPage';
import MainPage from '../pages/MainPage';
import LikePage from '../pages/Bottomtab/LikePage';
import MyPage from '../pages/Bottomtab/MyPage';
import LoginStack from './LoginStack';
import {useAuth} from '../context/AuthContext';

const Tab = createBottomTabNavigator();

const Mainbtmbar = () => {
  const {isLoggedIn} = useAuth();
  return (
    <Tab.Navigator
      initialRouteName="MainPage"
      screenOptions={({route}) => ({
        tabBarStyle: {
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        },

        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'MainPage') {
            iconName = 'home-outline';
          } else if (route.name === 'MapPage') {
            iconName = 'map-outline';
          } else if (route.name === 'SearchPage') {
            iconName = 'search-outline';
          } else if (route.name === 'LikePage') {
            iconName = 'heart-outline';
          } else if (route.name === 'MyPage') {
            iconName = 'person-outline';
          } else if (route.name === 'LoginStack') {
            iconName = 'person-outline';
          }

          return <Ionicons name={iconName} size={25} color={'black'} />;
        },
      })}>
      <Tab.Screen
        name="SearchPage"
        component={SearchPage}
        options={{headerShown: false, tabBarLabel: '검색'}}
      />
      <Tab.Screen
        name="MapPage"
        component={MapPage}
        options={{tabBarLabel: '지역', headerShown: false}}
      />
      <Tab.Screen
        name="MainPage"
        component={MainPage}
        options={{
          tabBarLabel: '홈',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="LikePage"
        component={LikePage}
        options={({navigation}) => ({
          tabBarLabel: '찜',
          title: '찜',
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

      {isLoggedIn ? (
        <Tab.Screen
          name="MyPage"
          component={MyPage}
          options={({navigation}) => ({
            tabBarLabel: '마이',
            title: '마이페이지',
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
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate(MainPage)}>
                <FontAwesomeIcon
                  name="bell-o"
                  size={25}
                  color="black"
                  style={{marginLeft: 13, paddingRight: 15}}
                />
              </Pressable>
            ),
          })}
        />
      ) : (
        <Tab.Screen
          name="LoginStack"
          component={LoginStack}
          options={{tabBarLabel: '마이', headerShown: false}}
        />
      )}
    </Tab.Navigator>
  );
};

export default Mainbtmbar;
