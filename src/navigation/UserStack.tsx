import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import { colors, SCREENS } from '../config';
import { useAppSelector } from '../hooks';
import EditProfile from '../screens/user/EditProfile';
import { selectAuth } from '../store/slices/authSlice';
import Drawer from './Drawer';
import InfoStack from './InfoStack';
import StackHeader from '../components/navigationComponents/StackHeader';

export type UserStackParamList = {
  Drawer: undefined;
  'Edit Profile': undefined;
};

const Stack = createStackNavigator<UserStackParamList>();

const screenOptions: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: colors.background,
  },
  header: (props: any) => <StackHeader {...props} />,
};

const UserStack = () => {
  const auth = useAppSelector(selectAuth);

  if (auth.isNewUser) {
    return <InfoStack />;
  } else {
    return (
      <Stack.Navigator
        initialRouteName={SCREENS.DRAWER}
        screenOptions={screenOptions}>
        <Stack.Screen
          name={SCREENS.DRAWER}
          component={Drawer}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name={SCREENS.EDIT_PROFILE} component={EditProfile} />
      </Stack.Navigator>
    );
  }
};

export type UserStackProps = StackNavigationProp<UserStackParamList>;

export default UserStack;
