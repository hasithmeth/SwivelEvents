import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import TopSlider from '../../components/homeComponents/TopSlider';
import Title from '../../components/homeComponents/Title';
import Organizers from '../../components/homeComponents/Organizers';
import { colors } from '../../config';
import Photos from '../../components/homeComponents/Photos';
import { FONT } from '../../assets/fonts';

interface IHome {}

const Home: React.FC<IHome> = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <TopSlider />
        <Title />
        <Organizers />
        <View style={styles.divider} />
        <Photos />
        <View style={styles.divider} />
        <View style={styles.postsContainer}>
          <Text style={styles.countText}>{`16`}</Text>
          <Text style={styles.labelText}>{'Posts'}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.headerBorder,
  },
  postsContainer: {
    alignItems: 'center',
  },
  countText: {
    fontFamily: FONT.INTER_SEMI_BOLD,
    fontSize: 19,
    lineHeight: 24,
    color: colors.primary,
    marginTop: 8,
    padding: 4,
  },
  labelText: {
    fontFamily: FONT.NOTOSANS_MEDIUM,
    fontSize: 13,
    lineHeight: 16,
    color: colors.textSubtitle,
    marginBottom: 14,
  },
  bottomSpacer: {
    height: 80,
  },
});
