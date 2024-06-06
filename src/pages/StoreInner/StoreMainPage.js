import React, {useState} from 'react';
import {View, Text, Pressable, ImageBackground, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuaddPage from './MenuaddPage';

const StoreMainPage = ({navigation}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
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
          <Text style={styles.Storetitle}>스케줄 청담</Text>
          <Text style={styles.Storesubtitle}>양식 주점</Text>
        </View>
        <View style={styles.RiviewView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name={'star'} size={20} color={'yellow'} />
            <Text style={styles.riviewtext}>4.2</Text>
          </View>
          <Text style={styles.riviewtext}>고객 리뷰 1,105</Text>
          <Text style={styles.riviewtext}>찜 982</Text>
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
          <Text style={styles.locationtext}>
            서울 강남구 선릉로 152번길 37 1층
          </Text>
        </View>
        <View style={styles.timeview}>
          <Text style={styles.timetextnow}>영업 중</Text>
          <Text style={styles.timetext}>영업 종료 - 02:00</Text>
        </View>
        <View style={styles.introduceview}>
          <Pressable onPress={toggleExpand}>
            <Text
              style={styles.locationtext}
              numberOfLines={isExpanded ? null : 2}>
              스케줄은 다양한 음식, 디저트와 함께 주류 및 최상의 서비스 까지 한
              자리에서 즐길 수 있는 트렌디한 복합 문화 공간입니다.
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
      <View>
        <Pressable onPress={() => navigation.navigate('MenuaddPage')}>
          <Text>메뉴추가</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  StoreTopView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
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
    width: '40%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 5,
  },
  Storetitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
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
  },
});

export default StoreMainPage;
