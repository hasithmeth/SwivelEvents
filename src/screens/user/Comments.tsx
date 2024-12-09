import { RouteProp } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONT } from '../../assets/fonts';
import { colors, SCREENS } from '../../config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { UserStackParamList } from '../../navigation/UserStack';
import {
  getComments,
  selectContent,
  selectPostsLoadingContent,
} from '../../store/slices/postsSlice';

type CommentsRouteProp = RouteProp<UserStackParamList, SCREENS.COMMENTS>;

interface IComments {
  route: CommentsRouteProp;
}

const Comments: React.FC<IComments> = ({ route }) => {
  const { postId } = route.params;

  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();
  const postComments = useAppSelector(selectContent);
  const isLoading = useAppSelector(selectPostsLoadingContent);

  useEffect(() => {
    if (postId) {
      dispatch(getComments(postId));
    }
  }, [dispatch, postId]);

  if (isLoading) {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingBottom: insets.bottom },
      ]}>
      {postComments.map(comment => (
        <View key={comment.id} style={styles.cardContainer}>
          <Text style={styles.bodyText}>{`❝\t${comment.body}\t❞`}</Text>
          <View style={styles.divider} />
          <Text style={styles.titleText}>{comment.name}</Text>
          <Text style={styles.emailText}>{comment.email}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: colors.headerBorder,
    padding: 16,
    marginTop: 16,
  },
  bodyText: {
    fontFamily: FONT.NOTOSANS_MEDIUM,
    fontSize: 16,
    color: colors.textPrimary,
  },
  titleText: {
    fontFamily: FONT.INTER_MEDIUM,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSubtitle,
  },
  emailText: {
    fontFamily: FONT.NOTOSANS_LIGHT,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSubtitle,
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.headerBorder,
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
