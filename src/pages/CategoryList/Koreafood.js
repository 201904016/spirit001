import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Koreafood = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const getStoreData = () => {
      const category = '한식주점';

      fetch(
        `http://kymokim.iptime.org:11082/api/store/getByCategory/${category}?latitude=${37.4925472162071}&longitude=${126.882560996201}`,
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

  const renderItem = ({item}) => (
    <View style={styles.recentView}>
      <Image
        source={
          item.imgUrl ? {uri: item.imgUrl} : require('../../assets/jangan.png')
        }
        style={styles.recentimg}
      />
      <View style={styles.recentMainTextview}>
        <Text style={styles.recentMainText}>{item.storeName}</Text>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name={'star'} size={20} color={'yellow'} />
          <Text style={styles.recentMainText}>{item.storeRate}</Text>
        </View>
      </View>
      <Text style={styles.recentsubText}>
        {item.firstCategory}, {item.secondCategory}, {item.thirdCategory}
      </Text>
      <View style={styles.recenttimeview}>
        <Text style={styles.recenttimetext}>
          {item.closeHour ? `영업종료 ${item.closeHour}` : '영업종료 시간 없음'}
        </Text>
        <Text style={{fontSize: 12}}>287m</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={stores}
      renderItem={renderItem}
      keyExtractor={item => item.storeId.toString()}
    />
  );
};

const styles = StyleSheet.create({
  recentView: {
    marginLeft: 20,
    margin: 10,
  },
  recentimg: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  recentMainTextview: {
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recentMainText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 2,
  },
  recentsubText: {
    color: 'gray',
    fontWeight: '400',
    fontSize: 14,
    marginTop: 1,
  },
  recenttimeview: {
    marginTop: 4,
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recenttimetext: {
    fontSize: 12,
    color: 'red',
  },
});

export default Koreafood;
