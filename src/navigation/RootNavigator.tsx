import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useAppSelector } from '../hooks';
import { selectAuth } from '../store/slices/authSlice';
import UserStack from './UserStack';
import WelcomeStack from './WelcomeStack';

const RootNavigator = () => {
  const { user } = useAppSelector(selectAuth);

  return (
    <NavigationContainer>
      {user ? <UserStack /> : <WelcomeStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
