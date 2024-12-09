import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import React, { useEffect } from 'react';
import StackHeader from '../components/navigationComponents/StackHeader';
import { colors, SCREENS } from '../config';
import { useAppSelector } from '../hooks';
import AllPhotos from '../screens/user/AllPhotos';
import Comments from '../screens/user/Comments';
import EditProfile from '../screens/user/EditProfile';
import Posts from '../screens/user/Posts';
import { selectAuth } from '../store/slices/authSlice';
import Drawer from './Drawer';
import InfoStack from './InfoStack';
import FirebaseMessagingService from '../helpers/FirebaseMessagingService';

export type UserStackParamList = {
  Drawer: undefined;
  'Edit Profile': undefined;
  'All Photos': undefined;
  Posts: undefined;
  Comments: { postId: number };
};

const Stack = createStackNavigator<UserStackParamList>();

const screenOptions: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: colors.background,
  },
  header: (props: any) => <StackHeader {...props} />,
};

const UserStack = () => {
  useEffect(() => {
    FirebaseMessagingService.initialize();
  }, []);

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
        <Stack.Screen name={SCREENS.ALL_PHOTOS} component={AllPhotos} />
        <Stack.Screen name={SCREENS.POSTS} component={Posts} />
        <Stack.Screen name={SCREENS.COMMENTS} component={Comments} />
      </Stack.Navigator>
    );
  }
};

export type UserStackProps = StackNavigationProp<UserStackParamList>;

export default UserStack;
