import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  PermissionsAndroid,
  Pressable,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import {getLocation} from '../store/useLocation';

const Categoryspage = ({navigation, categoryname}) => {
  const [stores, setStores] = useState([]);
  const [error, setError] = useState(null);

  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const currentLocation = await getLocation(); // 캐시된 위치 가져오기
      setLocation(currentLocation);
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    if (location) {
      getStoreData();
    }
  }, [location]);

  const getStoreData = () => {
    if (!location) return;

    const {latitude, longitude} = location;

    fetch(
      `http://kymokim.iptime.org:11082/api/store/getByCategory/${categoryname}?latitude=${latitude}&longitude=${longitude}`,
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
          setStores(data.data);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      {stores.map(store => (
        <Pressable
          key={store.storeId}
          onPress={() =>
            navigation.navigate('StoreStack', {
              screen: 'StoreMainPage',
              params: {
                storeId: store.storeId,
                innerlatitude: store.latitude,
                innerlongitude: store.longitude,
              },
            })
          }>
          <View style={styles.StoreTopView}>
            <View style={styles.StoreView}>
              <Text style={styles.StoreTitle}>{store.storeName}</Text>
              <View style={styles.Storescore}>
                <FontAwesomeIcon name="star" size={20} color="#FCC104" />
                <Text style={styles.scoretext}>{store.storeRate}</Text>
                <Text style={styles.scoretext}>
                  고객리뷰 {store.reviewCount}
                </Text>
                <Text style={styles.scoretext}>찜 {store.storeLikeCount}</Text>
              </View>
              <View style={styles.Storetime}>
                <Ionicons name="time-outline" size={20} color="gray" />
                <Text style={styles.scoretext}>
                  영업중 {store.closeHour} 라스트 오더
                </Text>
              </View>
            </View>
            <View style={styles.line}></View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  StoreTopView: {
    marginVertical: 15,
  },
  MenutopView: {
    marginHorizontal: 15,
    alignItems: 'center',
  },
  MenuImg: {
    width: 140,
    resizeMode: 'cover',
    height: 140,
    borderRadius: 20,
  },
  MenuTitle: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  MenuPrice: {
    marginTop: 3,
    fontWeight: '700',
    fontSize: 14,
  },
  StoreView: {
    marginHorizontal: 15,
    marginTop: 12,
    alignItems: 'flex-start',
  },
  StoreTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  Storescore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  Storetime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  scoretext: {
    marginLeft: 4,
  },
  line: {
    marginTop: 15,
    width: '100%',
    height: 2,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
});

export default Categoryspage;
