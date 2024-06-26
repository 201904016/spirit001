import React, {useState} from 'react';
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
  Dimensions,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';

const {width: screenWidth} = Dimensions.get('window');
const screenWidth90Percent = screenWidth * 0.9;

const StoreaddPage = () => {
  const [text, setText] = useState('');

  const [selectedValues, setSelectedValues] = useState(
    Array.from({length: 3}, () => categoriesitem[0].value),
  );

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedscreenOption, setselectedscreenOption] = useState(null);

  const handleCheckBoxChange = index => {
    setSelectedOption(index);
  };

  const handleCheckBoxscreenChange = index => {
    setselectedscreenOption(index);
  };

  const handleValueChange = (itemValue, itemIndex, pickerIndex) => {
    const newSelectedValues = [...selectedValues];
    newSelectedValues[pickerIndex] = itemValue;
    setSelectedValues(newSelectedValues);
    switch (pickerIndex) {
      case 0:
        setFirstcategory(itemValue);
        break;
      case 1:
        setSecondcategory(itemValue);
        break;
      case 2:
        setThirdcategory(itemValue);
        break;
      default:
        break;
    }
  };

  const [storeName, setStoreName] = useState('');
  const [firstcategory, setFirstcategory] = useState(categoriesitem[0].value);
  const [secondcategory, setSecondcategory] = useState(categoriesitem[0].value);
  const [thirdcategory, setThirdcategory] = useState(categoriesitem[0].value);
  const [address, setAddress] = useState('');
  const [storeNumber, setStoreNumber] = useState('');
  const [storeContent, setStoreContent] = useState('');
  const [openHour, setOpenHour] = useState('');
  const [closepenHour, setCloseHour] = useState('');
  const [longitude, setIongitude] = useState('');
  const [lititude, setLititude] = useState('');

  const changeStoreName = text => {
    setStoreName(text);
  };
  const changeAddress = text => {
    setAddress(text);
  };
  const changeOpenHour = text => {
    setOpenHour(text);
  };
  const StoreNumber = text => {
    setStoreNumber(text);
  };
  const onChangeText = inputText => {
    setStoreContent(inputText);
  };

  const StoreAdd = () => {
    var data = {
      storeName: storeName,
      firstCategory: firstcategory,
      secondCategory: secondcategory,
      thirdCategory: thirdcategory,
      address: address,
      storeNumber: storeNumber,
      storeContent: storeContent,
      openHour: openHour,
    };

    fetch('http://kymokim.iptime.org:11082/api/store/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token':
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMiLCJyb2xlIjoiUk9MRV9VU0VSIiwiZXhwIjoxNzE3NzYwODQwfQ.ru3LZWRowTsKo2ADqVbpWz7Gmq8iwVFbbyM0DoyH3FU',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <ScrollView>
      <View style={styles.storetopview}>
        <View style={styles.storeinputview}>
          <Text style={styles.storeinputtext}>매장 이름</Text>
          <TextInput
            style={styles.storeinput}
            value={storeName}
            onChangeText={changeStoreName}
          />
        </View>
        <View style={styles.storeinputview}>
          <Text style={styles.storeinputtext}>매장 주소</Text>
          <TextInput
            style={styles.storeinput}
            value={address}
            onChangeText={changeAddress}
          />
        </View>
        <View style={styles.storeinputview}>
          <Text style={styles.storeinputtext}>영업 시간</Text>
          <TextInput
            style={styles.storeinput}
            value={openHour}
            onChangeText={changeOpenHour}
          />
        </View>
        <View style={styles.storeinputview}>
          <Text style={styles.storeinputtext}>전화 번호</Text>
          <TextInput
            style={styles.storeinput}
            value={storeNumber}
            onChangeText={StoreNumber}
          />
        </View>
        <View style={styles.storeinputview}>
          <Text style={styles.storetext}>매장 소개</Text>
        </View>
        <View style={styles.storeinputview}>
          <TextInput
            style={styles.textarea}
            multiline
            onChangeText={onChangeText}
            value={storeContent}
          />
        </View>
        <View style={styles.storeinputview}>
          <Text style={styles.storetext}>카테고리 선택(필수)</Text>
        </View>
        <View style={styles.storeinputview}>
          {Array.from({length: 3}).map((_, index) => (
            <View style={styles.Pickerview} key={index}>
              <Picker
                selectedValue={selectedValues[index]}
                onValueChange={(itemValue, itemIndex) =>
                  handleValueChange(itemValue, itemIndex, index)
                }
                mode="dropdown">
                {categoriesitem.map((item, itemIndex) => (
                  <Picker.Item
                    key={itemIndex}
                    label={item.label}
                    value={item.value}
                    style={styles.Pickeritems}
                  />
                ))}
              </Picker>
            </View>
          ))}
        </View>
        <View style={styles.storeinputview}>
          <Text style={styles.storetext}>입장 인원 추천</Text>
        </View>
        <View style={styles.storeinputview}>
          <View style={styles.CheckBoxview}>
            <CheckBox
              value={selectedOption === 0}
              onValueChange={() => handleCheckBoxChange(0)}
            />
            <Text style={styles.CheckBoxtext}>1인</Text>
          </View>
          <View style={styles.CheckBoxview}>
            <CheckBox
              value={selectedOption === 1}
              onValueChange={() => handleCheckBoxChange(1)}
            />
            <Text style={styles.CheckBoxtext}>2~4인</Text>
          </View>
          <View style={styles.CheckBoxview}>
            <CheckBox
              value={selectedOption === 2}
              onValueChange={() => handleCheckBoxChange(2)}
            />
            <Text style={styles.CheckBoxtext}>4~8인</Text>
          </View>
          <View style={styles.CheckBoxview}>
            <CheckBox
              value={selectedOption === 3}
              onValueChange={() => handleCheckBoxChange(3)}
            />
            <Text style={styles.CheckBoxtext}>8인이상</Text>
          </View>
        </View>
        <View style={styles.storeinputview}>
          <Text style={styles.storetext}>스크린 여부</Text>
        </View>
        <View style={styles.storeinputview}>
          <View style={styles.CheckBoxview}>
            <CheckBox
              value={selectedscreenOption === 0}
              onValueChange={() => handleCheckBoxscreenChange(0)}
            />
            <Text style={styles.CheckBoxtext}>O</Text>
          </View>
          <View style={styles.CheckBoxview}>
            <CheckBox
              value={selectedscreenOption === 1}
              onValueChange={() => handleCheckBoxscreenChange(1)}
            />
            <Text style={styles.CheckBoxtext}>X</Text>
          </View>
        </View>
        <View style={styles.storeinputview}>
          <Text style={styles.storetext}>메뉴 사진 추가하기 (최대 5장)</Text>
        </View>
        <View></View>
        <Pressable style={styles.savebutton} onPress={StoreAdd}>
          <Text style={styles.savebuttontext}>작성 완료</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const categoriesitem = [
  {label: '-', value: null},
  {label: '이자카야', value: '이자카야'},
  {label: '한식주점', value: '한식주점'},
  {label: '양식주점', value: '양식주점'},
  {label: '중화주점', value: '중화주점'},
  {label: '감성주점', value: '감성주점'},
  {label: '족발 보쌈', value: '족발 보쌈'},
  {label: '찜 찌개', value: '찜 찌개'},
  {label: '구이 탕', value: '구이 탕'},
  {label: '치킨', value: '치킨'},
  {label: '전 막걸리', value: '전 막걸리'},
  {label: '마른안주', value: '마른안주'},
  {label: '해산물', value: '해산물'},
  {label: '룸', value: '룸'},
  {label: '단체 행사', value: '단체 행사'},
  {label: '야장', value: '야장'},
  {label: '포차', value: '포차'},
  {label: '호프', value: '호프'},
  {label: '와인바', value: '와인바'},
  {label: '칵테일', value: '칵테일'},
  {label: '펍 바', value: '펍 바'},
];

const styles = StyleSheet.create({
  storetopview: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  storeinputview: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 7,
  },
  storeinputtext: {
    fontWeight: '400',
    color: 'black',
    fontSize: 14,
    marginRight: 7,
  },
  storeinput: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingVertical: 1,
    flex: 1,
  },
  storetext: {
    fontWeight: '400',
    color: 'black',
    fontSize: 14,
    marginVertical: 5,
    marginBottom: 5,
  },
  textarea: {
    backgroundColor: '#F2F2F2',
    width: '100%',
    borderRadius: 10,
    maxHeight: 200,
    marginBottom: 10,
  },
  Pickerview: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    marginHorizontal: 5,
    borderRadius: 10,
  },
  PickerinnerView: {
    width: 10,
    color: 'red',
    fontSize: 10,
  },
  Pickeritems: {
    fontSize: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  CheckBoxview: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black',
  },
  CheckBoxtext: {
    fontWeight: 'bold',
    color: 'black',
  },

  savebutton: {
    alignItems: 'center',
    width: '80%',
    marginVertical: 7,
    backgroundColor: '#16BBFF',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 30,
  },
  savebuttontext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default StoreaddPage;
