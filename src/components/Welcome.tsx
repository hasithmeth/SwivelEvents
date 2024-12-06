import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONT } from '../assets/fonts';
import { colors } from '../config';

interface IWelcome {
  subTitle: string;
}

const Welcome: React.FC<IWelcome> = ({ subTitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Welcome'}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONT.INTER_SEMI_BOLD,
    lineHeight: 40,
    fontSize: 32,
    color: colors.textPrimary,
    bottom: 12,
  },
  subTitle: {
    fontFamily: FONT.NOTOSANS_REGULAR,
    lineHeight: 20,
    fontSize: 14,
    color: colors.textSubtitle,
  },
});
