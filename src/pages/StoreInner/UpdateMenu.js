import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Alert,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import {getToken} from '../../store/Storage';
import {useRoute} from '@react-navigation/native';

const UpdateMenu = ({navigation}) => {
  const route = useRoute();
  const {storeId, menuId} = route.params;
  const [token, setToken] = useState(null);
  const [menuName, setMemuName] = useState('');
  const [menuContent, setMenuContent] = useState('');
  const [price, setprice] = useState('');
  const [main, setMain] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const savedToken = await getToken();
      setToken(savedToken); // 토큰을 가져온 후에 데이터 요청
    };
    console.log(menuId);
    fetchToken();
  }, []);

  const changemenuName = text => {
    setMemuName(text);
  };
  const changemenuContent = text => {
    setMenuContent(text);
  };
  const changeprice = text => {
    setprice(text);
  };

  const handleCheckBoxscreenChange = index => {
    if (index == 0) {
      setMain(true);
    } else {
      setMain(false);
    }
  };

  const MenuUpdate = () => {
    const data = {
      menuId: menuId,
      menuName: menuName,
      price: price,
      menuContent: menuContent,
      main: main,
    };

    console.log(data, 'asd');

    fetch('http://kymokim.iptime.org:11082/api/menu/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        Alert.alert(
          '메뉴 수정 되었습니다.',
          '',
          [
            {
              text: '확인',
              style: 'destructive',
              onPress: () => {
                navigation.navigate('MainPage');
              },
            },
          ],
          {cancelable: false},
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.menuTopView}>
          <View style={styles.menuHeader}>
            <Text style={styles.menuHeaderText}>메뉴</Text>
          </View>
          <View style={styles.menuInputView}>
            <Text style={styles.menuInputText}>메뉴 이름</Text>
            <TextInput
              style={styles.menuInput}
              value={menuName}
              onChangeText={changemenuName}
              placeholder="메뉴 이름을 입력해주세요."
            />
          </View>
          <View style={styles.menuInputView}>
            <Text style={styles.menuInputText}>메뉴 가격</Text>
            <TextInput
              style={styles.menuInput}
              value={price}
              onChangeText={changeprice}
              placeholder="메뉴 가격을 입력해주세요."
            />
          </View>
          <View style={styles.menuInputView}>
            <Text style={styles.menuText}>메뉴 소개</Text>
          </View>
          <View style={styles.menuInputView}>
            <TextInput
              style={styles.textarea}
              value={menuContent}
              onChangeText={changemenuContent}
              placeholder="메뉴 소개를 입력해주세요."
            />
          </View>
          <View style={styles.checkBoxView}>
            <CheckBox
              value={main}
              onValueChange={() => handleCheckBoxscreenChange(0)}
            />
            <Text style={styles.checkBoxText}>대표 메뉴 설정</Text>
          </View>
          <View style={styles.menuAddImage}>
            <Text style={styles.menuText}>메뉴 사진 추가하기 (최대 1장)</Text>
          </View>
          <View style={styles.line}></View>
        </View>
        <Pressable style={styles.saveButton} onPress={MenuUpdate}>
          <Text style={styles.saveButtonText}>작성 완료</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    paddingBottom: 100, // 버튼 공간 확보
  },
  menuTopView: {
    alignItems: 'center',
  },
  menuHeader: {
    width: '80%',
    marginTop: 20,
    marginBottom: 10,
  },
  menuHeaderText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    marginRight: 7,
  },
  menuInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
    marginVertical: 7,
  },
  menuInputText: {
    fontWeight: '400',
    color: 'black',
    fontSize: 14,
    marginRight: 7,
  },
  menuInput: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingVertical: 1,
    flex: 1,
    paddingLeft: 10,
  },
  menuAddImage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
    marginVertical: 7,
  },
  menuText: {
    fontWeight: '400',
    color: 'black',
    fontSize: 14,
    marginVertical: 5,
    marginBottom: 5,
  },
  menuArea: {
    backgroundColor: '#F2F2F2',
    width: '100%',
    borderRadius: 10,
    maxHeight: 200,
    marginBottom: 10,
  },
  checkBoxView: {
    width: '80%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black',
  },
  checkBoxText: {
    color: 'black',
  },
  saveButton: {
    left: '10%',
    width: '80%',
    marginBottom: 10,
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#16BBFF',
    paddingVertical: 10,
    borderRadius: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  menuAddButton: {
    marginTop: 30,
    color: 'white',
    width: '20%',
    left: '40%',
    height: 30,
    fontSize: 12,
    borderWidth: 1, // 외곽선 두께
    borderColor: 'black', // 외곽선 색상
    borderRadius: 10,
    alignItems: 'center', // 수평 가운데 정렬
    justifyContent: 'center', // 수직 가운데 정렬
  },
  menuAddText: {
    color: 'black',
    fontSize: 13,
  },
  textarea: {
    backgroundColor: '#F2F2F2',
    width: '100%',
    borderRadius: 10,
    maxHeight: 200,
    marginBottom: 10,
    paddingLeft: 10,
  },
  line: {
    // borderTopWidth: 1,
    // borderColor: 'lightgray',
    width: '100%',
    marginVertical: 20,
    marginBottom: 10,
    paddingVertical: 4,
    backgroundColor: '#F2F2F2',
  },
});

export default UpdateMenu;
