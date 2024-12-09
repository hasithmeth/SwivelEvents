import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerNavigationOptions,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from '../components/navigationComponents/DrawerContent';
import { SCREENS } from '../config';
import BottomTabs from './BottomTabs';

export type DrawerParamList = {
  BottomTabs: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const screenOptions: DrawerNavigationOptions = {
  headerShown: false,
  drawerType: 'front',
  drawerStyle: {
    width: 300,
  },
};

const DrawerContentComponent = (props: DrawerContentComponentProps) => (
  <DrawerContent {...props} />
);

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={SCREENS.BOTTOM_TABS}
      drawerContent={DrawerContentComponent}
      screenOptions={screenOptions}>
      <Drawer.Screen name={SCREENS.BOTTOM_TABS} component={BottomTabs} />
    </Drawer.Navigator>
  );
};

export type DrawerProps = DrawerNavigationProp<DrawerParamList>;

export default DrawerNavigator;
