import React from 'react';
import useBackButtonToMain from '../../components/useBackButtonToMain ';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginStack from '../../components/LoginStack';

const MyPage = () => {
  useBackButtonToMain();
  return <LoginStack />;
};

export default MyPage;
