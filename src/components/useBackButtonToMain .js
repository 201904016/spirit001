import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

import MainPage from '../pages/MainPage';

const useBackButtonToMain = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = () => {
      navigation.navigate('MainPage');
    };

    const listener = navigation.addListener('beforeBlur', backHandler);

    return () => listener.remove(); // 리스너를 제거합니다.
  }, [navigation]);
};

export default useBackButtonToMain;
