import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginStack from '../../components/LoginStack';
import {getToken} from '../../store/Storage';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Myreservation from './MyPageinner/Myreservation';
import Myreview from './MyPageinner/Myreview';
import ProfileStack from '../../components/ProfileStack';

const MyPage = ({navigation}) => {
  const [currentPage, setCurrentPage] = useState('Myreservation');

  const [token, setToken] = useState(null);
  const [nickname, setNickname] = useState(null);

  const changePage = page => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchToken = async () => {
      const savedToken = await getToken();
      setToken(savedToken);
      getStoreData(savedToken); // 토큰을 가져온 후에 데이터 요청
    };

    const getStoreData = token => {
      fetch(`http://kymokim.iptime.org:11082/api/auth/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      })
        .then(response => response.json())
        .then(data => {
          setNickname(data.data.nickName);
        })
        .catch(error => console.error('Error:', error));
    };
    fetchToken();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View>
        <View style={styles.profiletopview}>
          <Image
            source={require('../../assets/kim.png')}
            style={styles.profileimg}
          />
          <Text style={styles.Nickname}>{nickname}</Text>
          <Pressable
            onPress={() =>
              navigation.navigate(ProfileStack, {screen: 'ConfigPage'})
            }>
            <FontAwesomeIcon
              name={'angle-right'}
              size={40}
              color={'black'}
              style={styles.changenick}
            />
          </Pressable>
        </View>
        <View style={styles.innerviewtext}>
          <Pressable
            style={styles.StoreButton}
            onPress={() => changePage('Myreservation')}>
            <Text style={styles.reservationtext}>예약 내역</Text>
          </Pressable>
          <Pressable
            style={styles.StoreButton}
            onPress={() => changePage('Myreview')}>
            <Text style={styles.reservationtext}>나의 리뷰</Text>
          </Pressable>
        </View>
        <View style={styles.line}></View>
      </View>
      <ScrollView>
        {currentPage === 'Myreservation' && (
          <Myreservation navigation={navigation} />
        )}
        {currentPage === 'Myreview' && <Myreview navigation={navigation} />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profiletopview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 40,
    marginVertical: 40,
  },
  profileimg: {
    resizeMode: 'contain',
    width: 90,
    height: 90,
    borderRadius: 90,
  },
  Nickname: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 30,
  },
  changenick: {
    marginLeft: 20,
  },
  innerviewtext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 80,
  },
  reservationtext: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  line: {
    marginTop: 15,
    width: '100%',
    height: 2,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
});

export default MyPage;
