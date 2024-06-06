import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  ImageBackground,
  Modal,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import MainStack from '../components/MainStack';
import StoreaddPage from './StoreaddPage';
import Izakaya from './CategoryList/Izakaya';

const {width: screenWidth} = Dimensions.get('window');
const imageWidth = screenWidth - 24 * 2;
const imageMargin = 20;
const offset = imageWidth + imageMargin * 2;

const MainPage = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  const catagoryClick = index => {
    if (index >= 0 && index < 9) {
      navigation.navigate('StoreListTabbar', {screen: screens[index]});
    } else if (index === 9) {
      onPressModalOpen();
    }
  };

  const innercatagory = indexinner => {
    if (indexinner >= 0 && indexinner < screens.length) {
      navigation.navigate('StoreListTabbar', {screen: screens[indexinner]});
    }
    setIsModalVisible(false);
  };

  const [storeactiveIndex, setStoreActiveIndex] = useState(null);

  const handlestoreItemClick = index => {
    setStoreActiveIndex(index);
    if (index === 0) {
      navigation.navigate(StoreaddPage);
    }
  };

  const handlestoreItemOut = () => {
    setStoreActiveIndex(null);
  };

  return (
    <ScrollView style={styles.MainView}>
      <View style={styles.topbar}>
        <Ionicons name={'list'} size={30} color={'black'} />
        <Image
          source={require('../assets/spiritLogo.png')}
          style={styles.topimage}
        />
        <FontAwesomeIcon name="bell-o" size={30} color="black" />
      </View>
      <View style={styles.todayPhrasesView}>
        <Text style={styles.todayPhrases}>오늘의 술집 추전</Text>
      </View>
      <View style={styles.todayimageView}>
        <Image
          source={require('../assets/MainPagetodayimg.png')}
          style={styles.todayimage}
        />
      </View>
      <View style={styles.topdayweather}>
        <Text style={styles.todayweathertext}>맑zz음 온도:22</Text>
        <Text style={styles.todayweathertext}>강수확률:17%</Text>
        <Text style={styles.todayweathertext}>일몰시간 19:00</Text>
      </View>
      {categories
        .reduce((acc, {source, text}, index) => {
          const rowIndex1 = Math.floor(index / 5);
          if (!acc[rowIndex1]) acc[rowIndex1] = [];
          acc[rowIndex1].push(
            <Pressable
              key={text}
              onPress={() => catagoryClick(index)}
              style={styles.catagoryinnerView}>
              <Image source={source} style={styles.catagoryimgs} />
              <Text style={styles.catagorytext}>{text}</Text>
            </Pressable>,
          );
          return acc;
        }, [])
        .map((row, rowIndex1) => (
          <View key={rowIndex1} style={styles.catagoryView}>
            {row}
          </View>
        ))}
      <View style={styles.StoreregView}>
        <Pressable
          style={[
            styles.StorereginnerView,
            storeactiveIndex === 0 && styles.storeactiveBorder,
          ]}
          onPress={() => handlestoreItemClick(0)}
          onPressOut={handlestoreItemOut}>
          <Text style={styles.StoreMainText}>매장등록</Text>
          <Text style={styles.StoresubText}>스피릿에 매장을 등록해보세요!</Text>
        </Pressable>

        <Pressable
          style={[
            styles.StorereginnerView,
            storeactiveIndex === 1 && styles.storeactiveBorder,
          ]}
          onPress={() => handlestoreItemClick(1)}
          onPressOut={handlestoreItemOut}>
          <Text style={styles.StoreMainText}>매장 권한 등록</Text>
          <Text style={styles.StoresubText}>
            전국의 사장님들은 권한등록 부탁드려요!
          </Text>
        </Pressable>
      </View>
      <View style={styles.reviewView}>
        <View style={styles.reviewinnerView}>
          <Text style={styles.reviewtext}>리뷰수</Text>
          <Image
            source={require('../assets/free-icon-commenting-7351248.png')}
            style={styles.reviewimg}
          />
        </View>
        <View style={styles.reviewinnerView}>
          <Text style={styles.reviewtext}>별점</Text>
          <Image
            source={require('../assets/free-icon-stars-2190625.png')}
            style={styles.reviewimg}
          />
        </View>
        <View style={styles.reviewinnerView}>
          <Text style={styles.reviewtext}>재방문</Text>
          <Image
            source={require('../assets/free-icon-repost-5893999.png')}
            style={styles.reviewimg}
          />
        </View>
      </View>
      <View style={styles.reviewView}>
        <View style={styles.reviewinnerView}>
          <Text style={styles.reviewtext}>리뷰수</Text>
          <Image
            source={require('../assets/free-icon-24-hours-service-12881510.png')}
            style={styles.reviewimg}
          />
        </View>
        <View style={styles.reviewinnerView}>
          <Text style={styles.reviewtext}>별점</Text>
          <Image
            source={require('../assets/free-icon-money-bag-2460494.png')}
            style={styles.reviewimg}
          />
        </View>
        <View style={styles.reviewinnerView}>
          <Text style={styles.reviewtext}>재방문</Text>
          <Image
            source={require('../assets/free-icon-football-7048727.png')}
            style={styles.reviewimg}
          />
        </View>
      </View>
      <View style={styles.todayPhrasesView}>
        <Text style={styles.mylocationlivetext}>내 주변 실시간</Text>
      </View>
      <View style={styles.mylocationliveimgView}>
        <FlatList
          data={imageSources}
          horizontal
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item}) => (
            <Image source={item} style={styles.mylocationliveimgimg} />
          )}
          style={styles.mylocationliveimgView}
          snapToOffsets={Array.from(
            {length: imageSources.length},
            (_, index) => index * offset,
          )}
          decelerationRate="fast"
        />
      </View>
      <View style={styles.todayPhrasesView}>
        <Text style={styles.mylocationlivetext}>
          2~4인 가볍게 2차로 추전 드려요
        </Text>
      </View>
      <View>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scrollViewContent}>
          {items.map((item, index) => (
            <View key={index} style={styles.backimageview}>
              <ImageBackground
                source={require('../assets/MainPagetodayimg.png')}
                style={styles.backimage}
                imageStyle={styles.backimagestyle}>
                <View style={styles.MainTextView}>
                  <Text style={styles.MainText}>{item.name}</Text>
                  <Text style={styles.MainsubText}>{item.description}</Text>
                  <View style={styles.innerTextview}>
                    <Text style={styles.innertext}>{item.closeTime}</Text>
                    <Text style={styles.innertext}>{item.distance}</Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
          ))}
        </ScrollView>
      </View>
      <View>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scrollViewContent}>
          {items.map((item, index) => (
            <View key={index} style={styles.backimageview}>
              <ImageBackground
                source={require('../assets/MainPagetodayimg.png')}
                style={styles.backimage}
                imageStyle={styles.backimagestyle}>
                <View style={styles.MainTextView}>
                  <Text style={styles.MainText}>{item.name}</Text>
                  <Text style={styles.MainsubText}>{item.description}</Text>
                  <View style={styles.innerTextview}>
                    <Text style={styles.innertext}>{item.closeTime}</Text>
                    <Text style={styles.innertext}>{item.distance}</Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.todayPhrasesView}>
        <Text style={styles.mylocationlivetext}>최근 방문한 장소</Text>
      </View>
      <View>
        <ScrollView horizontal={true}>
          <View style={styles.recentView}>
            <Image
              source={require('../assets/jangan.png')}
              style={styles.recentimg}
            />
            <View style={styles.recentMainTextview}>
              <Text style={styles.recentMainText}>장안닭갈비</Text>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name={'star'} size={20} color={'yellow'} />
                <Text style={styles.recentMainText}>3.7</Text>
              </View>
            </View>
            <Text style={styles.recentsubText}>한식주점, 단체 행사</Text>
            <View style={styles.recenttimeview}>
              <Text style={styles.recenttimetext}>영업종료 02:00</Text>
              <Text style={{fontSize: 12}}>287m</Text>
            </View>
          </View>
          <View style={styles.recentView}>
            <Image
              source={require('../assets/jangan.png')}
              style={styles.recentimg}
            />
            <View style={styles.recentMainTextview}>
              <Text style={styles.recentMainText}>장안닭갈비</Text>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name={'star'} size={20} color={'yellow'} />
                <Text style={styles.recentMainText}>3.7</Text>
              </View>
            </View>
            <Text style={styles.recentsubText}>한식주점, 단체 행사</Text>
            <View style={styles.recenttimeview}>
              <Text style={styles.recenttimetext}>영업종료 02:00</Text>
              <Text style={{fontSize: 12}}>287m</Text>
            </View>
          </View>
          <View style={styles.recentView}>
            <Image
              source={require('../assets/jangan.png')}
              style={styles.recentimg}
            />
            <View style={styles.recentMainTextview}>
              <Text style={styles.recentMainText}>장안닭갈비</Text>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name={'star'} size={20} color={'yellow'} />
                <Text style={styles.recentMainText}>3.7</Text>
              </View>
            </View>
            <Text style={styles.recentsubText}>한식주점, 단체 행사</Text>
            <View style={styles.recenttimeview}>
              <Text style={styles.recenttimetext}>영업종료 02:00</Text>
              <Text style={{fontSize: 12}}>287m</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{alignItems: 'center', marginTop: 30}}>
        <Text style={styles.mylocationlivetext}>못 고르겠다면?!</Text>
      </View>
      <View style={styles.searchtopview}>
        <Pressable
          style={[
            styles.searchview,
            storeactiveIndex === 2 && styles.storeactiveBorder,
          ]}
          onPress={() => handlestoreItemClick(2)}
          onPressOut={handlestoreItemOut}>
          <Text style={styles.searchMainText}>내 주변 안주 찾기</Text>
          <View style={{flexDirection: 'row', width: screenWidth / 2.5}}>
            <Text style={styles.searchsubText}>
              가까운 거리에서{'\n'}최적의 안주를 {'\n'}찾아봐요!
            </Text>
            <Ionicons
              name={'location-outline'}
              size={50}
              color={'#474747'}
              style={styles.searchicon}
            />
          </View>
        </Pressable>
        <Pressable
          style={[
            styles.searchview,
            storeactiveIndex === 3 && styles.storeactiveBorder,
          ]}
          onPress={() => handlestoreItemClick(3)}
          onPressOut={handlestoreItemOut}>
          <Text style={styles.searchMainText}>랜덤 안주 고르기</Text>
          <View style={{flexDirection: 'row', width: screenWidth / 2.5}}>
            <Text style={styles.searchsubText}>
              다양한 안주 중에{'\n'}랜덤으로{'\n'}골라볼까요!
            </Text>
            <Ionicons
              name={'shuffle'}
              size={50}
              color={'#474747'}
              style={styles.searchicon}
            />
          </View>
        </Pressable>
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modaltopview}>
              {innercategories
                .reduce((acc, {source, text}, indexinner) => {
                  const rowIndex = Math.floor(indexinner / 5);
                  if (!acc[rowIndex]) acc[rowIndex] = [];
                  acc[rowIndex].push(
                    <Pressable
                      key={text}
                      style={styles.catagoryinnerView}
                      onPress={() => innercatagory(indexinner)}>
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
    </ScrollView>
  );
};

const categories = [
  {
    source: require('../assets/free-icon-barbecue-4039250.png'),
    text: '이자카야',
  },
  {source: require('../assets/free-icon-soju-5789309.png'), text: '한식주점'},
  {source: require('../assets/free-icon-pizza-3595458.png'), text: '양식주점'},
  {
    source: require('../assets/free-icon-dumplings-6560368.png'),
    text: '중화주점',
  },
  {
    source: require('../assets/free-icon-barbecue-4039250.png'),
    text: '감성주점',
  },
  {
    source: require('../assets/free-icon-jokbal-8740559.png'),
    text: '족발 보쌈',
  },
  {source: require('../assets/free-icon-soup-12404665.png'), text: '찜 찌개'},
  {
    source: require('../assets/free-icon-barbecue-4039250.png'),
    text: '구이 탕',
  },
  {
    source: require('../assets/free-icon-roast-chicken-2137000.png'),
    text: '치킨',
  },
  {source: require('../assets/free-icon-zoom-5460595.png'), text: '전체보기'},
];

const innercategories = [
  {
    source: require('../assets/free-icon-barbecue-4039250.png'),
    text: '이자카야',
  },
  {source: require('../assets/free-icon-soju-5789309.png'), text: '한식주점'},
  {source: require('../assets/free-icon-pizza-3595458.png'), text: '양식주점'},
  {
    source: require('../assets/free-icon-dumplings-6560368.png'),
    text: '중화주점',
  },
  {
    source: require('../assets/bar-counter_3822705.png'),
    text: '감성주점',
  },
  {
    source: require('../assets/free-icon-jokbal-8740559.png'),
    text: '족발 보쌈',
  },
  {source: require('../assets/free-icon-soup-12404665.png'), text: '찜 찌개'},
  {
    source: require('../assets/free-icon-barbecue-4039250.png'),
    text: '구이 탕',
  },
  {
    source: require('../assets/free-icon-roast-chicken-2137000.png'),
    text: '치킨',
  },
  {source: require('../assets/mayonnaise_3376991.png'), text: '전 막걸리'},
  {
    source: require('../assets/free-icon-squid-12752294.png'),
    text: '마른안주',
  },
  {
    source: require('../assets/free-icon-steamed-fish-2885062.png'),
    text: '해산물',
  },
  {
    source: require('../assets/free-icon-folder-3370758.png'),
    text: '룸',
  },
  {
    source: require('../assets/free-icon-disco-ball-3935116.png'),
    text: '단체 행사',
  },
  {source: require('../assets/beers_2302167.png'), text: '야장'},
  {
    source: require('../assets/free-icon-stall-food-6734735.png'),
    text: '포차',
  },
  {source: require('../assets/free-icon-beer-1887156.png'), text: '호프'},
  {
    source: require('../assets/free-icon-wine-6454589.png'),
    text: '와인바',
  },
  {
    source: require('../assets/free-icon-cocktail-3086535.png'),
    text: '칵테일',
  },
  {
    source: require('../assets/free-icon-bar-counter-4507564.png'),
    text: '펍 바',
  },
];

const imageSources = [
  require('../assets/MainPagetodayimg.png'),
  require('../assets/MainPagetodayimg.png'),
  require('../assets/MainPagetodayimg.png'),
];

const items = [
  {
    name: '모퉁이집',
    description: '한식주점 단체',
    closeTime: '영업종료 02:00',
    distance: '287m',
  },
  {
    name: '친구포차',
    description: '한식주점 포차',
    closeTime: '영업종료 00:00',
    distance: '127m',
  },
  {
    name: '봉이동동',
    description: '한식주점 탕',
    closeTime: '영업종료 01:00',
    distance: '312m',
  },
  {
    name: '역전할머니 맥주',
    description: '치킨 호프',
    closeTime: '영업종료 04:00',
    distance: '267m',
  },
];

const screens = [
  'Izakaya',
  'Koreafood',
  'Westernfood',
  'Chinesefood',
  'Emotional',
  'Jokbal',
  'Steamedfood',
  'Grilled',
  'Chicken',
  'Pancake',
  'Dried',
  'Seafood',
  'Room',
  'Group',
  'Yajang',
  'Pocha',
  'Hope',
  'Winebar',
  'Cocktail',
  'Pupbar',
];

const styles = StyleSheet.create({
  MainView: {
    backgroundColor: 'white',
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    alignItems: 'center',
    marginVertical: 5,
  },
  topimage: {
    width: 70,
    resizeMode: 'contain',
    height: 70,
  },
  todayPhrasesView: {
    marginTop: 10,
    marginLeft: 25,
    marginBottom: 5,
  },
  todayPhrases: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  todayimageView: {
    alignItems: 'center',
  },
  todayimage: {
    width: '90%',
    height: 150,
    borderRadius: 20,
    marginVertical: 5,
  },
  topdayweather: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  todayweathertext: {
    fontSize: 12,
    color: 'black',
    marginBottom: 7,
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
  StoreregView: {
    flexDirection: 'row',
    height: 120,
    backgroundColor: '#EFF3F6',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 15,
  },
  StorereginnerView: {
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 15,
    backgroundColor: 'white',
    width: '47%',
    alignItems: 'flex-start',
    padding: 10,
  },
  StoreMainText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  StoresubText: {
    fontSize: 12,
    fontWeight: '200',
    marginTop: 7,
  },
  storeactiveBorder: {
    borderColor: 'skyblue',
  },

  reviewView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  reviewinnerView: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    width: '30%',
    padding: 7,
    marginTop: 20,
  },
  reviewtext: {
    color: 'black',
    fontWeight: '100',
    fontSize: 14,
  },
  reviewimg: {
    width: 60,
    resizeMode: 'contain',
    height: 60,
  },
  mylocationlivetext: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  mylocationliveimgView: {
    marginTop: 5,
  },
  mylocationliveimgimg: {
    width: screenWidth - 24 * 2,
    resizeMode: 'cover',
    height: 130,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  backimageview: {
    width: 150,
    height: 150,
    margin: 10,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backimage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  backimagestyle: {
    borderRadius: 20,
  },
  MainTextView: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  MainText: {
    marginTop: 30,
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
  },
  MainsubText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  innerTextview: {
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  innertext: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
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
  searchtopview: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    marginBottom: 40,
    marginHorizontal: 30,
  },
  searchview: {
    borderColor: 'lightgray',
    borderWidth: 2,
    borderRadius: 7,
    width: screenWidth / 2.5,
    height: 'auto',
  },
  searchMainText: {
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 13,
  },
  searchsubText: {
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 10,
    color: 'gray',
    fontWeight: '300',
    fontSize: 12,
    paddingBottom: 10,
  },
  searchicon: {
    paddingLeft: 5,
    paddingTop: 10,
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
});

export default MainPage;
