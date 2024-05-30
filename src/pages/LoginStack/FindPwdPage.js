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
import styles from '../../styles/FindPwdStyle';

const FindPwdPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.midBox}>
        <View style={{marginBottom: 40, marginTop: 50}}>
          <Text style={styles.linkBold}>
            스피릿과 함께한 휴대폰 번호를 입력해주세요.
          </Text>

          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.inputPh}
              placeholder="숫자만 입력해주세요."
            />

            <Pressable style={styles.mBtn1}>
              <Text style={{color: 'gray', fontWeight: '600'}}>
                인증번호 요청
              </Text>
            </Pressable>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.inputPh}
              placeholder="인증번호를 입력해주세요."
            />

            <Pressable style={styles.mBtn2}>
              <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>
                인증번호 확인
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={{marginBottom: 20}}>
          <Text style={styles.linkBold}>새 비밀번호</Text>
          <TextInput
            style={styles.input}
            placeholder="새로운 비밀번호를 입력해주세요."
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
      </View>

      <View style={styles.btBox}>
        <View>
          <Pressable style={styles.pwBtn1}>
            <Text Text style={{color: 'gray', fontWeight: '600'}}>
              비밀번호 변경
            </Text>
          </Pressable>
        </View>
        <View>
          <Pressable style={styles.pwBtn2}>
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
