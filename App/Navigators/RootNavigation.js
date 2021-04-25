import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserInfoForm from '../Screens/UserInfoForm';
import UsersDisplayScreen from '../Screens/UsersDisplayScreen';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'UserInfoForm'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="UserInfoForm" component={UserInfoForm} />
        <Stack.Screen name="UsersDisplayScreen" component={UsersDisplayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
