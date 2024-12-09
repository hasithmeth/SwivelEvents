/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { FONT } from '../assets/fonts';
import { colors } from '../config';
import icons from '../assets/icons';

interface IOrganizerCard {
  name: string;
  email: string;
  photoURL: string;
  noBorder?: boolean;
}

const OrganizerCard: React.FC<IOrganizerCard> = ({
  name,
  email,
  photoURL,
  noBorder,
}) => {
  return (
    <View
      style={[styles.container, noBorder ? { borderBottomWidth: 0 } : null]}>
      <FastImage source={{ uri: photoURL }} style={styles.image} />
      <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subTitle}>{email}</Text>
      </View>
      <View style={styles.iconContainer}>
        <FastImage source={icons.chat} style={styles.icon} />
      </View>
    </View>
  );
};

export default OrganizerCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.headerBorder,
  },
  image: {
    height: 44,
    aspectRatio: 1,
    borderRadius: 40,
  },
  title: {
    fontFamily: FONT.NOTOSANS_REGULAR,
    fontSize: 16,
    lineHeight: 20,
    color: colors.textPrimary,
    marginLeft: 16,
  },
  subTitle: {
    fontFamily: FONT.NOTOSANS_REGULAR,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSubtitle,
    marginLeft: 16,
    marginTop: 4,
  },
  icon: {
    height: 24,
    width: 24,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 6,
  },
});
