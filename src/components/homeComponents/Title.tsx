import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONT } from '../../assets/fonts';
import { colors } from '../../config';

const Title = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Event Name'}</Text>
      <Text style={styles.subTitle}>
        {"56 O'Mally Road, ST LEONARDS, 2065, NSW"}
      </Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: FONT.INTER_SEMI_BOLD,
    fontSize: 26,
    lineHeight: 36,
    color: colors.textPrimary,
  },
  subTitle: {
    fontFamily: FONT.NOTOSANS_REGULAR,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSubtitle,
    marginTop: 16,
  },
});
