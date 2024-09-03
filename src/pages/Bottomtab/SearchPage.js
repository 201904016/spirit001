import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  PermissionsAndroid,
  Pressable,
  Modal,
  Image,
  RefreshControl,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import Geolocation from '@react-native-community/geolocation';
import MapCategory from '../../hooks/MapCategory';
import SearchStack from '../../components/SearchStack';
import {getLocation, useLocation} from '../../store/useLocation';

const SearchPage = ({navigation}) => {
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
      // 위치가 업데이트되면 매장 정보를 가져옵니다.
      getStoreData();
    } else {
      console.log('getStoreData fail');
    }
  }, [location]);

  const onRefresh = async () => {
    const currentLocation = await useLocation(); // 캐시된 위치 가져오기
    console.log(location);
    setLocation(currentLocation);

    setIsRefreshing(false); // 새로 고침 종료
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [peopleModalVisible, setPeopleModalVisible] = useState(false);
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [fastSearchModalVisible, setFastSearchModalVisible] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPeople, setSelectedPeople] = useState('');
  const [isGroup, setGroup] = useState(false);
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const [selectedEngCategory, setSelectedEngCategory] = useState('');
  const [searchStoreName, setSearchStoreName] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [stores, setStores] = useState([]);
  const [fastSearchStores, setfastSearchStores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedCategory && selectedPeople && selectedHour && selectedMinute) {
      onPressFastSearch();
    }
  }, [selectedCategory, selectedPeople, selectedHour, selectedMinute]);
  //빠른 검색 엔진

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
          setStores(data.data); // 데이터 저장 // 위치와 가게 데이터를 전달하여 지도 업데이트
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const isVisitTimeInRange = (store, visitTime) => {
    // 오픈 시간과 클로즈 시간을 Date 객체로 변환
    const openTime = new Date(`2000-01-01T${store.openHour}`);
    const closeTime = new Date(`2000-01-01T${store.closeHour}`);
    let visitDateTime = new Date(`2000-01-01T${visitTime}`);

    // 클로즈 시간이 자정을 넘어서면 다음 날로 간주
    if (closeTime <= openTime) {
      closeTime.setDate(closeTime.getDate() + 1);
      if (visitDateTime < openTime) {
        visitDateTime.setDate(visitDateTime.getDate() + 1);
      }
    }

    return visitDateTime >= openTime && visitDateTime <= closeTime;
  };

  const onPressFastSearch = () => {
    var visitTime = `${selectedHour}:${selectedMinute}`;

    if (
      !selectedCategory ||
      !selectedPeople ||
      !selectedHour ||
      !selectedMinute
    ) {
      console.log('Data Not');
    } else {
      const filteredStores = stores.filter(store => {
        return (
          store.categories.includes(selectedEngCategory) &&
          (isGroup ? store.isGroupAvailable === true : true) &&
          isVisitTimeInRange(store, visitTime)
        );
      });

      setfastSearchStores(filteredStores);
      console.log(filteredStores);
      setFastSearchModalVisible(true);
    }
  };

  const onPressSearch = () => {
    if (searchStoreName) {
      const trimmedSearchName = searchStoreName.trim();
      console.log(trimmedSearchName);

      // const searchStores = stores.filter(store =>
      //   store.storeName.includes(trimmedSearchName),
      // );

      // console.log(searchStores);
      // setSearchStores(searchStores);
      navigation.navigate('MapStack', {
        screen: 'SearchStorePage',
        params: {
          searchName: trimmedSearchName,
          stores: stores,
        },
      });
    } else {
      alert('검색어를 입력하세요.');
    }
  };

  const onPressModalOpen = () => {
    setModalVisible(true);
  };
  const onPressModalClose = () => {
    setModalVisible(false);
  };
  const onPressCategory = (text, category) => {
    setSelectedCategory(text);
    setSelectedEngCategory(category);
    setModalVisible(false); // 모달 닫기
  };

  const onPressPeopleModalOpen = () => {
    setPeopleModalVisible(true);
  };
  const onPressPeopleModalClose = () => {
    setPeopleModalVisible(false);
  };
  const onSelectPeople = peopleOption => {
    setSelectedPeople(peopleOption); // 선택된 인원 값을 상태 변수에 저장
    if (peopleOption === '8인 이하') {
      setGroup(false);
    } else {
      setGroup(true);
    }
    setPeopleModalVisible(false); // 모달 닫기
  };

  const onPressTimeModalOpen = () => {
    setTimeModalVisible(true);
  };
  const onPressTimeModalClose = () => {
    setTimeModalVisible(false);
  };
  const changeHour = text => {
    setSelectedHour(text);
    if (text && selectedMinute) {
      onPressTimeModalClose();
    }
  };
  const changeMinute = text => {
    setSelectedMinute(text);
    if (text && selectedHour) {
      onPressTimeModalClose();
    }
  };

  const onPressFastSearchModalClose = () => {
    setFastSearchModalVisible(false);
  };

  // const innercatagory = indexinner => {
  //   // 각 카테고리 선택 시 실행될 로직
  //   console.log(`Selected category index: ${indexinner}`);
  // };

  return (
    <View style={styles.container}>
      {/* 검색 영역을 별도로 두어 고정 */}
      <View style={styles.topView}>
        <View style={styles.search}>
          <EvilIcons
            style={styles.searchIcon}
            name="search"
            size={30}
            color={'gray'}
          />
          <TextInput
            style={styles.searchTextInput}
            placeholder="주점 이름을 입력해주세요."
            placeholderTextColor="gray"
            value={searchStoreName}
            onChangeText={text => {
              setSearchStoreName(text);
            }}
          />
        </View>
      </View>

      {/* 스크롤 가능한 영역 */}
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.fastSearch}>
          <Text style={styles.fastSearchText}>내 주변 빠른 검색</Text>
        </View>

        <View style={styles.searchChois}>
          <Text
            style={[
              styles.choisText,
              selectedCategory ? styles.choisSelectedText : null,
            ]}>
            {selectedCategory || '카테고리'}
          </Text>
          <Pressable onPress={onPressModalOpen}>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={30}
              color={'gray'}
            />
          </Pressable>
        </View>

        <View style={styles.horizontalDivider} />

        <View style={styles.searchChois}>
          <Text
            style={[
              styles.choisText,
              selectedPeople ? styles.choisSelectedText : null,
            ]}>
            {selectedPeople || '인원'}
          </Text>
          <Pressable onPress={onPressPeopleModalOpen}>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={30}
              color={'gray'}
            />
          </Pressable>
        </View>

        <View style={styles.horizontalDivider} />

        <View style={styles.searchChois}>
          <Text
            style={[
              styles.choisText,
              selectedHour || selectedMinute ? styles.choisSelectedText : null,
            ]}>
            {selectedHour || selectedMinute
              ? `${selectedHour}:${selectedMinute}`
              : '방문 예정 시간'}
          </Text>
          <Pressable onPress={onPressTimeModalOpen}>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={30}
              color={'gray'}
            />
          </Pressable>
        </View>

        <View></View>

        <View style={styles.horizontalDivider} />

        <View style={styles.storeTextView}>
          <Text style={styles.storeText}>제일 가까운 주점은?</Text>
          <Text style={styles.storeSubText}>
            현재 위치에서 가장 가까운 주점을 알려드려요
          </Text>
        </View>

        <View style={styles.storeView}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollViewContent}>
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
                <View style={styles.storeInfoView}>
                  <View style={styles.backimageview}>
                    <ImageBackground
                      source={require('../../assets/MainPagetodayimg.png')}
                      style={styles.backimage}
                      imageStyle={styles.backimagestyle}
                    />
                  </View>
                  <View style={styles.storeViewInfo}>
                    <Text style={styles.storMainInfo}>{store.storeName}</Text>
                    <View style={styles.storeViewInfo}>
                      <FontAwesomeIcon name="star" size={15} color="#FCC104" />
                      <Text style={styles.storMainInfo}>{store.storeRate}</Text>
                    </View>
                  </View>
                  <View style={styles.storeViewInfo}>
                    {store.categories.slice(0, 3).map((category, index) => (
                      <MapCategory
                        key={index}
                        categories={[category]}
                        style={styles.StoreCategory}
                      />
                    ))}
                  </View>
                  <View style={styles.storeViewInfo}>
                    <Text style={styles.storeSubInfo}>
                      영업 종료 {store.closeHour.slice(0, 5)}
                    </Text>
                    <Text style={styles.storeSubInfo}>
                      {store.distance.toFixed(0)} m
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.bestStoreTextView}>
          <Text style={styles.storeText}>주점 인기 순위</Text>
        </View>

        <View style={styles.bsetStoreView1}>
          <View style={styles.bsetStoreView2}>
            <View style={styles.bsetStoreView3}>
              <Text style={styles.bestStoreTopNumText}>1</Text>
              <Text style={styles.bestStoreTopText}>가게 이름</Text>
            </View>

            <View style={styles.bsetStoreView3}>
              <Text style={styles.bestStoreTopNumText}>2</Text>
              <Text style={styles.bestStoreTopText}>가게 이름</Text>
            </View>

            <View style={styles.bsetStoreView3}>
              <Text style={styles.bestStoreTopNumText}>3</Text>
              <Text style={styles.bestStoreTopText}>가게 이름</Text>
            </View>

            <View style={styles.bsetStoreView3}>
              <Text style={styles.bestStoreNumText}>4</Text>
              <Text style={styles.bestStoreText}>가게 이름</Text>
            </View>

            <View style={styles.bsetStoreView3}>
              <Text style={styles.bestStoreNumText}>5</Text>
              <Text style={styles.bestStoreText}>가게 이름</Text>
            </View>
          </View>

          <View style={styles.bsetStoreView2}>
            <View style={styles.bsetStoreView3}>
              <Text style={styles.bestStoreNumText}>6</Text>
              <Text style={styles.bestStoreText}>가게 이름</Text>
            </View>

            <View style={styles.bsetStoreView3}>
              <Text style={styles.bestStoreNumText}>7</Text>
              <Text style={styles.bestStoreText}>가게 이름</Text>
            </View>

            <View style={styles.bsetStoreView3}>
              <Text style={styles.bestStoreNumText}>8</Text>
              <Text style={styles.bestStoreText}>가게 이름</Text>
            </View>

            <View style={styles.bsetStoreView3}>
              <Text style={styles.bestStoreNumText}>9</Text>
              <Text style={styles.bestStoreText}>가게 이름</Text>
            </View>

            <View style={styles.bsetStoreView3}>
              <Text style={styles.bestStoreNumText}>10</Text>
              <Text style={styles.bestStoreText}>가게 이름</Text>
            </View>
          </View>
        </View>

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <View style={styles.modaltopview}>
                {innercategories
                  .reduce((acc, {source, text, category}, indexinner) => {
                    const rowIndex = Math.floor(indexinner / 5);
                    if (!acc[rowIndex]) acc[rowIndex] = [];
                    acc[rowIndex].push(
                      // onPress 이벤트 제거
                      <Pressable
                        key={text}
                        style={styles.catagoryinnerView}
                        onPress={() => onPressCategory(text, category)} // onPress 이벤트 추가
                      >
                        <Image source={source} style={styles.catagoryimgs} />
                        <Text style={styles.catagorytext}>{text}</Text>
                      </Pressable>,
                    );
                    return acc;
                  }, [])
                  .map((row, indexinner) => (
                    <View key={indexinner} style={styles.catagoryView}>
                      {row}
                    </View>
                  ))}
                <View>
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

        <Modal
          visible={peopleModalVisible}
          animationType="slide"
          transparent={true}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.topText}>인원</Text>
              <View style={styles.peopleChoisView}>
                <Pressable
                  style={styles.radioButton}
                  onPress={() => onSelectPeople('8인 이하')}>
                  <Text
                    style={[
                      styles.radioText,
                      selectedPeople === '8인 이하' && styles.selectedRadioText,
                    ]}>
                    8인 이하
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.radioButton}
                  onPress={() => onSelectPeople('8인 이상')}>
                  <Text
                    style={[
                      styles.radioText,
                      selectedPeople === '8인 이상' && styles.selectedRadioText,
                    ]}>
                    8인 이상
                  </Text>
                </Pressable>
              </View>
              <Pressable
                onPress={onPressPeopleModalClose}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>닫기</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          visible={timeModalVisible}
          animationType="slide"
          transparent={true}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.topText}>방문 예정 시간</Text>

              <View style={styles.timeView}>
                <View style={styles.hourView}>
                  <View style={styles.Pickerview}>
                    <Picker
                      selectedValue={selectedHour}
                      onValueChange={itemValue => changeHour(itemValue)}
                      mode="dropdown"
                      style={styles.Pickeritems}>
                      {TimeHour.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item.label}
                          value={item.value}
                          style={styles.Pickeritems}
                        />
                      ))}
                    </Picker>
                  </View>

                  <Text style={styles.pikertext}>시</Text>
                </View>

                <View style={styles.minuteView}>
                  <View style={styles.Pickerview}>
                    <Picker
                      selectedValue={selectedMinute}
                      onValueChange={itemValue => changeMinute(itemValue)}
                      mode="dropdown"
                      style={styles.Pickeritems}>
                      {TimeMinute.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item.label}
                          value={item.value}
                          style={styles.Pickeritems}
                        />
                      ))}
                    </Picker>
                  </View>

                  <Text style={styles.pikertext}>분</Text>
                </View>
              </View>

              <Pressable
                onPress={onPressTimeModalClose}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>닫기</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          visible={fastSearchModalVisible}
          animationType="slide"
          transparent={true}>
          <View style={styles.fastSearchModalBackground}>
            <View style={styles.fastSearchModalContainer}>
              <Image
                source={require('../../assets/todaylogo.png')}
                style={styles.fastSearchModaltopimage}
              />
              <View style={styles.searchModaltopview}>
                <Pressable
                  onPress={onPressFastSearchModalClose}
                  style={styles.fastSearchModalcloseButton}>
                  <AntDesign name="arrowleft" size={25} color={'black'} />
                </Pressable>
              </View>
              <View style={styles.fastSearchTextView}>
                <Text style={styles.fastSearchText}>{selectedCategory}</Text>
                <Text style={styles.fastSearchText}>{selectedPeople}</Text>
                <Text style={styles.fastSearchText}>
                  {selectedHour}:{selectedMinute}
                </Text>
              </View>
              <ScrollView
                contentContainerStyle={styles.fastSearchModalScrollView}>
                {fastSearchStores.map(store => (
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

                      onPressFastSearchModalClose();
                    }}>
                    <View style={styles.fastSearchStoreInfo}>
                      <Image
                        source={require('../../assets/kim.png')}
                        style={styles.fastSearchStoreImage}
                      />
                      <View style={styles.fastStoreText}>
                        <View style={styles.fastSearchStoreView}>
                          <Text
                            style={styles.fastStoreTitle}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {store.storeName}
                          </Text>
                          <View style={styles.fastStorescore}>
                            <FontAwesomeIcon
                              name="star"
                              size={15}
                              color="#FCC104"
                            />
                            <Text style={styles.fastScoretext}>
                              {store.storeRate}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.fastStoreCategoryList}>
                          {store.categories
                            .slice(0, 3)
                            .map((category, index) => (
                              <MapCategory
                                key={index}
                                categories={[category]}
                                style={styles.fastStoreCategory}
                              />
                            ))}
                        </View>
                        <Text style={styles.fastStoreClose}>
                          영업 종료 {store.closeHour.slice(0, 5)}
                        </Text>
                        <Text style={styles.fastStoreMain}>대표 메뉴: </Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </ScrollView>

      {/* 하단에 고정된 검색 버튼 */}
      <TouchableOpacity onPress={onPressSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>검색</Text>
      </TouchableOpacity>
    </View>
  );
};

const innercategories = [
  {
    source: require('../../assets/free-icon-barbecue-4039250.png'),
    text: '이자카야',
    category: 'IZAKAYA',
  },
  {
    source: require('../../assets/free-icon-soju-5789309.png'),
    text: '한식주점',
    category: 'KOREAN',
  },
  {
    source: require('../../assets/free-icon-pizza-3595458.png'),
    text: '양식주점',
    category: 'WESTERN',
  },
  {
    source: require('../../assets/free-icon-dumplings-6560368.png'),
    text: '중화주점',
    category: 'CHINESE',
  },
  {
    source: require('../../assets/bar-counter_3822705.png'),
    text: '감성주점',
    category: 'GAMSEONG',
  },
  {
    source: require('../../assets/free-icon-jokbal-8740559.png'),
    text: '족발 보쌈',
    category: 'JOGBO',
  },
  {
    source: require('../../assets/free-icon-soup-12404665.png'),
    text: '찜 찌개',
    category: 'STEW',
  },
  {
    source: require('../../assets/free-icon-barbecue-4039250.png'),
    text: '구이 탕',
    category: 'GRILLED',
  },
  {
    source: require('../../assets/free-icon-roast-chicken-2137000.png'),
    text: '치킨',
    category: 'CHICKEN',
  },
  {
    source: require('../../assets/mayonnaise_3376991.png'),
    text: '전 막걸리',
    category: 'JEONMAK',
  },
  {
    source: require('../../assets/free-icon-squid-12752294.png'),
    text: '마른안주',
    category: 'DRIED',
  },
  {
    source: require('../../assets/free-icon-steamed-fish-2885062.png'),
    text: '해산물',
    category: 'SEAFOOD',
  },
  {
    source: require('../../assets/free-icon-folder-3370758.png'),
    text: '룸',
    category: 'ROOM',
  },
  {
    source: require('../../assets/free-icon-disco-ball-3935116.png'),
    text: '단체 행사',
    category: 'GROUP',
  },
  {
    source: require('../../assets/beers_2302167.png'),
    text: '야장',
    category: 'OUTDOOR',
  },
  {
    source: require('../../assets/free-icon-stall-food-6734735.png'),
    text: '포차',
    category: 'POCHA',
  },
  {
    source: require('../../assets/free-icon-beer-1887156.png'),
    text: '호프',
    category: 'HOF',
  },
  {
    source: require('../../assets/free-icon-wine-6454589.png'),
    text: '와인바',
    category: 'WINE',
  },
  {
    source: require('../../assets/free-icon-cocktail-3086535.png'),
    text: '칵테일',
    category: 'COCKTAIL',
  },
  {
    source: require('../../assets/free-icon-bar-counter-4507564.png'),
    text: '펍 바',
    category: 'PUBBAR',
  },
];

const TimeHour = [
  {label: '-', value: null},
  {label: '00', value: '00'},
  {label: '01', value: '01'},
  {label: '02', value: '02'},
  {label: '03', value: '03'},
  {label: '04', value: '04'},
  {label: '05', value: '05'},
  {label: '06', value: '06'},
  {label: '07', value: '07'},
  {label: '08', value: '08'},
  {label: '09', value: '09'},
  {label: '10', value: '10'},
  {label: '11', value: '11'},
  {label: '12', value: '12'},
  {label: '13', value: '13'},
  {label: '14', value: '14'},
  {label: '15', value: '15'},
  {label: '16', value: '16'},
  {label: '17', value: '17'},
  {label: '18', value: '18'},
  {label: '19', value: '19'},
  {label: '20', value: '20'},
  {label: '21', value: '21'},
  {label: '22', value: '22'},
  {label: '23', value: '23'},
];

const TimeMinute = [
  {label: '-', value: null},
  {label: '00', value: '00'},
  {label: '10', value: '10'},
  {label: '20', value: '20'},
  {label: '30', value: '30'},
  {label: '40', value: '40'},
  {label: '50', value: '50'},
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1, // 화면 전체를 차지하도록 설정
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 100, // 버튼 영역이 가려지지 않도록 여유 공간 추가
  },

  topView: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // 검색 영역을 가운데 정렬
  },
  search: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    width: '90%',
    borderRadius: 7,
    alignItems: 'center',
  },
  searchText: {
    fontSize: 15,
    color: 'gray',
    margin: 12,
  },
  searchTextInput: {
    flex: 1,
    color: 'black',
    fontSize: 16,
    paddingLeft: 10,
  },
  choisText: {
    fontSize: 15,
    color: '#767676',
    margin: 5,
    fontWeight: 'bold',
  },
  choisSelectedText: {
    fontSize: 15,
    color: '#16BBFF',
    margin: 5,
    fontWeight: 'bold',
  },
  searchIcon: {
    color: 'gray',
    marginLeft: 12,
    marginTop: 12,
    marginBottom: 12,
  },
  searchChois: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    alignItems: 'center',
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
    width: '90%',
  },
  fastSearch: {
    flexDirection: 'row',
    width: '90%',
    marginBottom: 5,
  },
  fastSearchText: {
    color: '#E0E0E0',
    fontWeight: 'bold',
    fontSize: 12,
  },
  storeTextView: {
    width: '100%',
    marginLeft: 60,
    marginTop: 10,
  },
  storeText: {
    marginTop: 10,
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
  },
  storeSubText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 7,
  },
  storeView: {
    marginTop: 1,
    width: '100%',
  },
  storeInfoView: {
    marginRight: 12,
  },
  horizontalScrollViewContent: {
    paddingHorizontal: 30, // 필요에 따라 조정
  },
  backimageview: {
    width: 170,
    height: 120,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backimage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  backimagestyle: {
    borderRadius: 12,
  },
  storeViewInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 3,
    marginLeft: 3,
    marginRight: 3,
  },
  StoreCategory: {
    fontSize: 13,
    color: '#A3A3A3',
    marginRight: 5,
  },
  storMainInfo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },

  storeSubInfo: {
    fontSize: 12,
    color: 'gray',
  },
  bestStoreTextView: {
    width: '100%',
    marginLeft: 60,
    marginTop: 30,
  },
  bsetStoreView1: {
    flexDirection: 'row',
    width: '90%',
    marginLeft: 10,
  },
  bsetStoreView2: {
    width: '50%',
    marginTop: 5,
  },
  bsetStoreView3: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bestStoreTopNumText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#16BBFF',
    width: '15%',
  },
  bestStoreTopText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#16BBFF',
  },
  bestStoreNumText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    width: '15%',
  },
  bestStoreText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
  searchButton: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    backgroundColor: '#16BBFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    alignSelf: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    paddingVertical: 5,
    paddingTop: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modaltopview: {
    width: '100%',
  },
  searchModaltopview: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -75,
  },
  fastSearchModalScrollView: {
    marginTop: 1,
    paddingBottom: 50,
  },
  fastSearchModalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  fastSearchModalContainer: {
    width: '90%',
    height: '85%',
    paddingVertical: 5,
    paddingTop: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  fastSearchTextView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  fastSearchText: {
    color: '#16BBFF',
    fontSize: 13,
    fontWeight: 'bold',
  },

  fastSearchModalcloseButton: {
    alignItems: 'center',
  },
  fastSearchModaltopimage: {
    width: 120,
    resizeMode: 'contain',
    height: 120,
    marginTop: -25,
  },

  fastSearchStoreInfo: {
    width: '90%',
    marginTop: 10,
    marginBottom: 7,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: '5%',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  fastSearchStoreImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  fastSearchStoreView: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 이름과 별점 사이 공간 추가
    alignItems: 'center',
    width: 200, // 제한된 너비로 텍스트 줄임표 효과 강화
    marginTop: 1,
  },
  fastStoreTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
    maxWidth: 150, // 이름이 줄여지는 최대 너비 설정
  },
  fastStoreText: {
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  fastStorescore: {
    flexDirection: 'row',
    alignItems: 'center', // 별점과 텍스트를 정렬
  },
  fastScoretext: {
    marginLeft: 3,
    fontSize: 15,
    color: 'black',
  },
  fastStoreCategoryList: {
    flexDirection: 'row',
    marginRight: 5,
  },
  fastStoreCategory: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
    marginRight: 5,
  },
  fastStoreClose: {
    fontSize: 13,
    color: 'black',
    marginRight: 5,
  },
  fastStoreMain: {
    fontSize: 12,
    color: 'black',
  },
  closeButton: {
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 6,
  },
  catagoryView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginTop: 15,
    textAlign: 'center',
  },
  catagoryinnerView: {
    padding: 5,
    alignItems: 'center',
  },
  catagoryimgs: {
    width: 40,
    resizeMode: 'contain',
    height: 40,
  },
  catagorytext: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 7,
  },
  topText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  peopleChoisView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  peopleChoisView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radioButton: {
    padding: 10,
    paddingRight: 50,
    paddingLeft: 50,
    borderRadius: 5,
  },
  radioText: {
    fontSize: 18,
    color: 'gray',
  },
  selectedRadioText: {
    fontWeight: 'bold',
    color: '#16BBFF',
  },
  Pickerview: {
    width: '50%',
    backgroundColor: '#F2F2F2',
    borderRadius: 7,
  },
  Pickeritems: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
  },
  pikertext: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
    paddingHorizontal: 10,
  },
  timeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 30,
  },
  hourView: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
  },
  minuteView: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SearchPage;
