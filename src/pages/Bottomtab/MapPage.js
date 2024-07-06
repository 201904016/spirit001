import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Test1 from '../Test1';

const MapPage = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

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

  const onRefreshLocation = () => {
    fetchLocation(); // "내 위치 갱신" 버튼 클릭 시 위치 업데이트
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Pressable
          style={styles.locationButton}
          onPress={onRefreshLocation} // "내 위치 갱신" 버튼 클릭 시 호출
        >
          <Text style={styles.locationText}>내 위치 갱신</Text>
        </Pressable>
        <Text style={styles.title}>지도 페이지</Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.locationButton}
            onPress={() => navigation.navigate(Test1)}>
            <Text style={styles.locationText}>위치 정보 가져오기</Text>
          </Pressable>
        </View>
        {location && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationText2}>
              Latitude: {location.latitude.toFixed(6)}, Longitude:{' '}
              {location.longitude.toFixed(6)}
            </Text>
          </View>
        )}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error: {error}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  locationButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  locationText: {
    color: 'white',
    textAlign: 'center',
  },
  locationText2: {
    color: 'black',
    textAlign: 'center',
  },
  locationContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  errorContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default MapPage;
