import React from 'react';
import {View, Text, Pressable} from 'react-native';
import MenuaddPage from './MenuaddPage';

const StoreMainPage = ({navigation}) => {
  return (
    <View>
      <Text>StoreMainPage</Text>
      <Pressable onPress={() => navigation.navigate('MenuaddPage')}>
        <Text>메뉴추가</Text>
      </Pressable>
    </View>
  );
};

export default StoreMainPage;
