import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image, Modal} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StoreRiviewPage = ({navigation}) => {
  const [isExpanded, setIsExpanded] = useState(false);
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

  return (
    <View style={styles.zz}>
      <View style={styles.SignatureTopView}>
        <View style={styles.MenuaddView}>
          <Pressable style={styles.MenuaddButton} onPress={onPressModalOpen}>
            <Text style={styles.MenuaddButtonText}>리뷰 추가하기</Text>
          </Pressable>
        </View>
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modaltopview}>
              <View>
                <View>
                  <Pressable
                    style={styles.MenuaddButton}
                    onPress={() => navigation.navigate('ReceiptRiviewPage')}>
                    <Ionicons
                      name={'receipt - outline'}
                      size={25}
                      color={'black'}
                    />
                    <Text style={styles.MenuaddButtonText}>
                      영수증 리뷰 작성
                    </Text>
                  </Pressable>
                </View>
                <View>
                  <Pressable
                    style={styles.MenuaddButton}
                    onPress={() => navigation.navigate('CommonRiviewPage')}>
                    <Ionicons
                      name={'chatbox-ellipses-outline'}
                      size={25}
                      color={'black'}
                    />
                    <Text style={styles.MenuaddButtonText}>일반 리뷰 작성</Text>
                  </Pressable>
                </View>
              </View>
              <View>
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

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    paddingVertical: 5,
    paddingTop: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modaltopview: {
    width: '100%',
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

export default StoreRiviewPage;
