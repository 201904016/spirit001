import React from 'react';
import useBackButtonToMain from '../../components/useBackButtonToMain ';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TextInput,
} from 'react-native';

const SearchPage = () => {
  useBackButtonToMain();
  return (
    <View>
      <View>
        <Text>SearchPage</Text>
      </View>
    </View>
  );
};

export default SearchPage;
