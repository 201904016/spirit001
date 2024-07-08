import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Pressable,
  Text,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';
import SearchPage from './SearchPage';

const MapPage = ({navigation}) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const webViewRef = useRef(null);

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
        updateMap(latitude, longitude); // 위치 정보 업데이트 후 지도 갱신

        // var data = {
        //   longitude: longitude,
        //   latitude: latitude,
        // };
        // console.log(data);
        // fetch('http://kymokim.iptime.org:11082/api/location', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   mode: 'cors',
        //   credentials: 'include',
        //   body: JSON.stringify(data),
        // })
        //   .then(response => {
        //     return response.json();
        //   })
        //   .then(data => {
        //     console.log(data);
        //   })
        //   .catch(error => {
        //     console.error(error);
        //   });
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

  const updateLocation = () => {
    fetchLocation();
  };

  const updateMap = (lat, lng) => {
    if (webViewRef.current) {
      const injectJavaScript = `
        var mapContainer = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(${lat}, ${lng}),
          level: 3
        };
        var map = new kakao.maps.Map(mapContainer, options);

        var markerPosition = new kakao.maps.LatLng(${lat}, ${lng});
        var marker = new kakao.maps.Marker({
          position: markerPosition
        });

        marker.setMap(map);
      `;
      webViewRef.current.injectJavaScript(injectJavaScript);
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

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{html}}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
      <Pressable
        style={styles.buttonTop}
        onPress={() => navigation.navigate(SearchPage)}>
        <Text style={styles.buttonTextTop}>장소, 지역 검색</Text>
      </Pressable>
      <Pressable style={styles.buttonBottom} onPress={updateLocation}>
        <Text style={styles.buttonText}>내 위치</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  buttonTop: {
    position: 'absolute',
    top: '3%',
    left: '5%',
    backgroundColor: '#ffffff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '90%',
    height: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  buttonBottom: {
    position: 'absolute',
    bottom: '30%',
    left: '5%',
    backgroundColor: '#16BBFF',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    width: 70,
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonTextTop: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 16,
    borderRadius: 100,
    width: '100%',
    left: '3%',
    textAlign: 'left',
  },
});

export default MapPage;
