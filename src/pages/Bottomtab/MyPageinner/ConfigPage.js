import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const ConfigPage = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View style={styles.imgview}>
        <Image
          source={require('../../../assets/kim.png')}
          style={styles.profileimg}
        />
      </View>
      <View style={styles.configtopview}>
        <View style={styles.nameview}>
          <Text style={styles.nametext}>이름</Text>
          <Text style={styles.nametext}>김민지</Text>
        </View>
        <View style={styles.nameview}>
          <Text style={styles.nametext}>닉네임</Text>
          <View style={styles.innerview}>
            <Text style={styles.nicknametext}>아무거나 다먹어</Text>
            <Pressable onPress={() => navigation.navigate('Mynickchange')}>
              <FontAwesomeIcon
                name={'angle-right'}
                size={30}
                color={'gray'}
                style={styles.changenick}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.nameview}>
          <Text style={styles.nametext}>비밀번호 변경</Text>
          <Pressable onPress={() => navigation.navigate('Mypwchange')}>
            <FontAwesomeIcon
              name={'angle-right'}
              size={30}
              color={'gray'}
              style={styles.changenick}
            />
          </Pressable>
        </View>
        <View style={styles.nameview}>
          <Text style={styles.nametext}>이메일 변경</Text>
          <Pressable onPress={() => navigation.navigate('Myemailchange')}>
            <FontAwesomeIcon
              name={'angle-right'}
              size={30}
              color={'gray'}
              style={styles.changenick}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.configtopview}>
        <View style={styles.nameview}>
          <Text style={styles.nametext}>로그아웃</Text>
        </View>
        <View style={styles.nameview}>
          <Text style={styles.nametext}>회원 탈퇴</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgview: {
    alignItems: 'center',
    marginVertical: 50,
  },
  profileimg: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  configtopview: {
    marginHorizontal: 30,
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 10,
    marginBottom: 30,
  },
  nameview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderColor: 'lightgray',
  },
  nametext: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  innerview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nicknametext: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 15,
  },
});

export default ConfigPage;
