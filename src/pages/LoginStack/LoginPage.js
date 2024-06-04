import React, {useState} from 'react';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handlpasswordChange = text => {
    setPassword(text);
  };

  const Login = () => {
    var data = {
      email: email,
      password: password,
    };

    fetch('http://kymokim.iptime.org:11082/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Image
          source={require('../../assets/spiritLogo.png')}
          style={styles.imageStyle}
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={handleEmailChange}
          placeholder="전화번호"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={handlpasswordChange}
          placeholder="비밀번호"
        />
      </View>
      <View style={styles.linksContainertext}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Pressable onPress={() => navigation.navigate(SignUpPage)}>
            <Text style={styles.link}>회원가입</Text>
          </Pressable>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.separator}></Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Pressable onPress={() => navigation.navigate(FindPwdPage)}>
            <Text style={styles.link}>비밀번호 찾기</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Pressable style={styles.LoginButton} onPress={Login}>
          <Text>로그인</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginPage;
