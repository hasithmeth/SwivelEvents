import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { FONT } from '../assets/fonts';
import icons from '../assets/icons';
import { colors } from '../config';

const RestorePassword = () => {
  const handleRestorePassword = () =>
    Alert.alert('Restore Password', 'Show password reset dialog');

  return (
    <TouchableWithoutFeedback onPress={handleRestorePassword}>
      <View style={styles.container}>
        <Text style={styles.label}>Restore Password</Text>
        <FastImage source={icons.arrow_up} style={styles.icon} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 20,
    aspectRatio: 1,
    marginHorizontal: 8,
  },
  label: {
    fontFamily: FONT.NOTOSANS_SEMI_BOLD,
    lineHeight: 20,
    fontSize: 14,
    color: colors.primary,
  },
});

export default RestorePassword;
