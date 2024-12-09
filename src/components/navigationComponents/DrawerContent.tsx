import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONT } from '../../assets/fonts';
import icons from '../../assets/icons';
import { colors } from '../../config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectAuth, signOut } from '../../store/slices/authSlice';

interface IDrawerContent extends DrawerContentComponentProps {}

const DrawerContent: React.FC<IDrawerContent> = () => {
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          onPress: () => {
            dispatch(signOut());
          },
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.rowContainer}>
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
        <View style={styles.infoContainer}>
          <Text
            style={styles.title}>{`${user?.firstName} ${user?.lastName}`}</Text>
          <Text style={styles.subTitle}>{user?.email}</Text>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={handleLogout}>
        <View style={styles.logoutContainer}>
          <FastImage source={icons.logout} style={styles.iconLogout} />
          <Text style={styles.logoutText}>{'Logout'}</Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={[styles.bottomComponent, { paddingBottom: insets.bottom }]}>
        <Text style={styles.textVersion}>{'Version 0.0.1'}</Text>
      </View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    borderRadius: 40,
    overflow: 'hidden',
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
  iconLogout: {
    height: 20,
    width: 20,
  },
  photo: {
    height: 44,
    width: 44,
  },
  rowContainer: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.headerBorder,
  },
  infoContainer: {
    marginLeft: 16,
  },
  title: {
    fontFamily: FONT.NOTOSANS_REGULAR,
    fontSize: 16,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  subTitle: {
    fontFamily: FONT.NOTOSANS_REGULAR,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSubtitle,
    marginTop: 4,
  },
  logoutContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  logoutText: {
    marginLeft: 16,
    fontFamily: FONT.NOTOSANS_SEMI_BOLD,
    fontSize: 14,
    lineHeight: 20,
    color: colors.failedText,
  },
  bottomComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  textVersion: {
    fontFamily: FONT.NOTOSANS_REGULAR,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSubtitle,
  },
});
