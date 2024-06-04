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
import styles from '../../styles/SignUpPageStyle';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [verifyemail, setVerifyemail] = useState('');

  const handleEmailChange = text => {
    setEmail(text);
  };
  const handlesetVerifyemailChange = text => {
    setVerifyemail(text);
  };
  const handlpasswordChange = text => {
    setPassword(text);
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
        return response.json();
      })
      .then(response => {
        console.log(response.data);
        console.log('보냄');
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
        return response.json();
      })
      .then(response => {
        console.log(response.data);
        console.log('인증성공');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const SignUp = () => {
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
        return response.json();
      })
      .then(response => {
        console.log(response.data);
        console.log('회원가입완료');
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
          <Text style={styles.linkBold}>휴대폰번호</Text>

          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.inputPh}
              placeholder="숫자만 입력해주세요."
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
          />
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
        <Text style={styles.linkOrange}>이미 사용중인 닉네임입니다.</Text>
      </View>
      <View>
        <Pressable style={styles.LoginButton} onPress={SignUp}>
          <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>시작하기</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUpPage;
