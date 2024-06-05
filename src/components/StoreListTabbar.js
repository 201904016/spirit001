import React, {useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Cocktail from '../pages/StoreList/Cocktail';
import Chicken from '../pages/StoreList/Chicken';
import Chinesefood from '../pages/StoreList/Chinesefood';
import Dried from '../pages/StoreList/Dried';
import Emotional from '../pages/StoreList/Emotional';
import Grilled from '../pages/StoreList/Grilled';
import Group from '../pages/StoreList/Group';
import Hope from '../pages/StoreList/Hope';
import Izakaya from '../pages/StoreList/Izakaya';
import Jokbal from '../pages/StoreList/Jokbal';
import Koreafood from '../pages/StoreList/Koreafood';
import Pancake from '../pages/StoreList/Pancake';
import Pocha from '../pages/StoreList/Pocha';
import Pupbar from '../pages/StoreList/Pupbar';
import Room from '../pages/StoreList/Room';
import Seafood from '../pages/StoreList/Seafood';
import Steamedfood from '../pages/StoreList/Steamedfood';
import Westernfood from '../pages/StoreList/Westernfood';
import Winebar from '../pages/StoreList/Winebar';
import Yajang from '../pages/StoreList/Yajang';

const Tab = createMaterialTopTabNavigator();

const StoreListTabbar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: {width: 100},
        swipeEnabled: false,
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
