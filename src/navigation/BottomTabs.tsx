import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/user/Home';
import Profile from '../screens/user/Profile';
import { SCREENS } from '../config';

export type BottomTabsParamList = {
  Home: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={SCREENS.HOME} component={Home} />
      <Tab.Screen name={SCREENS.PROFILE} component={Profile} />
    </Tab.Navigator>
  );
};

export type BottomTabsProps = BottomTabNavigationProp<BottomTabsParamList>;

export default BottomTabs;
