import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Pressable, Text, View, Image} from 'react-native';
import {WebView} from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';
import SearchPage from './SearchPage';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MapCategory from '../../hooks/MapCategory';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {getLocation, saveLocation} from '../../store/useLocation';

const MapPage = ({navigation}) => {
  const [location, setLocation] = useState(null);

  const [error, setError] = useState(null);

  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null); // 선택된 가게 상태
  const webViewRef = useRef(null);

  useEffect(() => {
    if (location) {
      // 위치가 업데이트되면 매장 정보를 가져옵니다.
      getStoreData();
    }
  }, [location]);

  const fetchLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        setLocation({latitude, longitude});
        setError(null);
        saveLocation({latitude, longitude});
        updateMap(latitude, longitude, stores); // 위치 정보 업데이트 후 지도 갱신
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

  const getStoreData = () => {
    if (!location) return;

    const {latitude, longitude} = location;

    fetch(
      `http://kymokim.iptime.org:11082/api/store/getByDistance?latitude=${latitude}&longitude=${longitude}`,
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
          updateMap(latitude, longitude, data.data); // 위치와 가게 데이터를 전달하여 지도 업데이트
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const updateMap = (lat, lng, stores) => {
    if (webViewRef.current) {
      const injectJavaScript = `
        var mapContainer = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(${lat}, ${lng}),
          level: 3
        };
        var map = new kakao.maps.Map(mapContainer, options);
  
        // 현재 위치 마커 추가
        var currentMarkerPosition = new kakao.maps.LatLng(${lat}, ${lng});
        var currentMarker = new kakao.maps.Marker({
          position: currentMarkerPosition,
          map: map,
          title: '현재 위치',
          zIndex: 1
        });
        
        // 가게 정보 마커 추가
        var storeMarkers = ${JSON.stringify(stores)}.map(store => {
          var markerPosition = new kakao.maps.LatLng(store.latitude, store.longitude);
          var marker = new kakao.maps.Marker({
            position: markerPosition,
            map: map,
            title: store.name,
            zIndex: 2,
            image: new kakao.maps.MarkerImage(
              'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', 
              new kakao.maps.Size(24, 35)
            )
          });

          kakao.maps.event.addListener(marker, 'click', function() {
            window.ReactNativeWebView.postMessage(JSON.stringify(store));
          });

          return marker;
        });

        // 지도 클릭 이벤트 감지 및 전달
        kakao.maps.event.addListener(map, 'click', function() {
          window.ReactNativeWebView.postMessage('mapClicked');
        });
      `;
      webViewRef.current.injectJavaScript(injectJavaScript);
    }
  };

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Kakao Map</title>
    <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=f5e6db800b171aa75ab189e0c334c74a"></script>
    <style>
      html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
      #map {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
  </body>
  </html>
`;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{html}}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        onLoadEnd={fetchLocation}
        onMessage={event => {
          const message = event.nativeEvent.data;
          if (message === 'mapClicked') {
            // 지도 클릭 시 가게 정보 숨기기
            setSelectedStore(null);
          } else {
            const store = JSON.parse(message);
            setSelectedStore(store);
          }
        }}
      />
      <Pressable
        style={styles.buttonTop}
        onPress={() => navigation.navigate(SearchPage)}>
        <View style={styles.searchBar}>
          <EvilIcons
            style={styles.searchIcon}
            name="search"
            size={27}
            color={'gray'}
          />
          <Text style={styles.buttonTextTop}>근처 주점들을 검색해보세요.</Text>
        </View>
      </Pressable>
      <Pressable style={styles.buttonBottom} onPress={updateLocation}>
        <Feather name="crosshair" size={30} color="gray" />
      </Pressable>

      {selectedStore && (
        <Pressable
          style={styles.storeInfo}
          onPress={() =>
            navigation.navigate('StoreStack', {
              screen: 'StoreMainPage',
              params: {
                storeId: selectedStore.storeId,
                innerlatitude: location.latitude,
                innerlongitude: location.longitude,
              },
            })
          }>
          <Image
            source={require('../../assets/kim.png')}
            style={styles.storeImage}
          />
          <View style={styles.titletopview}>
            <View style={styles.titleview}>
              <Text style={styles.storeName}>{selectedStore.storeName}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesomeIcon name="star" size={15} color="#FCC104" />
                <Text style={styles.storeAddress}>
                  {selectedStore.storeRate}
                </Text>
              </View>
            </View>

            <View style={styles.category}>
              {selectedStore.categories.slice(0, 3).map((category, index) => (
                <MapCategory
                  key={index}
                  categories={[category]}
                  style={styles.StoreCategory}
                />
              ))}
            </View>
            <View style={styles.timeview}>
              <Text style={styles.timeviewtext}>
                영업종료 {selectedStore.closeHour.slice(0, 5)}
              </Text>
            </View>
            <Text style={styles.menutext}>대표메뉴 : 스케쥴 기미</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  StoreCategory: {
    top: 1,
    fontSize: 15,
    color: 'black',
    marginRight: 5,
  },
  searchBar: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
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
    bottom: '25%',
    left: '10%',
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonTextTop: {
    color: 'gray',
    backgroundColor: 'white',
    fontSize: 16,
    borderRadius: 100,
    width: '100%',
    left: '3%',
    textAlign: 'left',
    marginLeft: 5,
  },
  storeInfo: {
    flexDirection: 'row',
    width: '80%',
    left: '10%',
    position: 'absolute',
    bottom: 60,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  titletopview: {
    flex: 1,
    marginLeft: 20,
  },
  titleview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  category: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  storeAddress: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
    marginRight: 5,
  },
  todayimageView: {
    alignItems: 'center',
  },
  storeImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  timeview: {
    flexDirection: 'row',
  },
  timeviewtext: {
    fontSize: 12,
    fontWeight: '700',
    color: 'gray',
    marginBottom: 15,
  },
  menutext: {
    fontSize: 12,
    fontWeight: '700',
    color: 'gray',
  },
});

export default MapPage;
