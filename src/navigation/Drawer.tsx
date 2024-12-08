import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import React from 'react';
import { SCREENS } from '../config';
import BottomTabs from './BottomTabs';

export type DrawerParamList = {
  BottomTabs: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={SCREENS.BOTTOM_TABS}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name={SCREENS.BOTTOM_TABS} component={BottomTabs} />
    </Drawer.Navigator>
  );
};

export type DrawerProps = DrawerNavigationProp<DrawerParamList>;

export default DrawerNavigator;
