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
import styles from '../../styles/FindPwdStyle';
import {Timer} from '../../hooks/Timer';

const FindPwdPage = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifypassword, setverifyPassword] = useState('');
  const [verifyemail, setVerifyemail] = useState('');
  const [verifytoken, setVerifytoken] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handlpasswordChange = text => {
    setPassword(text);
  };

  const handlverifypasswordChange = text => {
    setverifyPassword(text);
  };

  const handlsetVerifyemailChange = text => {
    setVerifyemail(text);
  };

  const handlVerifytokenChange = text => {
    setVerifytoken(text);
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

    fetch('http://kymokim.iptime.org:11082/api/auth/getTempToken', {
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
          response.json().then(data => {
            console.log(data.data);
            handlVerifytokenChange(data.data);

            setIsButtonEnabled(true);

            Alert.alert(
              '인증 성공',
              '',
              [
                {
                  text: '확인',
                  style: 'destructive',
                },
              ],
              {cancelable: false},
            );
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const PutPassword = () => {
    var data = {
      password: password,
    };
    if (password !== verifypassword) {
      setShowPasswordError(true);
      return;
    } else {
      setShowPasswordError(false);
    }

    fetch('http://kymokim.iptime.org:11082/api/auth/changePassword', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': verifytoken,
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        Alert.alert(
          '비밀번호 변경 완료',
          '',
          [
            {
              text: '확인',
              style: 'destructive',
              onPress: () => navigation.navigate('LoginPage'),
            },
          ],
          {cancelable: false},
        );
        console.log('변경성공');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.midBox}>
        <View style={{marginBottom: 40, marginTop: 50}}>
          <Text style={styles.linkBold}>
            스피릿과 함께한 이메일를 입력해주세요.
          </Text>

          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.inputPh}
              placeholder="EMAIL"
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
              onChangeText={handlsetVerifyemailChange}
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
          <Text style={styles.linkBold}>새 비밀번호</Text>
          <TextInput
            style={styles.input}
            placeholder="새로운 비밀번호를 입력해주세요."
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
      </View>

      <View style={styles.btBox}>
        <View>
          <Pressable
            style={[
              styles.pwBtn2,
              isButtonEnabled ? styles.activeButton : styles.disabledButton,
            ]}
            onPress={PutPassword}
            disabled={!isButtonEnabled}>
            <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>
              비밀번호 변경
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default FindPwdPage;
