import React, {useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Cocktail from '../pages/CategoryList/Cocktail';
import Chicken from '../pages/CategoryList/Chicken';
import Chinesefood from '../pages/CategoryList/Chinesefood';
import Dried from '../pages/CategoryList/Dried';
import Emotional from '../pages/CategoryList/Emotional';
import Grilled from '../pages/CategoryList/Grilled';
import Group from '../pages/CategoryList/Group';
import Hope from '../pages/CategoryList/Hope';
import Izakaya from '../pages/CategoryList/Izakaya';
import Jokbal from '../pages/CategoryList/Jokbal';
import Koreafood from '../pages/CategoryList/Koreafood';
import Pancake from '../pages/CategoryList/Pancake';
import Pocha from '../pages/CategoryList/Pocha';
import Pupbar from '../pages/CategoryList/Pupbar';
import Room from '../pages/CategoryList/Room';
import Seafood from '../pages/CategoryList/Seafood';
import Steamedfood from '../pages/CategoryList/Steamedfood';
import Westernfood from '../pages/CategoryList/Westernfood';
import Winebar from '../pages/CategoryList/Winebar';
import Yajang from '../pages/CategoryList/Yajang';

const Tab = createMaterialTopTabNavigator();

const StoreListTabbar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: {width: 100},
        swipeEnabled: false,
        tabBarActiveTintColor: '#80D2F4', // 선택된 탭 글자 색상
        tabBarIndicatorStyle: {
          backgroundColor: '#80D2F4', // 선택된 탭 아래의 인디케이터 색상
        },
        tabBarInactiveTintColor: '#CFCFCF', // 선택되지 않은 탭 글자 색상
      }}>
      <Tab.Screen
        name="Izakaya"
        component={Izakaya}
        options={{
          title: '이자카야',
        }}
      />
      <Tab.Screen
        name="Koreafood"
        component={Koreafood}
        options={{
          title: '한식주점',
        }}
      />
      <Tab.Screen
        name="Westernfood"
        component={Westernfood}
        options={{
          title: '양식주점',
        }}
      />
      <Tab.Screen
        name="Chinesefood"
        component={Chinesefood}
        options={{
          title: '중화주점',
        }}
      />
      <Tab.Screen
        name="Emotional"
        component={Emotional}
        options={{
          title: '감성주점',
        }}
      />
      <Tab.Screen
        name="Jokbal"
        component={Jokbal}
        options={{
          title: '족발 보쌈',
        }}
      />
      <Tab.Screen
        name="Steamedfood"
        component={Steamedfood}
        options={{
          title: '찜 찌개',
        }}
      />
      <Tab.Screen
        name="Grilled"
        component={Grilled}
        options={{
          title: '구이 탕',
        }}
      />
      <Tab.Screen
        name="Chicken"
        component={Chicken}
        options={{
          title: '치킨',
        }}
      />
      <Tab.Screen
        name="Pancake"
        component={Pancake}
        options={{
          title: '전 막걸리',
        }}
      />
      <Tab.Screen
        name="Dried"
        component={Dried}
        options={{
          title: '마른안주',
        }}
      />
      <Tab.Screen
        name="Seafood"
        component={Seafood}
        options={{
          title: '해산물',
        }}
      />
      <Tab.Screen
        name="Room"
        component={Room}
        options={{
          title: '룸',
        }}
      />
      <Tab.Screen
        name="Group"
        component={Group}
        options={{
          title: '단체 행사',
        }}
      />
      <Tab.Screen
        name="Yajang"
        component={Yajang}
        options={{
          title: '야장',
        }}
      />
      <Tab.Screen
        name="Pocha"
        component={Pocha}
        options={{
          title: '포차',
        }}
      />
      <Tab.Screen
        name="Hope"
        component={Hope}
        options={{
          title: '호프',
        }}
      />
      <Tab.Screen
        name="Winebar"
        component={Winebar}
        options={{
          title: '와인바',
        }}
      />
      <Tab.Screen
        name="Cocktail"
        component={Cocktail}
        options={{
          title: '칵테일',
        }}
      />
      <Tab.Screen
        name="Pupbar"
        component={Pupbar}
        options={{
          title: '펍 바',
        }}
      />
    </Tab.Navigator>
  );
};

export default StoreListTabbar;
