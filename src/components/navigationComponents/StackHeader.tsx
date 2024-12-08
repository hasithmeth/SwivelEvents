import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONT } from '../../assets/fonts';
import icons from '../../assets/icons';
import { colors } from '../../config';

interface IStackHeader extends StackHeaderProps {}

const StackHeader: React.FC<IStackHeader> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <TouchableWithoutFeedback onPress={handleBackPress}>
        <View style={styles.imageContainer}>
          <FastImage source={icons.profile_back} style={styles.icon} />
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.title}>{route.name}</Text>
      <View style={styles.rightContainer} />
    </View>
  );
};

export default StackHeader;

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
  },
  icon: {
    height: 24,
    width: 24,
  },
  rightContainer: {
    width: 44,
  },
});
