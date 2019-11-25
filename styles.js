import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  mapWrapper: {
    flex: 1,
  },
  boxesWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    elevation: 2,
  },
  boxes: {
    height: 200,
  },
  box: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
  boxImage: {
    borderRadius: 6,
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 10,
  },
  fullName: {
    flex: 1,
  },
  boxTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  markerImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    resizeMode: 'cover',
    borderWidth: 4,
    borderColor: '#000000',
  },
});

export default styles;
