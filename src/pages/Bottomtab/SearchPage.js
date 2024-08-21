import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Line, ImageBackground} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import axios from 'axios';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';

const SearchPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.search}>
          <EvilIcons
            style={styles.searchIcon}
            name="search"
            size={30}
            color={'gray'}
          />
          <Text style={styles.searchText}>검색어를 입력해주세요.</Text>
        </View>
      </View>

      <View style={styles.searchChois}>
        <Text style={styles.choisText}>카테고리</Text>
        <MaterialIcons name="keyboard-arrow-down" size={30} color={'gray'} />
      </View>

      <View style={styles.horizontalDivider} />

      <View style={styles.searchChois}>
        <Text style={styles.choisText}>인원</Text>
        <MaterialIcons name="keyboard-arrow-down" size={30} color={'gray'} />
      </View>

      <View style={styles.horizontalDivider} />

      <View style={styles.searchChois}>
        <Text style={styles.choisText}>방문 예정 시간</Text>
        <MaterialIcons name="keyboard-arrow-down" size={30} color={'gray'} />
      </View>

      <View style={styles.horizontalDivider} />

      <View style={styles.searchChois}>
        <Text style={styles.choisText}>지역</Text>
        <MaterialIcons name="keyboard-arrow-down" size={30} color={'gray'} />
      </View>

      <View style={styles.horizontalDivider} />

      <View style={styles.storeView}>
        <View>
          <Text style={styles.storeText}>내 주변 인기 매장 TOP 5</Text>
        </View>
        <ScrollView
          horizontal={true} // 가로 스크롤 가능하도록 설정
          showsHorizontalScrollIndicator={false} // 스크롤바 표시 여부 설정
          contentContainerStyle={styles.scrollViewContent} // 스크롤뷰 내부 컨텐츠 스타일 설정
        >
          <View style={styles.backimageview}>
            <ImageBackground
              source={require('../../assets/MainPagetodayimg.png')}
              style={styles.backimage}
              imageStyle={styles.backimagestyle}
            />
            <View>
              <Text>안녕</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <View>
        <Text>식당 목록</Text>
      </View>
      <View>
        <Text>인기 순위</Text>
      </View>
      <View style={styles.bsetStore}>
        <View>
          <Text>1~5</Text>
        </View>
        <View>
          <Text>6~10</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  topView: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center', // 수직 가운데 정렬
  },
  search: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    width: '85%',
    borderRadius: 7,
    alignItems: 'center', // 수직 가운데 정렬
  },
  searchText: {
    fontSize: 15,
    color: 'gray',
    margin: 12,
  },
  choisText: {
    fontSize: 15,
    color: 'black',
    margin: 12,
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
    alignItems: 'center', // 수직 가운데 정렬
  },
  bsetStore: {
    flexDirection: 'row',
  },

  horizontalDivider: {
    height: 1, // 높이를 1로 설정하여 얇은 선을 만듭니다.
    backgroundColor: '#E0E0E0', // 선의 색상
    marginVertical: 10, // 상하 간격
    width: '90%',
  },
  textViwe: {
    marginTop: 30,
    alignItems: 'flex-start',
  },
  storeView: {
    marginTop: 30,
    width: '90%',
    marginLeft: 10,
  },
  storeText: {
    marginTop: 10,
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  backimageview: {
    width: 150,
    height: 150,
    marginTop: 20,
    marginRight: 10,
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
});

export default SearchPage;
