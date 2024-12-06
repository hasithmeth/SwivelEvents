import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONT } from '../assets/fonts';
import { colors } from '../config';

const InfoTitle = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Personal info'}</Text>
      <Text style={styles.subTitle}>
        {'You can add your personal data now or do it later'}
      </Text>
    </View>
  );
};

export default InfoTitle;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
  },
  title: {
    fontFamily: FONT.INTER_SEMI_BOLD,
    fontSize: 19,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  subTitle: {
    fontFamily: FONT.NOTOSANS_REGULAR,
    lineHeight: 20,
    fontSize: 14,
    color: colors.textSubtitle,
    paddingTop: 8,
  },
});
