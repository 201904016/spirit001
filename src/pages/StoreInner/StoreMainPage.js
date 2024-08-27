import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuaddPage from './MenuaddPage';
import StoreMenuPage from './StoreMenuPage';
import StoreRiviewPage from './StoreRiviewPage';
import StoreMapPage from './StoreMapPage';
import {ScrollView} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
import {getToken} from '../../store/Storage';
import Categorytrans from '../../hooks/Categorytrans';

const StoreMainPage = ({navigation}) => {
  const route = useRoute();
  const {storeId, innerlatitude, innerlongitude} = route.params;
  const [token, setToken] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  const handlePress = index => {
    if (index == 0) {
      navigation.navigate('UpdateStore', {
        storeId: storeId,
      });
    }
    onPressModalClose();
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const [storeName, setStoreName] = useState('');
  const [categorys, setCategorys] = useState([]);
  const [address, setAddress] = useState('');
  const [openHour, setOpenHour] = useState('');
  const [closepenHour, setCloseHour] = useState('');
  const [longitude, setIongitude] = useState('');
  const [lititude, setLititude] = useState('');
  const [storeContent, setStoreContent] = useState('');
  const [storeRate, setStoreRate] = useState('');
  const [reviewCount, setReviewCount] = useState('');
  const [storeLikeCount, setStoreLikeCount] = useState('');
  const [currentPage, setCurrentPage] = useState('StoreMenuPage');

  const changePage = page => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchToken = async () => {
      const savedToken = await getToken();
      setToken(savedToken);
      getStoreData(savedToken); // 토큰을 가져온 후에 데이터 요청
    };
    fetchToken();
  }, [storeId]);

  const opendeletestore = () => {
    Alert.alert(
      '삭제하시겠습니까?',
      '',
      [
        {
          text: '확인',
          style: 'destructive',
          onPress: () => {
            fetch(
              `http://kymokim.iptime.org:11082/api/store/delete/${storeId}`,
              {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'x-auth-token': token,
                },
              },
            )
              .then(response => response.json())
              .then(data => {
                Alert.alert(
                  '삭제되었습니다.',
                  '',
                  [
                    {
                      text: '확인',
                      style: 'destructive',
                      onPress: () => {
                        setIsModalVisible(false);
                        navigation.navigate('MainPage');
                      },
                    },
                  ],
                  {cancelable: false},
                );
              })
              .catch(error => console.error('Error:', error));
          },
        },
        {
          text: '취소',
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const getStoreData = token => {
    console.log(token);
    fetch(
      `http://kymokim.iptime.org:11082/api/store/get/${storeId}?latitude=${innerlatitude}&longitude=${innerlongitude}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        const storeData = data.data || {}; // 데이터가 없으면 빈 객체로 초기화
        const categories = storeData.categories || []; // categories가 없으면 빈 배열로 초기화
        setStoreName(storeData.storeName || '');
        setCategorys(categories);
        setAddress(storeData.address || '');
        setOpenHour(storeData.openHour || '');
        setCloseHour(storeData.closeHour || '');
        setIongitude(storeData.longitude || '');
        setLititude(storeData.latitude || '');
        setStoreRate(storeData.storeRate || '');
        setReviewCount(storeData.reviewCount || '');
        setStoreLikeCount(storeData.storeLikeCount || '');
        setStoreContent(storeData.storeContent || '');
        console.log('Menu List:', storeData.menuList || []);
      })
      .catch(error => console.error('Error:', error));
  };

  const translatedCategories = Categorytrans({categories: categorys});

  return (
    <ScrollView>
      <View style={styles.StoreTopView}>
        <ImageBackground
          source={require('../../assets/MainPagetodayimg.png')}
          style={styles.backimage}
          imageStyle={styles.backimagestyle}>
          <View style={styles.MainIconsView}>
            <FontAwesomeIcon
              name={'angle-left'}
              size={25}
              color={'gray'}
              style={styles.searchicon}
            />
            <Pressable onPress={() => navigation.navigate('MainPage')}>
              <Ionicons
                name={'home-outline'}
                size={25}
                color={'gray'}
                style={styles.searchicon}
              />
            </Pressable>
          </View>
        </ImageBackground>
        <View style={styles.Storetitleview}>
          <Text style={styles.Storetitle}>{storeName}</Text>
          <Pressable onPress={onPressModalOpen} style={styles.updateicons}>
            <MaterialCommunityIcons
              name={'dots-vertical'}
              size={30}
              color={'black'}
            />
          </Pressable>
        </View>
        <View style={styles.Storesubtitleview}>
          <Text style={styles.Storesubtitle}>{translatedCategories[0]}</Text>
          <Text style={styles.Storesubtitle}>{translatedCategories[1]}</Text>
          <Text style={styles.Storesubtitle}>{translatedCategories[2]}</Text>
        </View>
        <View style={styles.RiviewView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name={'star'} size={20} color={'yellow'} />
            <Text style={styles.riviewtext}>{storeRate}</Text>
          </View>
          <Text style={styles.riviewtext}>고객 리뷰 {reviewCount}</Text>
          <Text style={styles.riviewtext}>찜 {storeLikeCount}</Text>
        </View>
        <View style={styles.titlefoodview}>
          <Text style={styles.riviewtext}>대표요리 : 파스타</Text>
        </View>
        <View style={styles.CallView}>
          <View style={{flexDirection: 'row'}}>
            <Ionicons name={'call-outline'} size={20} color={'black'} />
            <Text style={styles.CallViewtext}>전화</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Ionicons name={'heart-outline'} size={20} color={'black'} />
            <Text style={styles.CallViewtext}>찜</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Ionicons
              name={'chatbubble-ellipses-outline'}
              size={20}
              color={'black'}
            />
            <Text style={styles.CallViewtext}>채팅방</Text>
          </View>
        </View>
        <View style={styles.locationview}>
          <Text style={styles.locationtext}>{address}</Text>
        </View>
        <View style={styles.timeview}>
          <Text style={styles.timetextnow}>영업 중</Text>
          <Text style={styles.timetext}>영업 종료 - {closepenHour}</Text>
        </View>
        <View style={styles.introduceview}>
          <Pressable onPress={toggleExpand}>
            <Text
              style={styles.locationtext}
              numberOfLines={isExpanded ? null : 2}>
              {storeContent}
            </Text>
          </Pressable>
        </View>
        <View style={styles.resbuttonview}>
          <View style={styles.resbutton}>
            <MaterialCommunityIcons
              name={'calendar-check-outline'}
              size={20}
              color={'black'}
            />
            <Text>예약</Text>
          </View>
        </View>
      </View>
      <View style={styles.Storeinnercategory}>
        <Pressable
          style={styles.StoreButton}
          onPress={() => changePage('StoreMenuPage')}>
          <Text style={styles.StoreButtonText}>메뉴</Text>
        </Pressable>
        <Pressable
          style={styles.StoreButton}
          onPress={() => changePage('StoreRiviewPage')}>
          <Text style={styles.StoreButtonText}>리뷰</Text>
        </Pressable>
        <Pressable
          style={styles.StoreButton}
          onPress={() => changePage('StoreMapPage')}>
          <Text style={styles.StoreButtonText}>길찾기</Text>
        </Pressable>
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modaltopview}>
              <View>
                <Pressable
                  style={styles.modalupdeteview}
                  onPress={() => handlePress(0)}>
                  <Text style={styles.modalupdetetext}>매장 수정</Text>
                </Pressable>
                <View style={styles.line}></View>
                <Pressable onPress={opendeletestore} style={styles.deleButton}>
                  <Text style={styles.deleButtonText}>메장 삭제</Text>
                </Pressable>
                <Pressable
                  onPress={onPressModalClose}
                  style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>닫기</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        {currentPage === 'StoreMenuPage' && (
          <StoreMenuPage
            navigation={navigation}
            storeId={storeId}
            innerlatitude={innerlatitude}
            innerlongitude={innerlongitude}
          />
        )}
        {currentPage === 'StoreRiviewPage' && (
          <StoreRiviewPage navigation={navigation} />
        )}
        {currentPage === 'StoreMapPage' && (
          <StoreMapPage navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  StoreTopView: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderTopWidth: 0,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  backimage: {
    width: '100%',
    height: 180,
  },
  backimagestyle: {
    resizeMode: 'cover',
  },
  MainIconsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  Storetitleview: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 5,
    marginBottom: 10,
    justifyContent: 'center', // 텍스트를 중앙에 배치
    position: 'relative',
  },
  Storetitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  updateicons: {
    position: 'absolute',
    right: 10,
  },
  Storesubtitleview: {
    width: '45%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 5,
  },
  Storesubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5F5F5F',
  },
  RiviewView: {
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  riviewtext: {
    fontWeight: '600',
    fontSize: 11,
    color: '#5F5F5F',
  },
  titlefoodview: {
    marginTop: 10,
  },
  CallView: {
    width: '60%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  CallViewtext: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  locationview: {
    width: '80%',
    marginTop: 20,
  },
  locationtext: {
    fontSize: 13,
    fontWeight: '500',
    color: '#5F5F5F',
  },
  timeview: {
    flexDirection: 'row',
    width: '80%',
    marginTop: 10,
  },
  timetextnow: {
    fontSize: 13,
    fontWeight: '500',
    color: 'green',
  },
  timetext: {
    fontSize: 13,
    fontWeight: '500',
    color: '#5F5F5F',
    marginLeft: 5,
  },
  introduceview: {
    width: '80%',
    marginTop: 10,
  },
  resbuttonview: {
    width: '80%',
    alignItems: 'center',
    marginVertical: 12,
  },
  resbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#5F5F5F',
    marginBottom: 2,
  },
  Storeinnercategory: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
    justifyContent: 'space-between',
  },
  StoreButton: {
    flex: 1,
    paddingHorizontal: 45,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  StoreButtonText: {
    fontSize: 15,
    color: 'black',
    fontWeight: '400',
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '50%',
    paddingVertical: 5,
    paddingTop: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modaltopview: {
    width: '100%',
  },
  modalupdeteview: {
    alignItems: 'center',
  },
  modalupdetetext: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  line: {
    marginHorizontal: '10%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  closeButton: {
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 6,
  },
  deleButton: {
    alignItems: 'center',
  },
  deleButtonText: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});

export default StoreMainPage;
