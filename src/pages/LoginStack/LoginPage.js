import React from 'react';
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
import styles from '../../styles/LoginPageStyle';
import SignUpPage from './SignUpPage';
import FindPwdPage from './FindPwdPage';

const LoginPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Image
          source={require('../../assets/spiritLogo.png')}
          style={styles.imageStyle}
        />
      </View>
      <View>
        <TextInput style={styles.input} placeholder="전화번호" />
        <TextInput style={styles.input} placeholder="비밀번호" />
      </View>
      <View style={styles.linksContainer}>
        <Pressable onPress={() => navigation.navigate(SignUpPage)}>
          <Text style={styles.link}>회원가입</Text>
        </Pressable>
        <Text style={styles.separator}>|</Text>
        <Pressable onPress={() => navigation.navigate(FindPwdPage)}>
          <Text style={styles.link}>비밀번호 찾기</Text>
        </Pressable>
      </View>
      <View>
        <Pressable style={styles.LoginButton}>
          <Text>로그인</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginPage;
