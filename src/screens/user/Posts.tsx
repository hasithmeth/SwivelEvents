import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useCallback } from 'react';
import { useAppSelector } from '../../hooks';
import { selectPosts } from '../../store/slices/postsSlice';
import { Post } from '../../@types/post';
import { FONT } from '../../assets/fonts';
import { colors, SCREENS } from '../../config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import icons from '../../assets/icons';
import { UserStackProps } from '../../navigation/UserStack';

interface IPosts {
  navigation: UserStackProps;
}

const Posts: React.FC<IPosts> = ({ navigation }) => {
  const posts = useAppSelector(selectPosts);

  const insets = useSafeAreaInsets();

  const _renderItem = useCallback(
    ({ item }: { item: Post }) => {
      const handleItemPress = () => {
        navigation.navigate(SCREENS.COMMENTS, { postId: item.id });
      };

      return (
        <TouchableWithoutFeedback onPress={handleItemPress}>
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text
              style={styles.subTitle}
              numberOfLines={3}
              ellipsizeMode={'tail'}>
              {item.body}
            </Text>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>{'Comments'}</Text>
              <FastImage source={icons.arrow_light} style={styles.icon} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    },
    [navigation],
  );

  const ItemSeparator = useCallback(
    () => <View style={styles.itemSeparator} />,
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={_renderItem}
        keyExtractor={post => post.id.toString()}
        contentContainerStyle={[
          styles.contentContainerStyle,
          { paddingBottom: insets.bottom },
        ]}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={ItemSeparator}
      />
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.headerBorder,
  },
  title: {
    fontFamily: FONT.INTER_BOLD,
    fontSize: 16,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  subTitle: {
    fontFamily: FONT.NOTOSANS_REGULAR,
    fontSize: 13,
    lineHeight: 15,
    color: colors.textSubtitle,
    marginTop: 13,
  },
  contentContainerStyle: {
    paddingHorizontal: 16,
  },
  itemSeparator: {
    height: 16,
  },
  icon: {
    height: 20,
    width: 20,
    marginLeft: 8,
  },
  buttonText: {
    fontFamily: FONT.NOTOSANS_SEMI_BOLD,
    fontSize: 13,
    lineHeight: 15,
    color: colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
});
