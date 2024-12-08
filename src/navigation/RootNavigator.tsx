import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { useAppSelector } from '../hooks';
import { selectAuth } from '../store/slices/authSlice';
import UserStack from './UserStack';
import WelcomeStack from './WelcomeStack';

const RootNavigator = () => {
  const { user } = useAppSelector(selectAuth);

  useEffect(() => {
    changeNavigationBarColor('transparent', false);
  }, []);

  return (
    <NavigationContainer>
      {user ? <UserStack /> : <WelcomeStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
