import {StyleSheet} from 'react-native';
import {centerText, hp, IS_IOS, wp} from '../../Helper/ResponsiveScreen';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    marginTop: hp(-1),
    padding: wp(5),
  },
  genderView: {
    marginTop: hp(3),
    borderBottomWidth: 1,
    borderColor: 'white',
    paddingHorizontal: wp(3),
    paddingVertical: wp(4),
  },
  radioView: {
    left: wp(-2),
    top: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  fContainer: {
    marginTop: hp(5),
    // padding: wp(5),
    alignSelf: 'center',
    width: wp(90),
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: wp(2),
  },
  backImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: wp(100),
    height: hp(100),
  },
  whiteButton: {
    ...centerText,
    backgroundColor: 'white',
    flex: 1,
    height: hp(IS_IOS ? 3 : 3.5),
  },
  whiteButtonText: {
    fontWeight: 'bold',
  },
  memberRow: {
    marginTop: hp(2),
    alignSelf: 'center',
    width: wp(90),
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
    backgroundColor: 'white',
    borderRadius: wp(2),
  },
  bottomButtonView: {
    marginTop: hp(2),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    width: wp(90),
  },
  submitButton: {
    ...centerText,
    backgroundColor: 'white',
    width: wp(30),
    height: hp(IS_IOS ? 3.5 : 4),
    alignSelf: 'center',
    borderRadius: wp(1),
    borderColor: 'black',
    borderWidth: 1,
  },
});
