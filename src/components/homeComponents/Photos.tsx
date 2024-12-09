import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { FONT } from '../../assets/fonts';
import { colors } from '../../config';
import FastImage from 'react-native-fast-image';
import icons from '../../assets/icons';
import {
  getBottomImages,
  selectBottomImages,
} from '../../store/slices/imagesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import PhotoCard from './PhotoCard';

interface IPhotos {
  onAllPhotosPress: () => void;
}

const Photos: React.FC<IPhotos> = ({ onAllPhotosPress }) => {
  const dispatch = useAppDispatch();
  const images = useAppSelector(selectBottomImages);

  useEffect(() => {
    dispatch(getBottomImages());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{'Photos'}</Text>
        <TouchableWithoutFeedback onPress={onAllPhotosPress}>
          <View style={styles.buttonComponent}>
            <Text style={styles.buttonText}>{'All Photos'}</Text>
            <FastImage source={icons.arrow_light} style={styles.icon} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((image, index, array) => (
          <PhotoCard
            photoURL={image.url}
            title={image.title.split(' ').slice(0, 2).join(' ')}
            description={image.title}
            key={image.id}
            lastItem={array.length === index + 1}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Photos;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: FONT.INTER_SEMI_BOLD,
    fontSize: 22,
    lineHeight: 32,
    color: colors.textPrimary,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonComponent: {
    flexDirection: 'row',
  },
  buttonText: {
    fontFamily: FONT.NOTOSANS_SEMI_BOLD,
    fontSize: 14,
    lineHeight: 20,
    color: colors.primary,
  },
  icon: {
    height: 20,
    width: 20,
    marginHorizontal: 8,
  },
});
