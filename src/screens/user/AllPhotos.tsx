import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { useAppSelector } from '../../hooks';
import { selectBottomImages } from '../../store/slices/imagesSlice';
import FastImage from 'react-native-fast-image';
import { Photo } from '../../@types/photo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../config';
import { FONT } from '../../assets/fonts';

interface IAllPhotos {}

const AllPhotos: React.FC<IAllPhotos> = () => {
  const images = useAppSelector(selectBottomImages);

  const insets = useSafeAreaInsets();

  const _renderItem = useCallback(
    ({ item }: { item: Photo }) => (
      <View style={styles.itemContainer}>
        <FastImage
          source={{ uri: item.thumbnailUrl }}
          style={styles.thumbnail}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {item.title}
          </Text>
        </View>
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={item => item.id.toString()}
        renderItem={_renderItem}
        numColumns={2}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: insets.bottom },
        ]}
      />
    </View>
  );
};

export default AllPhotos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  itemContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.headerBorder,
  },
  thumbnail: {
    width: 150,
    height: 150,
  },
  textContainer: {
    width: 150,
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: colors.headerBorder,
  },
  title: {
    fontFamily: FONT.INTER_SEMI_BOLD,
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
    paddingTop: 8,
  },
});
