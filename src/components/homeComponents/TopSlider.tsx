import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { FONT } from '../../assets/fonts';
import { colors } from '../../config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getTopImages, selectTopImages } from '../../store/slices/imagesSlice';

const HEIGHT = 220;
interface ITopSlider {}

const TopSlider: React.FC<ITopSlider> = () => {
  const { width } = useWindowDimensions();

  const dispatch = useAppDispatch();
  const images = useAppSelector(selectTopImages);

  useEffect(() => {
    dispatch(getTopImages());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {images.map((image, index, array) => (
          <View style={[styles.page, { width }]} key={image.id}>
            <FastImage source={{ uri: image.url }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{`${index + 1} / ${
                array.length
              }`}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TopSlider;

const styles = StyleSheet.create({
  container: {
    minHeight: HEIGHT,
  },
  page: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: FONT.NOTOSANS_REGULAR,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  image: {
    minHeight: HEIGHT,
    width: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: colors.background,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
