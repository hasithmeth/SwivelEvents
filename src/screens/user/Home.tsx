import React from 'react';
import { StyleSheet, View } from 'react-native';
import TopSlider from '../../components/homeComponents/TopSlider';
import Title from '../../components/homeComponents/Title';
import Organizers from '../../components/homeComponents/Organizers';
import { colors } from '../../config';

interface IHome {}

const Home: React.FC<IHome> = () => {
  return (
    <View style={styles.container}>
      <TopSlider />
      <Title />
      <Organizers />
      <View style={styles.divider} />
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
});
