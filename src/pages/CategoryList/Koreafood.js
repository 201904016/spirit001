import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';

const Koreafood = () => {
  const [location, setLocation] = useState(null);
  const [stores, setStores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (location) {
      // 위치가 업데이트되면 매장 정보를 가져옵니다.
      getStoreData();
    }
  }, [location]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          fetchLocation(); // 권한 허용 후 위치 가져오기
        } else {
          console.log('Location permission denied');
          setError('위치 권한이 거부되었습니다.');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      fetchLocation(); // iOS에서는 권한 요청 없이 바로 위치 가져오기
    }
  };

  const fetchLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        setError(null);
      },
      error => {
        console.error(error);
        setError(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const getStoreData = () => {
    if (!location) return;

    const category = '한식주점';
    const {latitude, longitude} = location;
    console.log(latitude, longitude);

    fetch(
      `http://kymokim.iptime.org:11082/api/store/getByCategory/${category}?latitude=${latitude}&longitude=${longitude}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        if (data && data.data) {
          setStores(data.data); // 데이터 저장
          console.log(stores);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const renderItem = ({item}) => (
    <View style={styles.recentView}>
      <Image
        source={
          item.imgUrl ? {uri: item.imgUrl} : require('../../assets/jangan.png')
        }
        style={styles.recentimg}
      />
      <View style={styles.recentMainTextview}>
        <Text style={styles.recentMainText}>{item.storeName}</Text>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name={'star'} size={20} color={'yellow'} />
          <Text style={styles.recentMainText}>{item.storeRate}</Text>
        </View>
      </View>
      <Text style={styles.recentsubText}>
        {item.firstCategory}, {item.secondCategory}, {item.thirdCategory}
      </Text>
      <View style={styles.recenttimeview}>
        <Text style={styles.recenttimetext}>
          {item.closeHour ? `영업종료 ${item.closeHour}` : '영업종료 시간 없음'}
        </Text>
        <Text style={{fontSize: 12}}>287m</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={stores}
      renderItem={renderItem}
      keyExtractor={item => item.storeId.toString()}
    />
  );
};

const styles = StyleSheet.create({
  recentView: {
    marginLeft: 20,
    margin: 10,
  },
  recentimg: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  recentMainTextview: {
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recentMainText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 2,
  },
  recentsubText: {
    color: 'gray',
    fontWeight: '400',
    fontSize: 14,
    marginTop: 1,
  },
  recenttimeview: {
    marginTop: 4,
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recenttimetext: {
    fontSize: 12,
    color: 'red',
  },
});

export default Koreafood;
