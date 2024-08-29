import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Pressable, Image} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {getToken} from '../../store/Storage';
import {ScrollView} from 'react-native-gesture-handler';
import MapCategory from '../../hooks/MapCategory';

const LikePage = ({navigation}) => {
  const [token, setToken] = useState(null);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchToken = async () => {
      const savedToken = await getToken();
      console.log('저장된 토큰:', savedToken); // 저장된 토큰을 출력
      setToken(savedToken);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const getStoreData = () => {
      if (!token) {
        console.log('Token is not set');
        return; // token이 없으면 더 이상 진행하지 않음
      }

      fetch(`http://kymokim.iptime.org:11082/api/store/getLikedStore`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.data) {
            setStores(data.data); // 데이터 저장
            console.log('data succ');
          }
        })
        .catch(error => console.error('Error:', error));
    };

    getStoreData();
  }, [token]); // token이 변경될 때마다 이 useEffect가 실행됨

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.ScrollView}>
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
            <View style={styles.storeInfo}>
              <Image
                source={require('../../assets/kim.png')}
                style={styles.storeImage}
              />
              <View style={styles.text}>
                <View style={styles.StoreView}>
                  <Text
                    style={styles.StoreTitle}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {store.storeName}
                  </Text>
                  <View style={styles.Storescore}>
                    <FontAwesomeIcon name="star" size={15} color="#FCC104" />
                    <Text style={styles.scoretext}>{store.storeRate}</Text>
                  </View>
                </View>
                <View style={styles.StoreCategoryList}>
                  {store.categories.slice(0, 3).map((category, index) => (
                    <MapCategory
                      key={index}
                      categories={[category]}
                      style={styles.StoreCategory}
                    />
                  ))}
                </View>
                <Text style={styles.StoreClose}>
                  영업 종료 {store.closeHour.slice(0, 5)}
                </Text>
                <Text style={styles.StoreMain}>대표 메뉴: </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  StoreView: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 이름과 별점 사이 공간 추가
    alignItems: 'center',
    width: 200, // 제한된 너비로 텍스트 줄임표 효과 강화
  },
  StoreCategoryList: {
    flexDirection: 'row',
    marginRight: 5,
  },

  storeInfo: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: '5%',
    marginTop: 5,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
    marginBottom: '5%',
  },

  storeImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  text: {
    left: '7%',
  },
  scoretext: {
    marginLeft: 3,
  },
  ScrollView: {
    marginTop: 10,
    paddingBottom: 30,
  },
  StoreTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    maxWidth: 150, // 이름이 줄여지는 최대 너비 설정
  },
  StoreCategory: {
    top: 10,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    marginRight: 5,
  },
  StoreClose: {
    top: 25,
    fontSize: 15,
    color: 'black',
    marginRight: 5,
  },
  StoreMain: {
    top: 62,
    fontSize: 12,
    color: 'black',
  },
  Storescore: {
    flexDirection: 'row',
    alignItems: 'center', // 별점과 텍스트를 정렬
  },
});

export default LikePage;
