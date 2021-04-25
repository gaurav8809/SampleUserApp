import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { hp, IS_IOS, wp } from '../../Helper/ResponsiveScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors, IconButton } from 'react-native-paper';

const HeaderTag = props => {
  let {
    leftCom = null,
    rightCom = null,
  } = props;

  return (
    <View style={styles.mainHeaderContainer}>
      {
        leftCom &&
        <TouchableOpacity activeOpacity={leftCom.activeOpacity ?? 1} onPress={leftCom.onPress} style={[styles.headerContainer, {
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          ...!leftCom.title && {width: wp(15)}
        }]}>
          <View style={styles.thinkBorder} />
          <View style={styles.innerContainer}>
            {leftCom.title && <Text style={styles.headerText}>{leftCom.title}</Text>}
            <Entypo
              name={leftCom.icon.name}
              size={wp(6)}
              color="white"
            />
          </View>
        </TouchableOpacity>
      }
      {/*{*/}
      {/*  leftIcon ?*/}
      {/*  <Entypo*/}
      {/*    name={leftIcon.name}*/}
      {/*    // type="Entypo"*/}
      {/*    size={wp(6)}*/}
      {/*    color="white"*/}
      {/*    onPress={() => {}}*/}
      {/*    style={{right: wp(5)}}*/}
      {/*  /> : <View/>*/}
      {/*}*/}
      {
        rightCom &&
        <TouchableOpacity activeOpacity={rightCom?.activeOpacity ?? 1} onPress={rightCom.onPress} style={[styles.headerContainer, {
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          ...!rightCom.title && {width: wp(15)}
        }]}>
          <View style={styles.innerContainer}>
            <Entypo
              name={rightCom.icon.name}
              size={wp(6)}
              color="white"
            />
            {rightCom.title && <Text style={styles.headerText}>{rightCom.title}</Text>}
          </View>
          <View style={styles.thinkBorder} />
        </TouchableOpacity>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  mainHeaderContainer: {
    justifyContent: 'space-between',
    // alignSelf: 'flex-end',
    marginTop: hp(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    justifyContent: 'space-around',
    alignSelf: 'flex-end',
    height: hp(IS_IOS ? 5.5 : 6),
    width: wp(50),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    // borderTopRightRadius: 5,
    // borderBottomRightRadius: 5,
  },
  innerContainer: {
    flex: 9,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    // right: wp(6),
    color: 'white',
    fontSize: wp(4.5),
    // fontWeight: 'bold'
  },
  thinkBorder: {
    width: wp(1.2),
    height: hp(IS_IOS ? 5.5 : 6),
    backgroundColor: 'white',
  },
});

export default HeaderTag;
