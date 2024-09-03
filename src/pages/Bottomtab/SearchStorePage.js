import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import MapCategory from '../../hooks/MapCategory';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const SearchStorePage = ({navigation}) => {
  const route = useRoute();
  const {searchName, stores} = route.params;
  const [searchWord, setSearchWord] = useState(searchName);
  const [searchingStores, setSearchingStores] = useState([]);

  useEffect(() => {
    if (searchWord) {
      filteredStores();
    } else {
      console.log('fail');
    }
  }, [searchWord]);

  const filteredStores = () => {
    const trimmedSearchName = searchWord.trim();
    const searchStores = stores.filter(store =>
      store.storeName.includes(trimmedSearchName),
    );
    setSearchingStores(searchStores);
  };

  return (
    <View style={styles.container}>
      {/* 검색 영역을 별도로 두어 고정 */}
      <View style={styles.topView}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <AntDesign name="arrowleft" size={25} color={'black'} />
        </TouchableOpacity>

        <View style={styles.search}>
          <EvilIcons
            style={styles.searchIcon}
            name="search"
            size={30}
            color={'gray'}
          />
          <TextInput
            style={styles.searchTextInput}
            placeholder={searchWord}
            placeholderTextColor="gray"
            value={searchWord}
            onChangeText={text => {
              setSearchWord(text);
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('MainPage')}>
          <Ionicons name={'home-outline'} size={25} color={'black'} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.fastSearchModalScrollView}>
        {searchingStores.map(store => (
          <Pressable
            key={store.storeId}
            onPress={() => {
              // 먼저 네비게이션 이동
              navigation.navigate('StoreStack', {
                screen: 'StoreMainPage',
                params: {
                  storeId: store.storeId,
                  innerlatitude: store.latitude,
                  innerlongitude: store.longitude,
                },
              });
            }}>
            <View style={styles.StoreInfo}>
              <Image
                source={require('../../assets/kim.png')}
                style={styles.StoreImage}
              />
              <View style={styles.StoreTextView}>
                <View style={styles.StoreTitleView}>
                  <Text
                    style={styles.StoreTitle}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {store.storeName}
                  </Text>
                  <View style={styles.StoreScore}>
                    <FontAwesomeIcon name="star" size={15} color="#FCC104" />
                    <Text style={styles.Scoretext}>
                      {' '}
                      {store.storeRate}
                      {' ('}
                      {store.reviewCount}
                      {')'}
                    </Text>
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
                <View style={styles.StoreAddressView}>
                  <Text style={styles.StoreAddressText}>
                    {store.address}, {store.addressDetail}
                  </Text>
                </View>
                <Text style={styles.StoreClose}>
                  영업 종료 {store.closeHour.slice(0, 5)}
                </Text>
              </View>
            </View>

            <View style={styles.horizontalDivider} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1, // 화면 전체를 차지하도록 설정
  },
  backButton: {
    marginLeft: 15,
    marginRight: 15,
  },
  homeButton: {
    marginLeft: 15,
    marginRight: 15,
  },
  topView: {
    marginTop: 30,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // 버튼과 검색 창 간격 조정
  },
  search: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    width: '75%',
    borderRadius: 7,
    alignItems: 'center',
  },
  searchIcon: {
    color: 'gray',
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 10,
  },
  searchTextInput: {
    fontSize: 15,
    color: 'gray',
  },
  fastSearchModalScrollView: {
    marginTop: 1,
    paddingBottom: 50,
  },
  StoreInfo: {
    width: '90%',
    marginTop: 10,
    marginBottom: 7,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  StoreImage: {
    width: 80,
    height: 120,
    borderRadius: 10,
  },
  StoreTextView: {
    width: '80%',
    marginLeft: 10,
    justifyContent: 'space-between',
    marginVertical: 1,
  },
  StoreTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 5,
  },
  StoreTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
    maxWidth: 150, // 이름이 줄여지는 최대 너비 설정
  },
  StoreScore: {
    flexDirection: 'row',
    alignItems: 'center', // 별점과 텍스트를 정렬
  },
  Scoretext: {
    marginLeft: 3,
    fontSize: 15,
    color: 'black',
  },
  StoreCategoryList: {
    flexDirection: 'row',
    marginRight: 5,
  },
  StoreAddressView: {
    width: '80%',
  },
  StoreAddressText: {
    color: 'gray',
    fontSize: 14,
  },
  StoreCategory: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    marginRight: 5,
  },
  StoreClose: {
    fontSize: 13,
    color: 'black',
    marginRight: 5,
  },
  StoreMain: {
    fontSize: 12,
    color: 'black',
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
    width: '100%',
    alignSelf: 'center',
  },
});

export default SearchStorePage;
