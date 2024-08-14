import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Chicken = ({navigation}) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const getStoreData = () => {
      const category = '치킨';

      fetch(
        `http://kymokim.iptime.org:11082/api/store/getByCategory/${category}?latitude=${37.4997944818033}&longitude=${127.105074204186}`,
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
          }
        })
        .catch(error => console.error('Error:', error));
    };

    getStoreData();
  }, []);

  return (
    <ScrollView>
      {stores.map(store => (
        <Pressable
          onPress={() =>
            navigation.navigate('StoreMainPage', {storeId: store.storeId})
          }>
          <View style={styles.StoreTopView}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.MenutopView}>
                <Image
                  source={require('../../assets/kim.png')} // menuItem에 이미지 URL이 있다고 가정
                  style={styles.MenuImg}
                />
                <Text style={styles.MenuTitle}></Text>
                <Text style={styles.MenuPrice}></Text>
              </View>
            </ScrollView>
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
    resizeMode: 'contain',
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

export default Chicken;
