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
import axios from 'axios';
import Test1 from '../Test1';

const MapPage = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState({
    temp: 0,
    condition: '',
    temp_max: 0,
    temp_min: 0,
    rain_probability: 0,
  });

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
          watchLocation();
        } else {
          console.log('Location permission denied');
          setError('위치 권한이 거부되었습니다.');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      watchLocation();
    }
  };

  const watchLocation = () => {
    Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        fetchWeatherData(latitude, longitude);
        setError(null);
      },
      error => {
        console.error(error);
        setError(error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 1,
        interval: 5000,
        fastestInterval: 2000,
      },
    );
  };

  const fetchWeatherData = async (latitude, longitude) => {
    const API_KEY = 'be107a3be29e95b54b2fac69f2a42431';
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(apiUrl);
      const temp = response.data.main.temp;
      const condition = response.data.weather[0].main;
      const temp_max = response.data.main.temp_max;
      const temp_min = response.data.main.temp_min;
      const rain_probability = response.data.clouds.all;

      setWeather({
        temp,
        condition,
        temp_max,
        temp_min,
        rain_probability,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
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
        {weather.temp !== 0 && (
          <View style={styles.weatherContainer}>
            <Text style={styles.weatherText}>현재 온도: {weather.temp}°C</Text>
            <Text style={styles.weatherText}>날씨: {weather.condition}</Text>
            <Text style={styles.weatherText}>
              최고 기온: {weather.temp_max}°C
            </Text>
            <Text style={styles.weatherText}>
              최저 기온: {weather.temp_min}°C
            </Text>
            <Text style={styles.weatherText}>
              강수 확률: {weather.rain_probability}%
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
  weatherContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  weatherText: {
    fontSize: 18,
    marginBottom: 10,
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
