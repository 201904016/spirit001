import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import axios from 'axios';

const SearchPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [weather, setWeather] = useState({
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    condition: '',
    rain_probability: 0,
  });

  // 주소 선택 시 실행될 콜백 함수
  const handleAddressSelect = async data => {
    console.log('Selected Address Data:', data);

    try {
      const {address} = data;
      const coords = await getLatLngFromAddress(address);

      console.log('위도:', coords.latitude, '경도:', coords.longitude);

      // 선택한 주소와 좌표를 상태로 설정
      setSelectedAddress(address);
      setSelectedCoords(coords);

      // 선택한 주소의 날씨 정보 가져오기
      fetchWeatherData(coords.latitude, coords.longitude);
    } catch (error) {
      console.error('에러 발생:', error);
      // 오류 처리
    }
  };

  // 주소를 기반으로 위도와 경도를 가져오는 함수
  const getLatLngFromAddress = async address => {
    const apiKey = '9b09512f07cf4d2555413abbedcbcc3a'; // 카카오맵 API 키
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
      address,
    )}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.documents.length > 0) {
        const {x, y} = data.documents[0].address;
        return {latitude: y, longitude: x};
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  // OpenWeatherMap API를 이용하여 날씨 정보 가져오기
  const fetchWeatherData = async (latitude, longitude) => {
    const API_KEY = 'be107a3be29e95b54b2fac69f2a42431';
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(apiUrl);

      console.log('날씨 API 응답:', response);
      const temp = response.data.main.temp;
      const temp_max = response.data.main.temp_max;
      const temp_min = response.data.main.temp_min;
      const condition = response.data.weather[0].main;
      const rain_probability = response.data.clouds.all;

      setWeather({temp, temp_max, temp_min, condition, rain_probability});
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <>
      <Postcode
        style={{flex: 1, width: '100%', zIndex: 999}}
        jsOptions={{animation: true}}
        onSelected={handleAddressSelect}
      />
      {/* 선택한 주소 및 좌표 정보를 표시 */}
      {selectedAddress && selectedCoords && (
        <View style={{marginTop: 20, padding: 10}}>
          <Text>선택한 주소: {selectedAddress}</Text>
          <Text>위도: {selectedCoords.latitude}</Text>
          <Text>경도: {selectedCoords.longitude}</Text>
          {/* 날씨 정보 표시 */}
          {weather.temp !== 0 && (
            <View style={{marginTop: 20}}>
              <Text>현재 온도: {weather.temp}°C</Text>
              <Text>최고 기온: {weather.temp_max}°C</Text>
              <Text>최저 기온: {weather.temp_min}°C</Text>
              <Text>날씨: {weather.condition}</Text>
              <Text>강수 확률: {weather.rain_probability}%</Text>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default SearchPage;
