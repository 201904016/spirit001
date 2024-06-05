import React, {useState, useEffect} from 'react';
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
import {useNavigation, StackActions} from '@react-navigation/native';
import styles from '../../styles/SignUpPageStyle';
import LoginPage from './LoginPage';
import {Timer} from '../../hooks/Timer';

const SignUpPage = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifypassword, setverifyPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [verifyemail, setVerifyemail] = useState('');
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showNicknameError, setShowNicknameError] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleEmailChange = text => {
    setEmail(text);
  };
  const handlesetVerifyemailChange = text => {
    setVerifyemail(text);
  };
  const handlpasswordChange = text => {
    setPassword(text);
  };
  const handlverifypasswordChange = text => {
    setverifyPassword(text);
  };
  const handleNameChange = text => {
    setName(text);
  };
  const handlNicknameChange = text => {
    setNickname(text);
  };

  const SendEmail = () => {
    var data = {
      email: email,
    };
    fetch('http://kymokim.iptime.org:11082/api/auth/sendEmail', {
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
            '다시 시도해 주세요',
            '',
            [
              {
                text: '확인',
                style: 'destructive',
              },
            ],
            {cancelable: false},
          );
        } else {
          Alert.alert(
            '인증번호를 보냈습니다.',
            '',
            [
              {
                text: '확인',
                style: 'destructive',
                onPress: () => setIsTimerRunning(true),
              },
            ],
            {cancelable: false},
          );
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const VerifyEmail = () => {
    var data = {
      email: email,
      verificationCode: verifyemail,
    };
    fetch('http://kymokim.iptime.org:11082/api/auth/verifyEmail', {
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
            '인증에 실패하였습니다.',
            '',
            [
              {
                text: '확인',
                style: 'destructive',
              },
            ],
            {cancelable: false},
          );
        } else {
          Alert.alert(
            '인증 성공',
            '',
            [
              {
                text: '확인',
                style: 'destructive',
                onPress: () => setIsButtonEnabled(true),
              },
            ],
            {cancelable: false},
          );
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const SignUp = () => {
    if (
      email === '' ||
      password === '' ||
      verifypassword === '' ||
      nickname === '' ||
      name === ''
    ) {
      Alert.alert(
        '모든 내용을 적어주세요',
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
    }
    if (password !== verifypassword) {
      setShowPasswordError(true);
      return;
    } else {
      setShowPasswordError(false);
    }
    var data = {
      email: email,
      password: password,
      name: name,
      nickname: nickname,
    };

    fetch('http://kymokim.iptime.org:11082/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.status !== 200) {
          return response.json().then(errorData => {
            if (errorData.data === 'AUTH__002') {
              Alert.alert(
                '존재하는 이메일입니다.',
                '',
                [
                  {
                    text: '확인',
                    style: 'destructive',
                  },
                ],
                {cancelable: false},
              );
            } else {
              setShowNicknameError(true);
            }
          });
        } else {
          Alert.alert(
            '회원가입 완료',
            '',
            [
              {
                text: '확인',
                style: 'destructive',
                onPress: () => navigation.navigate(LoginPage),
              },
            ],
            {cancelable: false},
          );
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{marginBottom: 20, marginTop: 30}}>
          <Text style={styles.linkBold}>이름</Text>
          <TextInput
            style={styles.input}
            placeholder="한글 또는 영문으로 입력해주세요."
            value={name}
            onChangeText={handleNameChange}
          />
        </View>

        <View style={{marginBottom: 20}}>
          <Text style={styles.linkBold}>이메일</Text>

          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.inputPh}
              placeholder="이메일"
              value={email}
              onChangeText={handleEmailChange}
            />
            <Pressable style={styles.mBtn1} onPress={SendEmail}>
              <Text style={{color: 'gray', fontWeight: '600'}}>
                인증번호 요청
              </Text>
            </Pressable>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.inputPh}
              placeholder="인증번호를 입력해주세요."
              value={verifyemail}
              onChangeText={handlesetVerifyemailChange}
            />
            <Pressable style={styles.mBtn2} onPress={VerifyEmail}>
              <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>
                인증번호 확인
              </Text>
            </Pressable>
          </View>
          {isTimerRunning && <Timer />}
        </View>

        <View style={{marginBottom: 20}}>
          <Text style={styles.linkBold}>비밀번호</Text>
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChangeText={handlpasswordChange}
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 다시한번 입력해주세요."
            value={verifypassword}
            onChangeText={handlverifypasswordChange}
          />
          {showPasswordError && (
            <Text style={styles.linkOrange}>비밀번호가 일치하지 않습니다.</Text>
          )}
          <Text style={styles.linkBk}>
            영문, 숫자, 특수문자 중 2종류 이상을 조합하여 8~20자리로 설정해
            주세요.
          </Text>
        </View>
        <Text style={styles.linkBold}>닉네임</Text>
        <TextInput
          style={styles.input}
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChangeText={handlNicknameChange}
        />
        {showNicknameError && (
          <Text style={styles.linkOrange}>이미 사용중인 닉네임입니다.</Text>
        )}
      </View>
      <View>
        <Pressable
          style={[
            styles.LoginButton,
            isButtonEnabled ? styles.activeButton : styles.disabledButton,
          ]}
          onPress={SignUp}
          disabled={!isButtonEnabled}>
          <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>시작하기</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUpPage;
