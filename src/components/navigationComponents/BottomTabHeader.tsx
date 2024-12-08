import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONT } from '../../assets/fonts';
import icons from '../../assets/icons';
import { colors } from '../../config';
import { useAppSelector } from '../../hooks';
import { selectAuth } from '../../store/slices/authSlice';

interface IBottomTabHeader extends BottomTabHeaderProps {}

const BottomTabHeader: React.FC<IBottomTabHeader> = ({ route }) => {
  const { user } = useAppSelector(selectAuth);

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleProfileIconPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <TouchableWithoutFeedback onPress={handleProfileIconPress}>
        <View style={styles.imageContainer}>
          {user?.photoURL ? (
            <FastImage
              source={{
                uri: user.photoURL,
              }}
              style={styles.photo}
            />
          ) : (
            <FastImage source={icons.user} style={styles.icon} />
          )}
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.title}>{route.name}</Text>
      <View style={styles.rightContainer} />
    </View>
  );
};

export default BottomTabHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.headerBorder,
  },
  title: {
    fontFamily: FONT.INTER_SEMI_BOLD,
    fontSize: 17,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  imageContainer: {
    borderRadius: 40,
    left: 10,
    overflow: 'hidden',
    bottom: 4,
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.profilePlaceholder,
  },
  icon: {
    height: 24,
    width: 24,
  },
  photo: {
    height: 44,
    width: 44,
  },
  rightContainer: {
    width: 44,
  },
});
