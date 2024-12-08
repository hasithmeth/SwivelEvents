import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONT } from '../../assets/fonts';
import icons from '../../assets/icons';
import { colors, SCREENS } from '../../config';

interface ITabBar extends BottomTabBarProps {}

const TabBar: React.FC<ITabBar> = ({ navigation, state, descriptors }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableWithoutFeedback
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}>
            <View style={[styles.tab, { paddingBottom: insets.bottom }]}>
              <FastImage
                source={route.name === SCREENS.HOME ? icons.home : icons.more}
                style={styles.icon}
              />
              <Text style={[styles.label]}>{route.name}</Text>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.textPrimary,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  label: {
    color: colors.bottomTabsElements,
    fontFamily: FONT.NOTOSANS_MEDIUM,
    fontSize: 12,
    lineHeight: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 28,
    width: 28,
    marginTop: 5,
    tintColor: colors.bottomTabsElements,
  },
});
