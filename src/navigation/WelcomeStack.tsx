import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SCREENS } from '../config';
import Login from '../screens/welcome/Login';
import ProfilePhoto from '../screens/welcome/ProfilePhoto';

export type WelcomeStackParamList = {
  Login: undefined;
  ProfilePhoto: undefined;
};

const Stack = createStackNavigator<WelcomeStackParamList>();

const WelcomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.LOGIN}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.LOGIN} component={Login} />
      <Stack.Screen name={SCREENS.PROFILE_PHOTO} component={ProfilePhoto} />
    </Stack.Navigator>
  );
};

export default WelcomeStack;
