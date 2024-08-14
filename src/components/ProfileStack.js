import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ConfigPage from '../pages/Bottomtab/MyPageinner/ConfigPage';
import Myemailchange from '../pages/Bottomtab/MyPageinner/Myemailchange';
import Mypwchange from '../pages/Bottomtab/MyPageinner/Mypwchange';
import Mynickchange from '../pages/Bottomtab/MyPageinner/Mynickchange';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="ConfigPage">
      <Stack.Screen
        name="ConfigPage"
        component={ConfigPage}
        options={{title: '프로필 수정'}}
      />
      <Stack.Screen
        name="Myemailchange"
        component={Myemailchange}
        options={{title: '이메일 변경'}}
      />
      <Stack.Screen
        name="Mypwchange"
        component={Mypwchange}
        options={{title: '비밀번호 변경'}}
      />
      <Stack.Screen
        name="Mynickchange"
        component={Mynickchange}
        options={{title: '닉네임 변경'}}
      />
    </Stack.Navigator>
  );
}
