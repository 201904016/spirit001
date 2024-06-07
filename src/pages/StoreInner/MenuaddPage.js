import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

const MenuaddPage = () => {
  const [menuName, setMenuName] = useState('');
  const [price, setPrice] = useState('');
  const [menuContent, setMenuContent] = useState('');

  const handleMenuNameChange = text => {
    setMenuName(text);
  };

  const handlePriceChange = text => {
    setPrice(text);
  };

  const handleMenuContentChange = text => {
    setMenuContent(text);
  };

  const [isSelected, setIsSelected] = useState(false);
  const handleCheckBoxChange = () => {
    setIsSelected(!isSelected); // 선택 상태를 반전시킵니다.
  };

  const MenuAdd = () => {
    var data = {
      menuName: menuName,
      price: price,
      menuContent: menuContent,
      storeId: 1,
    };
    console.log(data + 'asd');

    fetch('http://kymokim.iptime.org:11082/api/menu/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response.data);
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
            <Text style={styles.menuHeaderText}>메뉴 1</Text>
          </View>
          <View style={styles.menuInputView}>
            <Text style={styles.menuInputText}>메뉴 이름</Text>
            <TextInput
              style={styles.menuInput}
              value={menuName}
              onChangeText={handleMenuNameChange}
              placeholder="메뉴 이름을 입력해주세요."
            />
          </View>
          <View style={styles.menuInputView}>
            <Text style={styles.menuInputText}>메뉴 가격</Text>
            <TextInput
              style={styles.menuInput}
              value={price}
              onChangeText={handlePriceChange}
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
              onChangeText={handleMenuContentChange}
              placeholder="메뉴 소개를 입력해주세요."
            />
          </View>
          <View style={styles.checkBoxView}>
            <CheckBox
              value={isSelected} // 선택 상태를 prop으로 전달합니다.
              onValueChange={handleCheckBoxChange} // 체크박스 변경 시 호출되는 함수를 지정합니다.
            />
            <Text style={styles.checkBoxText}>대표 메뉴 설정</Text>
          </View>
          <View style={styles.menuAddImage}>
            <Text style={styles.menuText}>메뉴 사진 추가하기 (최대 1장)</Text>
          </View>
          <View style={styles.menuAddButton}>
            <Text style={styles.menuAddText}>메뉴 추가</Text>
          </View>
          <View>
            <Pressable style={styles.saveButton} onPress={MenuAdd}>
              <Text style={styles.saveButtonText}>작성 완료</Text>
            </Pressable>
          </View>
        </View>
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
  },
});

export default MenuaddPage;
