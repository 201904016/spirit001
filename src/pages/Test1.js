import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';

const Test1 = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
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
        setLatitude(latitude);
        setLongitude(longitude);
        setError(null);
      },
      error => {
        console.error(error);
        if (error.code === 1) {
          setError('위치 권한이 거부되었습니다.');
        } else if (error.code === 2) {
          setError('위치 정보를 사용할 수 없습니다.');
        } else if (error.code === 3) {
          setError('위치 요청이 시간 초과되었습니다.');
        } else if (error.code === 4) {
          setError('위치 서비스가 비활성화되었습니다.');
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const renderMap = () => {
    if (latitude && longitude) {
      const injectJavaScript = `
        var mapContainer = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(${latitude}, ${longitude}),
          level: 3
        };
        var map = new kakao.maps.Map(mapContainer, options);

        var markerPosition = new kakao.maps.LatLng(${latitude}, ${longitude});
        var marker = new kakao.maps.Marker({
          position: markerPosition
        });

        marker.setMap(map);
      `;
      return (
        <WebView
          originWhitelist={['*']}
          source={{html}}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          injectedJavaScript={injectJavaScript}
        />
      );
    } else {
      return null;
    }
  };

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Kakao Map</title>
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=f5e6db800b171aa75ab189e0c334c74a"></script>
      <style>
        #map {
          width: 100%;
          height: 100vh;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
    </body>
    </html>
  `;

  return <SafeAreaView style={styles.container}>{renderMap()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default Test1;
