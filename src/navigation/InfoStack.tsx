import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import { colors, SCREENS } from '../config';
import Info from '../screens/welcome/Info';
import ProfilePhoto from '../screens/welcome/ProfilePhoto';

export type InfoStackParamList = {
  ProfilePhoto: { photoURL?: string };
  Info: { photoURL: string };
};

const Stack = createStackNavigator<InfoStackParamList>();

const InfoStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.PROFILE_PHOTO}
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.background,
        },
      }}>
      <Stack.Screen
        name={SCREENS.PROFILE_PHOTO}
        component={ProfilePhoto}
        initialParams={{ photoURL: '' }}
      />
      <Stack.Screen name={SCREENS.INFO} component={Info} />
    </Stack.Navigator>
  );
};

export type InfoStackProps = StackNavigationProp<InfoStackParamList>;

export default InfoStack;
