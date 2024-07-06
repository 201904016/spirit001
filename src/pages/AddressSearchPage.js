import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';

const AddressSearchPage = ({navigation}) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedCoords, setSelectedCoords] = useState(null);

  const handleAddressSelect = async data => {
    console.log('Selected Address Data:', data);

    try {
      const {address} = data;
      const coords = await getLatLngFromAddress(address);

      console.log('위도:', coords.latitude, '경도:', coords.longitude);

      // 선택한 주소와 좌표를 상태로 설정
      setSelectedAddress(address);
      setSelectedCoords(coords);

      // 주소와 좌표를 상세 페이지로 넘기면서 네비게이트
      navigation.navigate('StoreaddPage', {
        address: address,
        coords: coords,
      });
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const getLatLngFromAddress = async address => {
    const apiKey = '9b09512f07cf4d2555413abbedcbcc3a'; // 카카오맵 API 키
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
      address,
    )}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.documents.length > 0) {
        const {x, y} = data.documents[0].address;
        return {latitude: y, longitude: x};
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  return (
    <Postcode
      style={{flex: 1, width: '100%', zIndex: 999}}
      jsOptions={{animation: true}}
      onSelected={handleAddressSelect}
    />
  );
};

export default AddressSearchPage;
