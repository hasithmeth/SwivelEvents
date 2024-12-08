import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import BottomTabHeader from '../components/navigationComponents/BottomTabHeader';
import { colors, SCREENS } from '../config';
import Home from '../screens/user/Home';
import Profile from '../screens/user/Profile';
import TabBar from '../components/navigationComponents/TabBar';

export type BottomTabsParamList = {
  Home: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();

const screenOptions: BottomTabNavigationOptions = {
  header: (props: any) => <BottomTabHeader {...props} />,
  sceneStyle: {
    backgroundColor: colors.background,
  },
};

const CustomTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={SCREENS.HOME}
      tabBar={CustomTabBar}
      screenOptions={screenOptions}>
      <Tab.Screen
        name={SCREENS.HOME}
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name={SCREENS.PROFILE} component={Profile} />
    </Tab.Navigator>
  );
};

export type BottomTabsProps = BottomTabNavigationProp<BottomTabsParamList>;

export default BottomTabs;
