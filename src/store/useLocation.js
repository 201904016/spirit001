import {useState, useEffect} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

let cachedLocation = null; // 캐시된 위치를 저장할 변수
let error = null;

export const saveLocation = async location => {
  try {
    await AsyncStorage.setItem('location', JSON.stringify(location));
    cachedLocation = location; // 메모리에 위치 정보 캐싱
    console.log('위치 정보 저장', location);
  } catch (error) {
    console.log('위치 정보 저장 오류:', error);
  }
};

export const getLocation = async () => {
  if (cachedLocation) return cachedLocation; // 메모리에 캐싱된 위치가 있으면 반환
  try {
    const storedLocation = await AsyncStorage.getItem('location');
    if (storedLocation) {
      cachedLocation = JSON.parse(storedLocation); // JSON 파싱 후 메모리에 캐싱
      return cachedLocation;
    }
  } catch (error) {
    console.log('위치 정보 가져오기 오류:', error);
  }
  return null;
};

// 외부에서 사용자가 새로운 위치 정보를 설정하는 함수
export const updateLocation = async newLocation => {
  await saveLocation(newLocation); // 새로운 위치 정보를 스토리지와 메모리에 저장
  console.log('새로운 위치 정보로 업데이트:', newLocation);
};

export const fetchLocation = () => {
  Geolocation.getCurrentPosition(
    position => {
      const {latitude, longitude} = position.coords;
      const newLocation = {latitude, longitude};
      cachedLocation = newLocation;
      saveLocation(newLocation);
      error = null;
    },
    error => {
      console.error(error);
      handleLocationError(error);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
  return cachedLocation;
};

const handleLocationError = error => {
  if (error.code === 1) {
    error = '위치 권한이 거부되었습니다.';
  } else if (error.code === 2) {
    error = '위치 정보를 사용할 수 없습니다.';
  } else if (error.code === 3) {
    error = '위치 요청이 시간 초과되었습니다.';
  } else if (error.code === 4) {
    error = '위치 서비스가 비활성화되었습니다.';
  } else {
    error = '알 수 없는 오류가 발생했습니다.';
  }
};

export const requestLocationPermission = async () => {
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
        fetchLocation();
      } else {
        console.log('Location permission denied');
        error = '위치 권한이 거부되었습니다.';
      }
    } catch (err) {
      console.warn(err);
    }
  } else {
    fetchLocation();
  }
};

export const useLocation = async () => {
  requestLocationPermission();
};
