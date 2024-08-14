import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const Myreservation = () => {
  return (
    <View style={{marginBottom: 20}}>
      <View style={styles.topview}>
        <Text style={styles.reservationtext}>방문 예정</Text>
        <View style={styles.title}>
          <Text style={styles.titletext}>땀땀 신논현점</Text>
          <Text style={styles.categorytext}>이자카야</Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.datetext}>2024.07.13(토)</Text>
          <Text style={styles.datetext}>오후 06:00</Text>
          <Text style={styles.datetext}>8명</Text>
        </View>
        <Text style={styles.timetext}>close 21:00</Text>
      </View>
      <View style={styles.topview}>
        <Text style={styles.reservationtextend}>방문 완료</Text>
        <View style={styles.title}>
          <Text style={styles.titletext}>땀땀 신논현점</Text>
          <Text style={styles.categorytext}>이자카야</Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.datetext}>2024.07.13(토)</Text>
          <Text style={styles.datetext}>오후 06:00</Text>
          <Text style={styles.datetext}>8명</Text>
        </View>
        <View style={styles.timeend}>
          <Text style={styles.timetextend}>close 21:00</Text>
          <Text style={styles.timetextend}>리뷰쓰기</Text>
        </View>
      </View>
      <View style={styles.topview}>
        <Text style={styles.reservationtext}>방문 예정</Text>
        <View style={styles.title}>
          <Text style={styles.titletext}>땀땀 신논현점</Text>
          <Text style={styles.categorytext}>이자카야</Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.datetext}>2024.07.13(토)</Text>
          <Text style={styles.datetext}>오후 06:00</Text>
          <Text style={styles.datetext}>8명</Text>
        </View>
        <Text style={styles.timetext}>close 21:00</Text>
      </View>
      <View style={styles.topview}>
        <Text style={styles.reservationtextend}>방문 완료</Text>
        <View style={styles.title}>
          <Text style={styles.titletext}>땀땀 신논현점</Text>
          <Text style={styles.categorytext}>이자카야</Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.datetext}>2024.07.13(토)</Text>
          <Text style={styles.datetext}>오후 06:00</Text>
          <Text style={styles.datetext}>8명</Text>
        </View>
        <View style={styles.timeend}>
          <Text style={styles.timetextend}>close 21:00</Text>
          <Text style={styles.timetextend}>리뷰쓰기</Text>
        </View>
      </View>
      <View style={styles.topview}>
        <Text style={styles.reservationtext}>방문 예정</Text>
        <View style={styles.title}>
          <Text style={styles.titletext}>땀땀 신논현점</Text>
          <Text style={styles.categorytext}>이자카야</Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.datetext}>2024.07.13(토)</Text>
          <Text style={styles.datetext}>오후 06:00</Text>
          <Text style={styles.datetext}>8명</Text>
        </View>
        <Text style={styles.timetext}>close 21:00</Text>
      </View>
      <View style={styles.topview}>
        <Text style={styles.reservationtextend}>방문 완료</Text>
        <View style={styles.title}>
          <Text style={styles.titletext}>땀땀 신논현점</Text>
          <Text style={styles.categorytext}>이자카야</Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.datetext}>2024.07.13(토)</Text>
          <Text style={styles.datetext}>오후 06:00</Text>
          <Text style={styles.datetext}>8명</Text>
        </View>
        <View style={styles.timeend}>
          <Text style={styles.timetextend}>close 21:00</Text>
          <Text style={styles.timetextend}>리뷰쓰기</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topview: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'lightgray',
    alignItems: 'flex-start',
  },
  reservationtext: {
    marginTop: 15,
    marginLeft: 15,
    borderRadius: 10,
    padding: 2,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    backgroundColor: '#80D3f5',
    color: 'white',
  },
  title: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 15,
  },
  titletext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
  categorytext: {
    fontWeight: '600',
    fontSize: 13,
  },
  datetext: {
    fontWeight: 'bold',
    color: 'black',
    marginRight: 8,
  },
  timetext: {
    marginTop: 5,
    marginLeft: 15,
    marginBottom: 15,
    fontWeight: '500',
  },
  reservationtextend: {
    marginTop: 15,
    marginLeft: 15,
    borderRadius: 10,
    padding: 2,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    backgroundColor: 'gray',
    color: 'black',
  },
  timeend: {
    width: '90%',
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 15,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  timetextend: {
    fontWeight: '600',
    color: 'gray',
  },
});

export default Myreservation;
