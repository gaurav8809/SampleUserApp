import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import styles from './styles';
import {hp, wp} from '../../Helper/ResponsiveScreen';
import {useDispatch, useSelector} from 'react-redux';
import {
  SET_SELECTED_USER,
  SET_USERS,
} from '../../AppState/Constants/StoreContants';
import {Background} from '../../Images';
import HeaderTag from '../Common/HeaderTag';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Index = ({navigation}) => {
  const dispatch = useDispatch();
  const {users} = useSelector((state) => state.generalReducer);
  let [selectedUser, setSelectedUser] = useState(null);

  const renderFamilyMember = (item, index) => {
    return (
      <View key={index} style={styles.memberRow}>
        <Text>{`Name: ${item.name}`}</Text>
        <Text style={{marginTop: hp(0.7)}}>{`Email: ${item.email}`}</Text>
      </View>
    );
  };

  const renderUser = ({item, index}) => {
    const onOptionPress = (action) => {
      if (action === 'edit') {
        dispatch({
          type: SET_SELECTED_USER,
          payload: item,
        });
        navigation.navigate('UserInfoForm');
      } else {
        dispatch({
          type: SET_USERS,
          payload: users.filter((i) => i.id !== item.id),
        });
      }
    };
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          setSelectedUser(selectedUser?.id === item.id ? null : item)
        }
        key={index}
        style={styles.userRowView}>
        <View
          style={[
            styles.userInfoView,
            selectedUser?.id === item.id
              ? {borderBottomWidth: 1, borderColor: 'white'}
              : {borderBottomLeftRadius: 4, borderBottomRightRadius: 4},
          ]}>
          <Text style={{paddingHorizontal: wp(4), fontWeight: 'bold'}}>
            {item.name}
          </Text>
          <View style={styles.buttonsView}>
            <MaterialCommunityIcons
              name={'pencil-circle'}
              size={wp(6)}
              color="black"
              onPress={() => onOptionPress('edit')}
            />
            <MaterialCommunityIcons
              name={'close-circle'}
              size={wp(6)}
              color="black"
              onPress={() => onOptionPress('remove')}
            />
          </View>
        </View>
        {selectedUser && selectedUser === item && (
          <View
            style={{
              padding: wp(4),
            }}>
            <Text style={{color: 'white'}}>{`Name: ${item.name}`}</Text>
            <Text style={{color: 'white', marginTop: hp(1)}}>{`Gender: ${
              item.gender ? 'Male' : 'Female'
            }`}</Text>
            <Text
              style={{
                color: 'white',
                marginTop: hp(1),
              }}>{`Age: ${item.age}`}</Text>

            {item.familyMembers.length > 0 && (
              <View>
                <Text
                  style={{
                    color: 'white',
                    marginTop: hp(1),
                    alignSelf: 'center',
                  }}>
                  {'-- Family Members --'}
                </Text>
                {item.familyMembers.map(renderFamilyMember)}
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={Background}
      imageStyle={styles.backImage}
      style={styles.mainContainer}>
      <HeaderTag
        leftCom={{
          activeOpacity: 0,
          icon: {name: 'chevron-left'},
          onPress: () => navigation.goBack(),
        }}
        rightCom={{title: 'Users Details', icon: {name: 'user'}}}
      />

      <FlatList
        contentContainerStyle={{
          flex: 1,
          marginTop: hp(1),
          paddingHorizontal: wp(5),
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={users}
        renderItem={renderUser}
        ItemSeparatorComponent={() => <View style={{padding: wp(0.5)}} />}
        ListEmptyComponent={() => (
          <Text style={styles.errorMessage}>No user found</Text>
        )}
      />
    </ImageBackground>
  );
};

export default Index;
