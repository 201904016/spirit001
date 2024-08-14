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
  Alert,
} from 'react-native';
import styles from '../../styles/LoginPageStyle';
import SignUpPage from './SignUpPage';
import FindPwdPage from './FindPwdPage';
import {storeToken} from '../../store/Storage';
import {useAuth} from '../../context/AuthContext';

const LoginPage = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setLoggedIn} = useAuth();

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handlpasswordChange = text => {
    setPassword(text);
  };

  const Login = () => {
    if (email === null || password === null) {
      return;
    } else {
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
          if (response.status != 200) {
            Alert.alert(
              '이메일 및 비밀번호를 확인해 주세요',
              '',
              [
                {
                  text: '확인',
                  style: 'destructive',
                },
              ],
              {cancelable: false},
            );
            return;
          } else {
            return response.json();
          }
        })
        .then(response => {
          if (response) {
            Alert.alert(
              '로그인 되었습니다.',
              '',
              [
                {
                  text: '확인',
                  style: 'destructive',
                  onPress: () => {
                    storeToken(response.data.accessToken);
                    setLoggedIn(true); // 로그인 상태 true로 설정
                    navigation.navigate('MainPage');
                  },
                },
              ],
              {cancelable: false},
            );
            console.log(response.data);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
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
          placeholder="email"
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
