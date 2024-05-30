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

const MapPage = () => {
  useBackButtonToMain();
  return (
    <View>
      <View>
        <Text>MapPage</Text>
      </View>
    </View>
  );
};

export default MapPage;
