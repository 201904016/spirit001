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
  Dimensions,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import AddressSearchPage from './AddressSearchPage';
import {getToken} from '../store/Storage';

const {width: screenWidth} = Dimensions.get('window');
const screenWidth90Percent = screenWidth * 0.9;

const StoreaddPage = ({navigation, route}) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const savedToken = await getToken();
      setToken(savedToken);
    };

    fetchToken();
  }, []);

  const [text, setText] = useState('');

  const [selectedValues, setSelectedValues] = useState(
    Array.from({length: 3}, () => categoriesitem[0].value),
  );

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedscreenOption, setselectedscreenOption] = useState(null);
  const [selectedclosedday, setselectedclosedday] = useState(null);

  const handleCheckBoxChange = index => {
    if (index === 0) {
      setSelectedOption(true);
    } else {
      setSelectedOption(false);
    }
  };

  const handleCheckBoxscreenChange = index => {
    if (index == 0) {
      setselectedscreenOption(true);
    } else {
      setselectedscreenOption(false);
    }
  };

  const handleclosedday = index => {
    setselectedclosedday(index);
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
  const {address = '', coords = {latitude: 0, longitude: 0}} =
    route.params || {};

  const [detailedAddress, setDetailedAddress] = useState('');
  const [storeNumber, setStoreNumber] = useState('');
  const [storeContent, setStoreContent] = useState('');
  const [selectedOpenHour, setSelectedOpenHour] = useState(null);
  const [selectedOpenMinute, setSelectedOpenMinute] = useState(null);
  const [selectedClosedHour, setSelectedClosedHour] = useState(null);
  const [selectedClosedMinute, setSelectedClosedMinute] = useState(null);

  const changeStoreName = text => {
    setStoreName(text);
  };
  const changeAddress = text => {
    setAddress(text);
  };
  const changeDetailedAddress = text => {
    setDetailedAddress(text);
  };
  const changeopenhour = text => {
    setSelectedOpenHour(text);
  };
  const changeopenminute = text => {
    setSelectedOpenMinute(text);
  };
  const changeclosehour = text => {
    setSelectedClosedHour(text);
  };
  const changecloseminute = text => {
    setSelectedClosedMinute(text);
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
      categories: [firstcategory, secondcategory, thirdcategory],
      address: address,
      detailedAddress: detailedAddress,
      storeNumber: storeNumber,
      storeContent: storeContent,
      openHour: `${selectedOpenHour}:${selectedOpenMinute}`,
      closeHour: `${selectedClosedHour}:${selectedClosedMinute}`,
      hasScreen: selectedscreenOption,
      isGroupAvailable: selectedOption,
      longitude: coords.longitude,
      latitude: coords.latitude,
    };

    fetch('http://kymokim.iptime.org:11082/api/store/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.status != 200) {
          Alert.alert(
            '안됨',
            '',
            [
              {
                text: '확인',
                style: 'destructive',
              },
            ],
            {cancelable: false},
          );
          return;
        } else {
          return response.json();
        }
      })
      .then(response => {
        if (response) {
          Alert.alert(
            '등록이 완료되었습니다.',
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
        }
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

          <Pressable
            style={styles.searchbutton}
            onPress={() => navigation.navigate(AddressSearchPage)}>
            <Text style={styles.locationText}>주소 검색</Text>
          </Pressable>
        </View>
        <Text>위도: {coords.latitude}</Text>
        <Text>경도: {coords.longitude}</Text>
        <View style={styles.storeinputview}>
          <Text style={styles.storeinputtext}>상세 주소</Text>
          <TextInput
            style={styles.storeinput}
            value={detailedAddress}
            onChangeText={changeDetailedAddress}
          />
        </View>
        <View style={styles.storeinputview}>
          <Text style={styles.storeinputtext}>영업 시간</Text>
        </View>
        <View style={styles.storeinputview}>
          <Text style={styles.pikertext}>시작</Text>
          <View style={styles.Pickerview}>
            <Picker
              selectedValue={selectedOpenHour}
              onValueChange={itemValue => changeopenhour(itemValue)}
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
          <View style={styles.Pickerview}>
            <Picker
              selectedValue={selectedOpenMinute}
              onValueChange={itemValue => changeopenminute(itemValue)}
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
        <View style={styles.storeinputview}>
          <Text style={styles.pikertext}>종료</Text>
          <View style={styles.Pickerview}>
            <Picker
              selectedValue={selectedClosedHour}
              onValueChange={itemValue => changeclosehour(itemValue)}
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
          <View style={styles.Pickerview}>
            <Picker
              selectedValue={selectedClosedMinute}
              onValueChange={itemValue => changecloseminute(itemValue)}
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
          <Text style={styles.storetext}>단체석 여부 8인 이상</Text>
        </View>
        <View style={styles.storeinputview}>
          <View style={styles.CheckBoxview}>
            <CheckBox
              value={selectedOption === true}
              onValueChange={() => handleCheckBoxChange(0)}
            />
            <Text style={styles.CheckBoxtext}>O</Text>
          </View>
          <View style={styles.CheckBoxview}>
            <CheckBox
              value={selectedOption === false}
              onValueChange={() => handleCheckBoxChange(1)}
            />
            <Text style={styles.CheckBoxtext}>X</Text>
          </View>
        </View>
        <View style={styles.storeinputview}>
          <Text style={styles.storetext}>스크린 여부</Text>
        </View>
        <View style={styles.storeinputview}>
          <View style={styles.CheckBoxview}>
            <CheckBox
              value={selectedscreenOption === true}
              onValueChange={() => handleCheckBoxscreenChange(0)}
            />
            <Text style={styles.CheckBoxtext}>O</Text>
          </View>
          <View style={styles.CheckBoxview}>
            <CheckBox
              value={selectedscreenOption === false}
              onValueChange={() => handleCheckBoxscreenChange(1)}
            />
            <Text style={styles.CheckBoxtext}>X</Text>
          </View>
        </View>
        <View style={styles.storeinputview}>
          <Text style={styles.storetext}>휴무일</Text>
        </View>
        <View style={styles.storeinputview}>
          <View style={styles.CheckBoxview}>
            <CheckBox
              value={selectedclosedday === 0}
              onValueChange={() => handleclosedday(0)}
            />
            <Text style={styles.CheckBoxtext}>월</Text>
          </View>
          <View style={styles.CheckBoxview}>
            <CheckBox
              value={selectedclosedday === 1}
              onValueChange={() => handleclosedday(1)}
            />
            <Text style={styles.CheckBoxtext}>화</Text>
          </View>
          <View style={styles.CheckBoxview}>
            <CheckBox
              value={selectedclosedday === 2}
              onValueChange={() => handleclosedday(2)}
            />
            <Text style={styles.CheckBoxtext}>수</Text>
          </View>
          <View style={styles.CheckBoxview}>
            <CheckBox
              value={selectedclosedday === 3}
              onValueChange={() => handleclosedday(3)}
            />
            <Text style={styles.CheckBoxtext}>목</Text>
          </View>
        </View>
        <View style={styles.storeinputview}>
          <View style={styles.CheckBoxview}>
            <CheckBox
              value={selectedclosedday === 4}
              onValueChange={() => handleclosedday(4)}
            />
            <Text style={styles.CheckBoxtext}>금</Text>
          </View>
          <View style={styles.CheckBoxview}>
            <CheckBox
              value={selectedclosedday === 5}
              onValueChange={() => handleclosedday(5)}
            />
            <Text style={styles.CheckBoxtext}>토</Text>
          </View>
          <View style={styles.CheckBoxview}>
            <CheckBox
              value={selectedclosedday === 6}
              onValueChange={() => handleclosedday(6)}
            />
            <Text style={styles.CheckBoxtext}>일</Text>
          </View>
          <View style={styles.CheckBoxview}></View>
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
  {label: '이자카야', value: 'IZAKAYA'},
  {label: '한식주점', value: 'KOREAN'},
  {label: '양식주점', value: 'WESTERN'},
  {label: '중화주점', value: 'CHINESE'},
  {label: '감성주점', value: 'GAMSEONG'},
  {label: '족발 보쌈', value: 'JOGBO'},
  {label: '찜 찌개', value: 'STEW'},
  {label: '구이 탕', value: 'GRILLED'},
  {label: '치킨', value: 'CHICKEN'},
  {label: '전 막걸리', value: 'JEONMAK'},
  {label: '마른안주', value: 'DRIED'},
  {label: '해산물', value: 'SEAFOOD'},
  {label: '룸', value: 'ROOM'},
  {label: '단체 행사', value: 'GROUP'},
  {label: '야장', value: 'OUTDOOR'},
  {label: '포차', value: 'POCHA'},
  {label: '호프', value: 'HOF'},
  {label: '와인바', value: 'WINE'},
  {label: '칵테일', value: 'COCKTAIL'},
  {label: '펍 바', value: 'PUBBAR'},
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
  searchbutton: {
    alignItems: 'center',
    width: '20%',
    marginVertical: 7,
    backgroundColor: '#16BBFF',
    paddingVertical: 5,
    borderRadius: 10,
    marginLeft: 10,
  },
  pikertext: {
    fontWeight: '400',
    fontSize: 14,
    color: 'black',
    paddingHorizontal: 10,
  },
});

export default StoreaddPage;
