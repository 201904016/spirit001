import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image, Modal} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
import {getToken} from '../../store/Storage';

const StoreMenuPage = ({navigation}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const route = useRoute();
  const {storeId, innerlatitude, innerlongitude} = route.params;
  const [token, setToken] = useState(null);
  const [menus, setMenus] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePress = index => {
    if (index == 0) {
      navigation.navigate('UpdateMenu', {storeId: storeId});
    }
    onPressModalClose();
  };

  useEffect(() => {
    const fetchToken = async () => {
      const savedToken = await getToken();
      setToken(savedToken);
      getStoreData(savedToken);
    };
    fetchToken();
  }, []);

  const getStoreData = savedToken => {
    fetch(
      `http://kymokim.iptime.org:11082/api/store/get/${storeId}?latitude=${innerlatitude}&longitude=${innerlongitude}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': savedToken,
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        if (data && data.data && data.data.menuList) {
          setMenus(data.data.menuList);
          console.log('Menu List:', data.data.menuList);
        } else {
          console.log('Menu List not found');
          setMenus([]); // 빈 배열로 초기화
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <View style={styles.zz}>
      <View style={styles.SignatureTopView}>
        <View style={styles.MenuaddView}>
          <Pressable
            style={styles.MenuaddButton}
            onPress={() =>
              navigation.navigate('MenuaddPage', {storeId: storeId})
            }>
            <Text style={styles.MenuaddButtonText}>메뉴 추가하기</Text>
          </Pressable>
        </View>
        <View style={styles.SignatureTextView}>
          <Text style={styles.SignatureText}>대표메뉴</Text>
        </View>
        {menus
          .filter(menu => menu.isMain)
          .map(menu => (
            <View style={styles.SignatureMenuView}>
              <View style={styles.Signatureimgview}>
                <Image
                  source={
                    menu.imgUrl
                      ? {uri: menu.imgUrl}
                      : require('../../assets/kim.png')
                  }
                  style={styles.Signatureimg}
                />
              </View>
              <View style={styles.SignatureMenuTextsview}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.Signaturetitle}>{menu.menuName}</Text>
                  <Pressable
                    onPress={onPressModalOpen}
                    style={styles.updateicons}>
                    <MaterialCommunityIcons
                      name={'dots-vertical'}
                      size={17}
                      color={'black'}
                    />
                  </Pressable>
                </View>
                <Pressable onPress={toggleExpand}>
                  <Text
                    style={styles.Signaturecontent}
                    numberOfLines={isExpanded ? null : 2}>
                    {menu.menuContent}
                  </Text>
                </Pressable>
                <Text style={styles.Signatureprice}>{menu.price} 원</Text>
              </View>
            </View>
          ))}
      </View>
      <View style={styles.MenuTopView}>
        <View style={styles.SignatureTextView}>
          <Text style={styles.MenuText}>메뉴</Text>
        </View>
        {menus
          .filter(menu => menu.isMain === null || menu.isMain === false)
          .map(menu => (
            <View style={styles.SignatureMenuView}>
              <View style={styles.Signatureimgview}>
                <Image
                  source={
                    menu.imgUrl
                      ? {uri: menu.imgUrl}
                      : require('../../assets/kim.png')
                  }
                  style={styles.Signatureimg}
                />
              </View>
              <View style={styles.SignatureMenuTextsview}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.Signaturetitle}>{menu.menuName}</Text>
                  <Pressable
                    onPress={onPressModalOpen}
                    style={styles.updateicons}>
                    <MaterialCommunityIcons
                      name={'dots-vertical'}
                      size={17}
                      color={'black'}
                    />
                  </Pressable>
                </View>
                <Pressable onPress={toggleExpand}>
                  <Text
                    style={styles.Signaturecontent}
                    numberOfLines={isExpanded ? null : 2}>
                    {menu.menuContent}
                  </Text>
                </Pressable>
                <Text style={styles.Signatureprice}>{menu.price} 원</Text>
              </View>
            </View>
          ))}
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modaltopview}>
              <View>
                <Pressable
                  style={styles.modalupdeteview}
                  onPress={() => handlePress(0)}>
                  <Text style={styles.modalupdetetext}>메뉴 수정</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  zz: {marginBottom: 20},
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
});

export default StoreMenuPage;
