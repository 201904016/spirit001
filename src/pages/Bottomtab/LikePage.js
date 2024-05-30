import React from 'react';
import useBackButtonToMain from '../../components/useBackButtonToMain ';
import {Text, View} from 'react-native';

const LikePage = () => {
  useBackButtonToMain();
  return (
    <View>
      <Text>LikePage</Text>
    </View>
  );
};

export default LikePage;
