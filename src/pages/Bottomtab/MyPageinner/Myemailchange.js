import React from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';

const Myemailchange = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'space-between',
      }}>
      <View>
        <View style={styles.topview}>
          <Text style={styles.nickname}>새로운 이메일</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.topinnerview}>
          <Text style={styles.nickname}>인증번호</Text>
          <TextInput style={styles.input} />
        </View>
      </View>
      <Pressable style={styles.completebtn}>
        <Text style={styles.completebtntext}>완료</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  topview: {
    marginTop: 50,
    marginHorizontal: 50,
  },
  topinnerview: {
    marginTop: 20,
    marginHorizontal: 50,
  },
  nickname: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    marginTop: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  completebtn: {
    alignItems: 'center',
    marginBottom: 50,
    marginHorizontal: 50,
    borderRadius: 10,
    backgroundColor: '#16BBFF',
    paddingVertical: 12,
  },
  completebtntext: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default Myemailchange;