import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from '../screens/welcome/Login';

const Stack = createStackNavigator();

const WelcomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default WelcomeStack;
