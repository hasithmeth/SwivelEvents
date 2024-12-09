/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { FONT } from '../../assets/fonts';
import { colors } from '../../config';

interface IPhotoCard {
  photoURL: string;
  title: string;
  description: string;
  lastItem?: boolean;
}

const PhotoCard: React.FC<IPhotoCard> = ({
  photoURL,
  title,
  description,
  lastItem = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FastImage source={{ uri: photoURL }} style={styles.image} />
      </View>
      <View
        style={[
          styles.textContainer,
          lastItem ? { borderRightWidth: 1 } : null,
        ]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle} numberOfLines={4} ellipsizeMode={'tail'}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default PhotoCard;

const styles = StyleSheet.create({
  container: {
    width: 224,
  },
  imageContainer: {},
  title: {
    fontFamily: FONT.INTER_BOLD,
    fontSize: 16,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  subTitle: {
    fontFamily: FONT.NOTOSANS_REGULAR,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSubtitle,
    marginTop: 16,
  },
  image: {
    width: 224,
    height: 130,
    resizeMode: 'contain',
  },
  textContainer: {
    padding: 20,
    borderWidth: 1,
    minHeight: 170,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: colors.mediumBorder,
  },
});
