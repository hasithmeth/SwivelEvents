import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import { colors, SCREENS } from '../config';
import { useAppSelector } from '../hooks';
import EditProfile from '../screens/user/EditProfile';
import { selectAuth } from '../store/slices/authSlice';
import BottomTabs from './BottomTabs';
import InfoStack from './InfoStack';

export type UserStackParamList = {
  BottomTabs: undefined;
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
        initialRouteName={SCREENS.BOTTOM_TABS}
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.background,
          },
        }}>
        <Stack.Screen name={SCREENS.BOTTOM_TABS} component={BottomTabs} />
        <Stack.Screen name={SCREENS.EDIT_PROFILE} component={EditProfile} />
      </Stack.Navigator>
    );
  }
};

export type UserStackProps = StackNavigationProp<UserStackParamList>;

export default UserStack;
