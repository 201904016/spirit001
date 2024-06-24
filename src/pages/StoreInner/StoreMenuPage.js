import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const StoreMenuPage = ({navigation}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.zz}>
      <View style={styles.SignatureTopView}>
        <View style={styles.MenuaddView}>
          <Pressable
            style={styles.MenuaddButton}
            onPress={() => navigation.navigate('MenuaddPage')}>
            <Text style={styles.MenuaddButtonText}>메뉴 추가하기</Text>
          </Pressable>
        </View>
        <View style={styles.SignatureTextView}>
          <Text style={styles.SignatureText}>대표메뉴</Text>
        </View>
        <View style={styles.SignatureMenuView}>
          <View style={styles.Signatureimgview}>
            <Image
              source={require('../../assets/kim.png')}
              style={styles.Signatureimg}
            />
          </View>
          <View style={styles.SignatureMenuTextsview}>
            <Text style={styles.Signaturetitle}>스케줄 김치 볶음밥</Text>
            <Pressable onPress={toggleExpand}>
              <Text
                style={styles.Signaturecontent}
                numberOfLines={isExpanded ? null : 2}>
                튀긴 호박 고구마가 들어간 청담동에서 가장맛있는 김치볶음밥
              </Text>
            </Pressable>
            <Text style={styles.Signatureprice}>10,000 원</Text>
          </View>
        </View>
        <View style={styles.SignatureMenuView}>
          <View style={styles.Signatureimgview}>
            <Image
              source={require('../../assets/kim.png')}
              style={styles.Signatureimg}
            />
          </View>
          <View style={styles.SignatureMenuTextsview}>
            <Text style={styles.Signaturetitle}>스케줄 김치 볶음밥</Text>
            <Pressable onPress={toggleExpand}>
              <Text
                style={styles.Signaturecontent}
                numberOfLines={isExpanded ? null : 2}>
                튀긴 호박 고구마가 들어간 청담동에서 가장맛있는 김치볶음밥
              </Text>
            </Pressable>
            <Text style={styles.Signatureprice}>10,000 원</Text>
          </View>
        </View>
        <View style={styles.SignatureMenuView}>
          <View style={styles.Signatureimgview}>
            <Image
              source={require('../../assets/kim.png')}
              style={styles.Signatureimg}
            />
          </View>
          <View style={styles.SignatureMenuTextsview}>
            <Text style={styles.Signaturetitle}>스케줄 김치 볶음밥</Text>
            <Pressable onPress={toggleExpand}>
              <Text
                style={styles.Signaturecontent}
                numberOfLines={isExpanded ? null : 2}>
                튀긴 호박 고구마가 들어간 청담동에서 가장맛있는 김치볶음밥
              </Text>
            </Pressable>
            <Text style={styles.Signatureprice}>10,000 원</Text>
          </View>
        </View>
      </View>
      <View style={styles.MenuTopView}>
        <View style={styles.SignatureTextView}>
          <Text style={styles.MenuText}>메뉴</Text>
        </View>
        <View style={styles.SignatureMenuView}>
          <View style={styles.Signatureimgview}>
            <Image
              source={require('../../assets/kim.png')}
              style={styles.Signatureimg}
            />
          </View>
          <View style={styles.SignatureMenuTextsview}>
            <Text style={styles.Signaturetitle}>스케줄 김치 볶음밥</Text>
            <Pressable onPress={toggleExpand}>
              <Text
                style={styles.Signaturecontent}
                numberOfLines={isExpanded ? null : 2}>
                튀긴 호박 고구마가 들어간 청담동에서 가장맛있는 김치볶음밥
              </Text>
            </Pressable>
            <Text style={styles.Signatureprice}>10,000 원</Text>
          </View>
        </View>
        <View style={styles.SignatureMenuView}>
          <View style={styles.Signatureimgview}>
            <Image
              source={require('../../assets/kim.png')}
              style={styles.Signatureimg}
            />
          </View>
          <View style={styles.SignatureMenuTextsview}>
            <Text style={styles.Signaturetitle}>스케줄 김치 볶음밥</Text>
            <Pressable onPress={toggleExpand}>
              <Text
                style={styles.Signaturecontent}
                numberOfLines={isExpanded ? null : 2}>
                튀긴 호박 고구마가 들어간 청담동에서 가장맛있는 김치볶음밥
              </Text>
            </Pressable>
            <Text style={styles.Signatureprice}>10,000 원</Text>
          </View>
        </View>
        <View style={styles.SignatureMenuView}>
          <View style={styles.Signatureimgview}>
            <Image
              source={require('../../assets/kim.png')}
              style={styles.Signatureimg}
            />
          </View>
          <View style={styles.SignatureMenuTextsview}>
            <Text style={styles.Signaturetitle}>스케줄 김치 볶음밥</Text>
            <Pressable onPress={toggleExpand}>
              <Text
                style={styles.Signaturecontent}
                numberOfLines={isExpanded ? null : 2}>
                튀긴 호박 고구마가 들어간 청담동에서 가장맛있는 김치볶음밥
              </Text>
            </Pressable>
            <Text style={styles.Signatureprice}>10,000 원</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  zz: {marginBottom: 400},
  SignatureTopView: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderTopWidth: 0,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingBottom: 20,
  },
  MenuaddView: {
    width: '80%',
    marginVertical: 20,
  },
  MenuaddButton: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#84D1F4',
    paddingVertical: 6,
  },
  MenuaddButtonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  SignatureTextView: {
    width: '80%',
    marginBottom: 15,
  },
  SignatureText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  SignatureMenuView: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  Signatureimg: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  SignatureMenuTextsview: {
    flex: 1,
    paddingLeft: 7,
  },
  Signaturetitle: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  Signaturecontent: {
    paddingVertical: 5,
    fontSize: 12,
    color: 'black',
    fontWeight: '400',
  },
  Signatureprice: {
    fontSize: 12,
    color: 'red',
    fontWeight: '400',
  },
  MenuTopView: {
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
    justifyContent: 'space-between',
  },
  MenuText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 30,
  },
});

export default StoreMenuPage;
