import React, {useState} from 'react';
import useBackButtonToMain from '../../components/useBackButtonToMain ';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginStack from '../../components/LoginStack';
import {View, Text} from 'react-native';

const MyPage = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <View>
      <Text>MyPage</Text>
    </View>
  );
};

export default MyPage;
