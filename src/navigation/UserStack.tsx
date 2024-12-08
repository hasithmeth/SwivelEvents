import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import { colors, SCREENS } from '../config';
import { useAppSelector } from '../hooks';
import EditProfile from '../screens/user/EditProfile';
import { selectAuth } from '../store/slices/authSlice';
import Drawer from './Drawer';
import InfoStack from './InfoStack';

export type UserStackParamList = {
  Drawer: undefined;
  EditProfile: undefined;
};

const Stack = createStackNavigator<UserStackParamList>();

const UserStack = () => {
  const auth = useAppSelector(selectAuth);

  if (auth.isNewUser) {
    return <InfoStack />;
  } else {
    return (
      <Stack.Navigator
        initialRouteName={SCREENS.DRAWER}
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.background,
          },
        }}>
        <Stack.Screen name={SCREENS.DRAWER} component={Drawer} />
        <Stack.Screen name={SCREENS.EDIT_PROFILE} component={EditProfile} />
      </Stack.Navigator>
    );
  }
};

export type UserStackProps = StackNavigationProp<UserStackParamList>;

export default UserStack;
