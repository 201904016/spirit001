import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  linksContainer: {
    marginTop: 30,
    flexDirection: 'row', // 수평 방향으로 요소들을 배치
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 60,
  },
  link: {
    textAlign: 'center',
    paddingLeft: 50,
    paddingRight: 50,
  },
  separator: {
    paddingVertical: 10,
  },
  input: {
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
    height: 40,
    borderColor: '#ced4da',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  box1: {
    height: 330,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#80D2F4',
    paddingHorizontal: 110,
    paddingVertical: 10,
    margin: 50,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  imageStyle: {
    width: 130,
    resizeMode: 'contain',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default styles;
