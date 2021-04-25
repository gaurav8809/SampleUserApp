import React, {useState, useEffect, createRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
} from 'react-native';
import styles from './styles';
import {hp, IS_IOS, wp} from '../../Helper/ResponsiveScreen';
import {useDispatch, useSelector} from 'react-redux';
import {
  SET_SELECTED_USER,
  SET_USERS,
} from '../../AppState/Constants/StoreContants';
import {Background} from '../../Images';
import {TextInput} from 'react-native-paper';
import {IconButton, Colors} from 'react-native-paper';
import HeaderTag from '../Common/HeaderTag';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-easy-toast';
import {checkCharacter, checkEmail, checkNumbers} from '../../Helper/General';

const Index = ({navigation}) => {
  const dispatch = useDispatch();
  const {users, selectedUser} = useSelector((state) => state.generalReducer);
  const toastRef = createRef();
  const commonTheme = {
    colors: {
      underlineColor: 'transparent',
      label: 'white',
      text: 'white',
      primary: 'white',
      placeholder: 'white',
    },
  };
  let [form, setForm] = useState({
    name: selectedUser?.name ?? '',
    age: selectedUser?.age ?? '',
    gender: selectedUser?.gender ?? true,
    familyMembers: selectedUser?.familyMembers ?? [],
  });
  let [familyForm, setFamilyForm] = useState({
    name: '',
    email: '',
  });
  let [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    setForm({
      name: selectedUser?.name ?? '',
      age: selectedUser?.age ?? '',
      gender: selectedUser?.gender ?? true,
      familyMembers: selectedUser?.familyMembers ?? [],
    });
  }, [selectedUser]);

  const onChangeFormValue = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const onChangeFamilyFormValue = (key, value) => {
    setFamilyForm({
      ...familyForm,
      [key]: value,
    });
  };

  const checkIsRequire = (form) => {
    for (var key in form) {
      if (form[key] === '') {
        toastRef.current.show('*Please fill all require fields');
        return false;
      }
    }
    return true;
  };

  const resetForm = () => {
    setForm({
      name: '',
      age: '',
      gender: true,
      familyMembers: [],
    });
  };

  const resetFamilyForm = () => {
    setFamilyForm({
      name: '',
      email: '',
    });
  };

  const onLeftButtonPressed = () => {
    Keyboard.dismiss();
    if (!checkIsRequire(familyForm)) {
      return;
    }
    if (!isNaN(familyForm.name) || !checkCharacter(familyForm.name)) {
      toastRef.current.show('Please enter only characters for member name');
      return;
    }
    if (!checkEmail(familyForm.email)) {
      toastRef.current.show('Please enter correct email address');
      return false;
    }
    let temp = form.familyMembers;
    if (selectedMember === null) {
      temp.push({id: Math.floor(Date.now() / 100), ...familyForm});
    } else {
      let ID = form.familyMembers.findIndex((i) => i.id === selectedMember.id);
      temp[ID] = familyForm;
    }
    onChangeFormValue('familyMembers', temp);
    resetFamilyForm();
    setSelectedMember(null);
  };

  const onRightButtonPressed = () => {
    setFamilyForm({
      name: '',
      email: '',
    });
    setSelectedMember(null);
  };

  const renderFamilyMember = (item, index) => {
    const actionPress = (action) => {
      switch (action) {
        case 'onClickMember':
          setSelectedMember(item);
          setFamilyForm({
            name: item.name,
            email: item.email,
          });
          break;
        case 'remove':
          if (selectedMember?.id === item.id) {
            resetFamilyForm();
          }
          onChangeFormValue(
            'familyMembers',
            form.familyMembers.filter((item, itemIndex) => itemIndex !== index),
          );
          setSelectedMember(null);
          break;
      }
    };

    return (
      <TouchableOpacity
        key={index}
        style={styles.memberRow}
        onPress={() => actionPress('onClickMember')}>
        <MaterialCommunityIcons
          name={'close-circle'}
          size={wp(6)}
          color="black"
          onPress={() => actionPress('remove')}
          style={{
            zIndex: 1000,
            right: wp(1.5),
            top: wp(1),
            position: 'absolute',
          }}
        />
        <Text>{`Name: ${item.name}`}</Text>
        <Text style={{marginTop: hp(0.7)}}>{`Email: ${item.email}`}</Text>
      </TouchableOpacity>
    );
  };

  const onSubmitPress = () => {
    Keyboard.dismiss();
    if (!checkIsRequire(form)) {
      return;
    }
    if (!isNaN(form.name) || !checkCharacter(form.name)) {
      toastRef.current.show('Please enter only characters for user name');
      return;
    }
    if (!checkNumbers(form.age)) {
      toastRef.current.show('Please enter only numbers for user age');
      return;
    }
    if (form.familyMembers.length < 1) {
      toastRef.current.show('Minimum one family members is require to add');
      return;
    }
    let tempUsers = users.length > 0 ? [...users] : users;
    if (selectedUser?.id) {
      let Index = users.findIndex((i) => i.id === selectedUser.id);
      tempUsers[Index] = {id: Math.floor(Date.now() / 100), ...form};
    } else {
      tempUsers.push({id: Math.floor(Date.now() / 100), ...form});
    }
    dispatch({
      type: SET_USERS,
      payload: tempUsers,
    });
    navigation.navigate('UsersDisplayScreen');
  };

  const onPressCancelOrReset = () => {
    if (selectedUser?.id) {
      dispatch({
        type: SET_SELECTED_USER,
        payload: null,
      });
    }
    setSelectedMember(null);
    resetForm();
    resetFamilyForm();
  };

  return (
    <ImageBackground
      source={Background}
      imageStyle={styles.backImage}
      style={styles.mainContainer}>
      <KeyboardAwareScrollView
        behavior="padding"
        // behavior={IS_IOS ? "padding" : "height"}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: hp(2)}}>
        <View>
          <HeaderTag
            leftCom={{title: 'User Information', icon: {name: 'user'}}}
            rightCom={{
              activeOpacity: 0,
              icon: {name: 'list'},
              onPress: () => navigation.navigate('UsersDisplayScreen'),
            }}
          />

          <View style={styles.container}>
            <TextInput
              style={{backgroundColor: 'transparent'}}
              label="Name*"
              underlineColor={'white'}
              placeholderTextColor={'white'}
              theme={commonTheme}
              value={form.name}
              onChangeText={(text) => onChangeFormValue('name', text)}
            />

            <TextInput
              style={{marginTop: hp(2), backgroundColor: 'transparent'}}
              label="Age*"
              underlineColor={'white'}
              placeholderTextColor={'white'}
              theme={commonTheme}
              value={form.age}
              onChangeText={(text) => onChangeFormValue('age', text)}
            />

            <View style={styles.genderView}>
              <Text style={{color: 'white'}}>{'Gender*'}</Text>
              <View style={styles.radioView}>
                <IconButton
                  icon={form.gender ? 'radiobox-marked' : 'radiobox-blank'}
                  color={Colors.white}
                  size={wp(5)}
                  onPress={() => onChangeFormValue('gender', true)}
                />
                <Text
                  onPress={() => onChangeFormValue('gender', true)}
                  style={{color: 'white'}}>
                  Male
                </Text>

                <IconButton
                  icon={!form.gender ? 'radiobox-marked' : 'radiobox-blank'}
                  color={Colors.white}
                  size={wp(5)}
                  onPress={() => onChangeFormValue('gender', false)}
                  style={{marginLeft: wp(5)}}
                />
                <Text
                  onPress={() => onChangeFormValue('gender', false)}
                  style={{color: 'white'}}>
                  Female
                </Text>
              </View>
            </View>
          </View>

          <HeaderTag
            leftCom={{title: 'Family Members', icon: {name: 'users'}}}
          />

          <View style={styles.fContainer}>
            <TextInput
              style={{backgroundColor: 'transparent'}}
              label="Name*"
              underlineColor={'white'}
              placeholderTextColor={'white'}
              theme={commonTheme}
              value={familyForm.name}
              onChangeText={(text) => onChangeFamilyFormValue('name', text)}
            />

            <TextInput
              style={{
                marginTop: hp(0),
                bottom: -1,
                backgroundColor: 'transparent',
              }}
              label="Email*"
              underlineColor={'white'}
              placeholderTextColor={'white'}
              theme={commonTheme}
              value={familyForm.email}
              autoCapitalize={'none'}
              onChangeText={(text) => onChangeFamilyFormValue('email', text)}
            />

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={onLeftButtonPressed}
                style={[styles.whiteButton, {borderBottomLeftRadius: 5}]}>
                <Text style={styles.whiteButtonText}>
                  {selectedMember ? 'UPDATE' : 'ADD'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onRightButtonPressed}
                style={[styles.whiteButton, {borderBottomRightRadius: 5}]}>
                <Text style={styles.whiteButtonText}>{'RESET'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {form.familyMembers.length > 0 && (
            <View>{form.familyMembers.map(renderFamilyMember)}</View>
          )}

          <View style={styles.bottomButtonView}>
            <TouchableOpacity
              onPress={onSubmitPress}
              style={styles.submitButton}>
              <Text>{selectedUser?.id ? 'Update' : 'Submit'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressCancelOrReset}
              style={styles.submitButton}>
              <Text>{selectedUser?.id ? 'Cancel' : 'Reset'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Toast
        ref={toastRef}
        style={{backgroundColor: 'white'}}
        position="bottom"
        positionValue={IS_IOS ? 140 : 70}
        fadeInDuration={750}
        fadeOutDuration={1000}
        opacity={1}
        textStyle={{color: 'rgb(140, 16, 5)'}}
      />
    </ImageBackground>
  );
};

export default Index;
