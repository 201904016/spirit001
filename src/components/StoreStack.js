import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import StoreMainPage from '../pages/StoreInner/StoreMainPage';
import MenuaddPage from '../pages/StoreInner/MenuaddPage';
import CommonRiviewPage from '../pages/StoreInner/CommonRiviewPage';
import ReceiptRiviewPage from '../pages/StoreInner/ReceiptRiviewPage';
import UpdateMenu from '../pages/StoreInner/UpdateMenu';
import UpdateStore from '../pages/StoreInner/UpdateStore';

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
        options={{title: '메뉴 등록하기'}}
      />
      <Stack.Screen
        name="CommonRiviewPage"
        component={CommonRiviewPage}
        options={{title: '일반 리뷰'}}
      />
      <Stack.Screen
        name="ReceiptRiviewPage"
        component={ReceiptRiviewPage}
        options={{title: '영수증 리뷰'}}
      />
      <Stack.Screen
        name="UpdateMenu"
        component={UpdateMenu}
        options={{title: '메뉴 수정하기'}}
      />
      <Stack.Screen
        name="UpdateStore"
        component={UpdateStore}
        options={{title: '매장 수정하기'}}
      />
    </Stack.Navigator>
  );
}
