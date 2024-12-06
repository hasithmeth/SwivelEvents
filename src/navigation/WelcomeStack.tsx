import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import { colors, SCREENS } from '../config';
import Login from '../screens/welcome/Login';
import ProfilePhoto from '../screens/welcome/ProfilePhoto';
import Signup from '../screens/welcome/Signup';

export type WelcomeStackParamList = {
  Login: undefined;
  ProfilePhoto: undefined;
  Signup: undefined;
};

const Stack = createStackNavigator<WelcomeStackParamList>();

const WelcomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.LOGIN}
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.background,
        },
      }}>
      <Stack.Screen name={SCREENS.LOGIN} component={Login} />
      <Stack.Screen name={SCREENS.SIGNUP} component={Signup} />
      <Stack.Screen name={SCREENS.PROFILE_PHOTO} component={ProfilePhoto} />
    </Stack.Navigator>
  );
};

export type WelcomeStackProps = StackNavigationProp<WelcomeStackParamList>;

export default WelcomeStack;
