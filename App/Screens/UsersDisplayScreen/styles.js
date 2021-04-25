import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Helper/ResponsiveScreen';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    marginTop: hp(-1),
    padding: wp(5),
  },
  backImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: wp(100),
    height: hp(100),
  },
  userRowView: {
    marginTop: hp(2),
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
  },
  userInfoView: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingVertical: wp(1.5),
  },
  buttonsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: wp(1),
    width: wp(17),
  },
  memberRow: {
    marginTop: hp(1),
    alignSelf: 'center',
    width: wp(81),
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
    backgroundColor: 'white',
    borderRadius: wp(2),
  },
  errorMessage: {
    top: '50%',
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
  },
});
